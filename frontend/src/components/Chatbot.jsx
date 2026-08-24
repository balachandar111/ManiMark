import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FLOW, STRINGS, START_NODE, PRODUCTS } from "../data/chatFlow.js";
import "./Chatbot.css";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Mark — the brand mascot. Swap this path for your final hosted asset
// whenever you have one (Cloudinary, S3, etc). For now it's served from
// /public/assets/mark-hero.png so it works out of the box.
const MARK_IMAGE = "/assets/mark-hero.png";
const BRAND_LOGO = "/assets/manimark-logo.png";

const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_ATTACHMENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
];

function getSessionId() {
  let id = sessionStorage.getItem("mm_chat_session_id");
  if (!id) {
    id = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem("mm_chat_session_id", id);
  }
  return id;
}

function makeBotMessage(text) {
  return { id: `${Date.now()}_${Math.random()}`, sender: "bot", text };
}
function makeUserMessage(text, extra = {}) {
  return { id: `${Date.now()}_${Math.random()}`, sender: "user", text, ...extra };
}

// Subtle bell watermark scattered behind the chat, echoing the Manimark logo.
function BellIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2a1.6 1.6 0 0 1 1.6 1.6v.66A6.6 6.6 0 0 1 19 10.7v3.1l1.6 2.7a1 1 0 0 1-.86 1.5H4.26a1 1 0 0 1-.86-1.5L5 13.8v-3.1a6.6 6.6 0 0 1 5.4-6.44v-.66A1.6 1.6 0 0 1 12 2Z"
        fill="currentColor"
      />
      <path
        d="M9.2 19.4a2.8 2.8 0 0 0 5.6 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Placeholder chikki-bar illustration used whenever a product card has no
// real packshot photo yet, so the grid never shows a broken image.
function SnackBarIllustration({ className }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="mmBarGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--mm-cream)" />
          <stop offset="100%" stopColor="var(--mm-yellow)" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" fill="url(#mmBarGrad)" />
      <rect x="18" y="40" width="84" height="40" rx="6" fill="#fff" opacity="0.9" />
      <rect x="18" y="40" width="84" height="40" rx="6" fill="none" stroke="var(--mm-maroon)" strokeWidth="2" strokeDasharray="3 4" />
      <circle cx="38" cy="58" r="6" fill="var(--mm-gold)" />
      <circle cx="58" cy="64" r="5" fill="var(--mm-maroon)" opacity="0.7" />
      <circle cx="76" cy="55" r="6" fill="var(--mm-gold)" />
      <circle cx="90" cy="66" r="4.5" fill="var(--mm-maroon)" opacity="0.7" />
      <circle cx="50" cy="72" r="4" fill="var(--mm-gold)" />
    </svg>
  );
}

function TypingBubble() {
  return (
    <div className="mm-bubble mm-bubble-bot mm-typing" aria-label="Typing">
      <span />
      <span />
      <span />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Voice: Mark reads each question aloud.
//
// Primary path: Puter.js (https://js.puter.com/v2/, loaded in index.html) —
// a free, keyless client-side TTS API. We ask it for Amazon Polly's "Kevin"
// voice, a real neural US-English boy voice, no signup, no backend call,
// no usage limit. Puter has no Tamil voice on this route, so Tamil sessions
// go straight to the browser fallback below.
//
// Fallback path: if Puter.js hasn't loaded yet, errors, or the language is
// Tamil, we fall back to the browser's built-in SpeechSynthesis API, tuned
// as young-sounding as a browser voice can get (male/child-leaning voice +
// higher pitch/faster pace). Lower quality, but Mark never goes silent.
//
// (backend/routes/voiceRoutes.js still exists if you'd rather run TTS
// server-side through your own AWS account — it's just no longer wired up
// as the default path here.)
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// MARK AI VOICE
// Young boy / mascot voice
//
// Primary:
//   Puter.js -> Amazon Polly -> Kevin -> Neural
//
// Fallback:
//   Browser SpeechSynthesis
//
// Mark's personality:
//   Young, friendly, energetic, playful, helpful
// ---------------------------------------------------------------------------

function useMarkVoice(language) {
  const [enabled, setEnabled] = useState(true);
  const [speaking, setSpeaking] = useState(false);

  const voicesRef = useRef([]);
  const audioRef = useRef(null);
  const audioUrlRef = useRef(null);
  const requestIdRef = useRef(0);

  const browserSupported =
    typeof window !== "undefined" &&
    "speechSynthesis" in window;

  // ---------------------------------------------------------
  // Load browser voices for fallback
  // ---------------------------------------------------------

  useEffect(() => {
    if (!browserSupported) return;

    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };

    loadVoices();

    window.speechSynthesis.addEventListener?.(
      "voiceschanged",
      loadVoices
    );

    return () => {
      window.speechSynthesis.removeEventListener?.(
        "voiceschanged",
        loadVoices
      );
    };
  }, [browserSupported]);

  // ---------------------------------------------------------
  // Browser fallback voice
  // ---------------------------------------------------------

  const pickBrowserVoice = (lang) => {
    const voices = voicesRef.current;

    if (!voices?.length) {
      return null;
    }

    const languageCode =
      lang === "tamil"
        ? "ta"
        : "en";

    // Prefer Indian language voices
    const indianVoices = voices.filter((voice) =>
      voice.lang?.toLowerCase().startsWith(
        `${languageCode}-in`
      )
    );

    // Then any matching language
    const languageVoices =
      indianVoices.length
        ? indianVoices
        : voices.filter((voice) =>
            voice.lang?.toLowerCase().startsWith(
              languageCode
            )
          );

    const pool =
      languageVoices.length
        ? languageVoices
        : voices;

    // Prefer child/boy voices
    const childVoice = pool.find((voice) =>
      /boy|kid|junior|child|young/i.test(
        voice.name
      )
    );

    // Then male voices
    const maleVoice = pool.find((voice) =>
      /male|man/i.test(voice.name) &&
      !/female|woman/i.test(voice.name)
    );

    // Then default
    const defaultVoice = pool.find(
      (voice) => voice.default
    );

    return (
      childVoice ||
      maleVoice ||
      defaultVoice ||
      pool[0] ||
      voices[0]
    );
  };

  // ---------------------------------------------------------
  // Clean text before sending to TTS
  // ---------------------------------------------------------

  const cleanText = (text = "") => {
    return text
      .replace(
        /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu,
        ""
      )
      .replace(/\s+/g, " ")
      .trim();
  };

  // ---------------------------------------------------------
  // Make Mark sound young in browser fallback
  // ---------------------------------------------------------

  const speakWithBrowser = (text) => {
    if (!browserSupported || !text) {
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const utterance =
        new SpeechSynthesisUtterance(text);

      const voice =
        pickBrowserVoice(language);

      if (voice) {
        utterance.voice = voice;
      }

      utterance.lang =
        language === "tamil"
          ? "ta-IN"
          : "en-IN";

      // Young mascot style
      utterance.rate = 1.05;
      utterance.pitch = 1.55;
      utterance.volume = 1;

      utterance.onstart = () => {
        setSpeaking(true);
      };

      utterance.onend = () => {
        setSpeaking(false);
      };

      utterance.onerror = () => {
        setSpeaking(false);
      };

      window.speechSynthesis.speak(
        utterance
      );
    } catch (error) {
      console.error(
        "Browser TTS error:",
        error
      );

      setSpeaking(false);
    }
  };

  // ---------------------------------------------------------
  // Stop current audio
  // ---------------------------------------------------------

  const stopAudioElement = () => {
    const audio = audioRef.current;

    if (audio) {
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch {
        // Ignore audio cleanup errors
      }

      audio.onended = null;
      audio.onerror = null;
      audio.onplay = null;
    }

    audioRef.current = null;

    if (audioUrlRef.current) {
      try {
        URL.revokeObjectURL(
          audioUrlRef.current
        );
      } catch {
        // Ignore URL cleanup errors
      }

      audioUrlRef.current = null;
    }
  };

  // ---------------------------------------------------------
  // Main Mark voice
  // ---------------------------------------------------------

  const speak = async (text) => {
    if (!enabled || !text) {
      return;
    }

    const clean = cleanText(text);

    if (!clean) {
      return;
    }

    const currentRequestId =
      ++requestIdRef.current;

    // Stop previous speech
    window.speechSynthesis?.cancel();

    stopAudioElement();

    // -------------------------------------------------------
    // Tamil
    //
    // Amazon Polly Kevin is an English US child voice.
    // Therefore use browser Tamil voice for Tamil.
    // -------------------------------------------------------

    if (language === "tamil") {
      speakWithBrowser(clean);
      return;
    }

    // -------------------------------------------------------
    // Check Puter
    // -------------------------------------------------------

    const puterTTS =
      window?.puter?.ai?.txt2speech;

    if (!puterTTS) {
      console.warn(
        "Puter TTS unavailable. Using browser voice."
      );

      speakWithBrowser(clean);
      return;
    }

    try {
      setSpeaking(true);

      // -----------------------------------------------------
      // Amazon Polly
      //
      // Kevin = male child voice
      // Neural = higher quality
      // en-US = natural US English
      // -----------------------------------------------------

      const audio =
        await puterTTS(clean, {
          provider: "aws-polly",
          voice: "Kevin",
          engine: "neural",
          language: "en-US",
        });

      // A newer request replaced this request
      if (
        currentRequestId !==
        requestIdRef.current
      ) {
        try {
          audio?.pause?.();
        } catch {
          // Ignore
        }

        return;
      }

      if (!audio) {
        throw new Error(
          "Puter returned no audio"
        );
      }

      audioRef.current = audio;

      audio.onplay = () => {
        setSpeaking(true);
      };

      audio.onended = () => {
        setSpeaking(false);
        audioRef.current = null;
      };

      audio.onerror = (error) => {
        console.error(
          "Mark audio error:",
          error
        );

        setSpeaking(false);

        if (
          currentRequestId ===
          requestIdRef.current
        ) {
          speakWithBrowser(clean);
        }
      };

      await audio.play();

    } catch (error) {
      console.error(
        "Mark Polly TTS error:",
        error
      );

      if (
        currentRequestId !==
        requestIdRef.current
      ) {
        return;
      }

      setSpeaking(false);

      // Always keep Mark speaking
      speakWithBrowser(clean);
    }
  };

  // ---------------------------------------------------------
  // Stop voice
  // ---------------------------------------------------------

  const stop = () => {
    requestIdRef.current += 1;

    stopAudioElement();

    if (browserSupported) {
      window.speechSynthesis.cancel();
    }

    setSpeaking(false);
  };

  // ---------------------------------------------------------
  // Enable / Disable voice
  // ---------------------------------------------------------

  const toggleEnabled = () => {
    setEnabled((previous) => {
      if (previous) {
        stop();
      }

      return !previous;
    });
  };

  return {
    supported: true,
    enabled,
    speaking,
    speak,
    stop,
    toggleEnabled,
  };
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentNodeId, setCurrentNodeId] = useState(START_NODE);
  const [language, setLanguage] = useState("english");
  const [pendingQueryType, setPendingQueryType] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [attachment, setAttachment] = useState(null);
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const [attachmentError, setAttachmentError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [typing, setTyping] = useState(false);
  const sessionId = useRef(getSessionId());
  const bottomRef = useRef(null);
  const spokenIds = useRef(new Set());

  const t = STRINGS[language];
  const voice = useMarkVoice(language);

  useEffect(() => {
    if (!open) return;
    const node = FLOW[currentNodeId];
    if (!node) return;

    setTyping(true);
    const delay = messages.length === 0 ? 250 : 500;
    const timer = setTimeout(() => {
      setTyping(false);
      const msg = makeBotMessage(node.text(t));
      setMessages((prev) => [...prev, msg]);
    }, delay);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNodeId, open, language]);

  // Speak the newest bot message aloud, once, as soon as it lands.
  useEffect(() => {
    const last = messages[messages.length - 1];
    if (!last || last.sender !== "bot") return;
    if (spokenIds.current.has(last.id)) return;
    spokenIds.current.add(last.id);
    voice.speak(last.text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Stop any speech in progress whenever the chat closes.
  useEffect(() => {
    if (!open) voice.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
    if (messages.length === 0) {
      setCurrentNodeId(START_NODE);
    }
  };

  const handleOptionClick = (option) => {
    voice.stop();
    const labelText = typeof option.label === "function" ? option.label(t) : option.label;
    setMessages((prev) => [...prev, makeUserMessage(labelText)]);

    if (option.value) {
      setLanguage(option.value);
    }
    if (option.queryType) {
      setPendingQueryType(option.queryType);
    }

    if (option.link) {
      window.open(option.link, "_blank", "noopener,noreferrer");
      return;
    }

    if (option.next) {
      setCurrentNodeId(option.next);
    }
  };

  const handleFormChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const clearAttachment = () => {
    setAttachment(null);
    setAttachmentPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setAttachmentError("");
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;

    if (!ALLOWED_ATTACHMENT_TYPES.includes(file.type)) {
      setAttachmentError(t.attachmentBadType);
      return;
    }
    if (file.size > MAX_ATTACHMENT_SIZE) {
      setAttachmentError(t.attachmentTooLarge);
      return;
    }

    setAttachmentError("");
    setAttachmentPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return file.type.startsWith("image/") ? URL.createObjectURL(file) : null;
    });
    setAttachment(file);
  };

  useEffect(() => {
    return () => {
      if (attachmentPreview) URL.revokeObjectURL(attachmentPreview);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (attachmentError) return;
    setSubmitting(true);
    setError("");
    try {
      const payload = new FormData();
      payload.append("sessionId", sessionId.current);
      payload.append("language", language);
      payload.append("queryType", pendingQueryType || "general");
      Object.entries(formValues).forEach(([key, value]) => {
        if (value) payload.append(key, value);
      });
      if (attachment) {
        payload.append("attachment", attachment);
      }

      const response = await axios.post(`${API_BASE_URL}/queries`, payload);
      const savedAttachmentUrl = response?.data?.data?.attachmentUrl || null;

      const summaryParts = Object.entries(formValues)
        .filter(([, v]) => v)
        .map(([, v]) => v);

      setMessages((prev) => [
        ...prev,
        makeUserMessage(summaryParts.join(" | ") || "(details submitted)", {
          attachmentUrl: savedAttachmentUrl,
          attachmentName: attachment?.name,
          attachmentIsImage: attachment
            ? attachment.type.startsWith("image/")
            : /\.(jpe?g|png|webp|gif)$/i.test(savedAttachmentUrl || ""),
        }),
      ]);
      setFormValues({});
      clearAttachment();
      const nextId = FLOW.query_form.next;
      setCurrentNodeId(nextId);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          "Something went wrong while saving your details. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleRestart = () => {
    voice.stop();
    spokenIds.current.clear();
    setMessages([]);
    setFormValues({});
    clearAttachment();
    setPendingQueryType(null);
    setLanguage("english");
    setCurrentNodeId(START_NODE);
  };

  if (!open) {
    return (
      <button className="mm-chat-fab" onClick={handleOpen}>
        <span className="mm-fab-avatar">
          <img src={MARK_IMAGE} alt="Mark, the Manimark mascot" />
        </span>
        <span className="mm-fab-copy">
          <span className="mm-fab-title">Speak with Mark</span>
          <span className="mm-fab-subtitle">🎙️ Ask me anything</span>
        </span>
      </button>
    );
  }

  const node = FLOW[currentNodeId];

  return (
    <div className="mm-chat-fullscreen" role="dialog" aria-modal="true">
      <div className="mm-bell-field" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <BellIcon key={i} className={`mm-bell-deco mm-bell-deco-${i}`} />
        ))}
      </div>

      <div className="mm-chat-header">
        <div className="mm-header-brand">
          <span className={`mm-header-badge ${voice.speaking ? "mm-header-badge-speaking" : ""}`}>
            <img src={MARK_IMAGE} alt="Mark" className="mm-mark-img" />
          </span>
          <div className="mm-header-copy">
            <span className="mm-header-title">Mark · Manimark Buddy</span>
            <span className="mm-header-subtitle">
              {voice.speaking ? "Speaking…" : "Field to snack, always fresh"}
            </span>
          </div>
        </div>
        <div className="mm-header-actions">
          {voice.supported && (
            <button
              className="mm-header-btn"
              onClick={voice.toggleEnabled}
              title={voice.enabled ? "Mute Mark's voice" : "Unmute Mark's voice"}
              aria-label={voice.enabled ? "Mute voice" : "Unmute voice"}
            >
              {voice.enabled ? "🔊" : "🔇"}
            </button>
          )}
          <button
            className="mm-header-btn"
            onClick={handleRestart}
            title="Start over"
            aria-label="Start over"
          >
            ↺
          </button>
          <button
            className="mm-header-btn mm-header-btn-close"
            onClick={() => setOpen(false)}
            title="Close"
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="mm-chat-body">
        <div className="mm-chat-scroll">
          {messages.map((m) => (
            <div key={m.id} className={`mm-msg-row mm-msg-row-${m.sender}`}>
              {m.sender === "bot" && (
                <span className="mm-avatar">
                  <img src={MARK_IMAGE} alt="Mark" className="mm-mark-img" />
                </span>
              )}
              <div className={`mm-bubble mm-bubble-${m.sender}`}>
                {m.text}
                {m.attachmentUrl && (
                  <div className="mm-bubble-attachment">
                    {m.attachmentIsImage ? (
                      <a href={m.attachmentUrl} target="_blank" rel="noopener noreferrer">
                        <img
                          src={m.attachmentUrl}
                          alt={m.attachmentName || "Attachment"}
                          className="mm-bubble-attachment-img"
                        />
                      </a>
                    ) : (
                      <a
                        href={m.attachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mm-bubble-attachment-file"
                      >
                        📄 {m.attachmentName || "View attachment"}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {typing && (
            <div className="mm-msg-row mm-msg-row-bot">
              <span className="mm-avatar">
                <img src={MARK_IMAGE} alt="Mark" className="mm-mark-img" />
              </span>
              <TypingBubble />
            </div>
          )}

          {!typing && node?.type === "options" && (
            <div className="mm-options">
              {node.options.map((opt) => {
                const labelText = typeof opt.label === "function" ? opt.label(t) : opt.label;
                return (
                  <button
                    key={labelText}
                    className="mm-option-chip"
                    onClick={() => handleOptionClick(opt)}
                  >
                    {labelText}
                  </button>
                );
              })}
            </div>
          )}

          {!typing && node?.type === "products" && (
            <>
              <div className={`mm-product-grid mm-accent-${node.accent || ""}`}>
                {PRODUCTS[node.platform]?.items.map((p) => (
                  <div className="mm-product-card" key={p.name}>
                    <div className="mm-product-media">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="mm-product-photo"
                          loading="lazy"
                        />
                      ) : (
                        <SnackBarIllustration className="mm-product-illustration" />
                      )}
                      <span className="mm-product-platform-badge">
                        {PRODUCTS[node.platform]?.label}
                      </span>
                    </div>
                    <div className="mm-product-info">
                      <div className="mm-product-name">{p.name}</div>
                      <button
                        className="mm-product-btn"
                        onClick={() => window.open(p.url, "_blank", "noopener,noreferrer")}
                      >
                        {t.viewProduct} →
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {PRODUCTS[node.platform]?.moreLink && (
                <a
                  className="mm-more-link"
                  href={PRODUCTS[node.platform].moreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.moreProducts} →
                </a>
              )}

              <div className="mm-options">
                <button className="mm-option-chip" onClick={() => setCurrentNodeId("main_menu")}>
                  {t.goBack}
                </button>
              </div>
            </>
          )}

          {!typing && node?.type === "form" && (
            <form className="mm-form" onSubmit={handleFormSubmit}>
              <div className="mm-form-title">Tell us more</div>
              {node.fields.map((field) =>
                field.type === "file" ? (
                  <div key={field.key} className="mm-form-field">
                    <span>{t[field.labelKey]}</span>

                    {!attachment ? (
                      <label className="mm-file-dropzone">
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
                          onChange={handleAttachmentChange}
                        />
                        <span className="mm-file-dropzone-icon">📎</span>
                        <span className="mm-file-dropzone-text">{t.attachmentChoose}</span>
                        <span className="mm-file-dropzone-hint">{t.attachmentHint}</span>
                      </label>
                    ) : (
                      <div className="mm-file-preview">
                        {attachmentPreview ? (
                          <img
                            src={attachmentPreview}
                            alt={attachment.name}
                            className="mm-file-preview-thumb"
                          />
                        ) : (
                          <span className="mm-file-preview-icon">📄</span>
                        )}
                        <div className="mm-file-preview-info">
                          <span className="mm-file-preview-name">{attachment.name}</span>
                          <span className="mm-file-preview-size">
                            {(attachment.size / 1024).toFixed(0)} KB
                          </span>
                        </div>
                        <label className="mm-file-change-btn">
                          {t.attachmentChange}
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
                            onChange={handleAttachmentChange}
                          />
                        </label>
                        <button
                          type="button"
                          className="mm-file-remove-btn"
                          onClick={clearAttachment}
                          aria-label={t.attachmentRemove}
                        >
                          ✕
                        </button>
                      </div>
                    )}
                    {attachmentError && <div className="mm-error">{attachmentError}</div>}
                  </div>
                ) : (
                  <label key={field.key} className="mm-form-field">
                    <span>{t[field.labelKey]}</span>
                    {field.multiline ? (
                      <textarea
                        value={formValues[field.key] || ""}
                        onChange={(e) => handleFormChange(field.key, e.target.value)}
                        rows={3}
                      />
                    ) : (
                      <input
                        type={field.inputType || "text"}
                        value={formValues[field.key] || ""}
                        onChange={(e) => handleFormChange(field.key, e.target.value)}
                      />
                    )}
                  </label>
                )
              )}
              {error && <div className="mm-error">{error}</div>}
              <button type="submit" className="mm-submit-btn" disabled={submitting}>
                {submitting ? "Sending..." : t.submit}
              </button>
            </form>
          )}

          {!typing && node?.type === "end" && (
            <div className="mm-options">
              <button className="mm-option-chip" onClick={handleRestart}>
                {t.restart}
              </button>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}