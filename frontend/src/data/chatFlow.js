// ---------------------------------------------------------------------------
// EDIT THIS FILE to change Mark's copy, add languages, or update links.
// The whole conversation tree is data, not code, so no component changes
// are needed for most content updates.
// ---------------------------------------------------------------------------

// Real brand links — replace with the exact URLs you use on the Connect page.
export const LINKS = {
  youtube: "https://www.youtube.com/channel/UC3h-J8j4uvtQGJd_Lz8lxOw",
  facebook: "https://www.facebook.com/Manimarksnacks/",
  instagram: "https://www.instagram.com/arcotmanimark_official/",
  website: "https://www.manimark.com/",
  directions:
    "https://www.google.com/maps/search/?api=1&query=S.F.No.+870%2F5%2C+Narayanapuram+Village%2C+Kannamangalam+Road%2C+Kavanoor+Post%2C+Arcot+Taluk%2C+Ranipet+District%2C+Tamil+Nadu+632507",
  email: "mailto:arcotmanimarkfoodspvtltd@gmail.com",
};

// Snack line-up shown as cards. Replace `image` with real packshot URLs
// whenever you have them — leaving it out falls back to the drawn chikki-bar
// illustration so the UI never shows a broken image.
export const PRODUCTS = {
  snacks: {
    label: "Manimark Snacks",
    moreLink: LINKS.website,
    items: [
      { name: "Peanut Chikki Bar", url: LINKS.website },
      { name: "Kadalai Mittai", url: LINKS.website },
      { name: "Murukku & Thattai", url: LINKS.website },
    ],
  },
};

// Text strings per language. Add more keys / languages here as needed.
export const STRINGS = {
  english: {
    welcome: "Hey there! I'm Mark 👋 Welcome to Arcot Manimark Foods!",
    chooseLanguage: "Please choose your language",
    mainMenu: "How can I help you today?",
    connectPrompt: "Pick a platform to connect with us:",
    connectTitle: "Connect with Manimark 🔔",
    productsTitle: "A few of our favourite snacks 🥜",
    viewProduct: "Visit website",
    moreProducts: "See all products",
    storePrompt:
      "Here's where our snacks are made, with love, in Arcot 🏭\n\nS.F.No. 870/5, Narayanapuram Village, Kannamangalam Road, Kavanoor Post, Arcot Taluk, Ranipet District, Tamil Nadu - 632507",
    getDirections: "Get directions",
    contactPrompt:
      "You can reach our team by email any time — we usually reply within a business day.\n\narcotmanimarkfoodspvtltd@gmail.com",
    emailUs: "Email us",
    queriesIntro: "Sorry for the inconvenience 🙏\nPlease choose an option:",
    formIntro: "Please share a few details so our team can help:",
    platformLabel: "Where did you buy it?",
    dateLabel: "Purchase date",
    productLabel: "Product name",
    rateLabel: "Price / quantity",
    contactLabel: "Contact number",
    descriptionLabel: "Tell us what happened",
    attachmentLabel: "Attach a photo or PDF (optional)",
    attachmentHint: "JPG, PNG, WEBP, GIF or PDF, up to 5MB",
    attachmentChoose: "Choose file",
    attachmentChange: "Change file",
    attachmentRemove: "Remove",
    attachmentTooLarge: "File is too large. Max size is 5MB.",
    attachmentBadType: "Only image or PDF files are allowed.",
    submit: "Submit",
    thankYou:
      "Thanks for sharing that! Our customer care team will connect with you shortly. 🙏",
    restart: "Start over",
    goBack: "Back to menu",
    // Main menu options
    menuConnect: "Connect with us",
    menuProducts: "Our products",
    menuStore: "Where to find us",
    menuFeedback: "Complaint / feedback",
    menuContact: "Contact us",
    // Query options
    queryNotReceived: "Product not received",
    queryDamaged: "Product damaged",
    queryQuality: "Quality issue",
    queryOthers: "Others",
  },
  tamil: {
    welcome: "வணக்கம்! நான் மார்க் 👋 Arcot Manimark Foods-க்கு வரவேற்கிறேன்!",
    chooseLanguage: "தயவுசெய்து உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
    mainMenu: "இன்று நான் எப்படி உதவலாம்?",
    connectPrompt: "எங்களுடன் இணைய ஒரு தளத்தைத் தேர்ந்தெடுக்கவும்:",
    connectTitle: "மணிமார்க்குடன் இணையுங்கள் 🔔",
    productsTitle: "எங்கள் பிடித்த சிற்றுண்டிகள் சில 🥜",
    viewProduct: "இணையதளத்திற்குச் செல்ல",
    moreProducts: "அனைத்து பொருட்களையும் காண",
    storePrompt:
      "எங்கள் சிற்றுண்டிகள் அரக்கோணத்தில் அன்புடன் தயாரிக்கப்படுகின்றன 🏭\n\nS.F.No. 870/5, நாராயணபுரம் கிராமம், கண்ணமங்கலம் ரோடு, கவனூர் போஸ்ட், அரக்கோணம் தாலுக்கா, ராணிப்பேட்டை மாவட்டம், தமிழ்நாடு - 632507",
    getDirections: "வழி காட்டு",
    contactPrompt:
      "எங்கள் குழுவை மின்னஞ்சல் மூலம் எப்போது வேண்டுமானாலும் தொடர்பு கொள்ளலாம்.\n\narcotmanimarkfoodspvtltd@gmail.com",
    emailUs: "மின்னஞ்சல் அனுப்ப",
    queriesIntro: "சிரமத்திற்கு வருந்துகிறோம் 🙏\nஒரு விருப்பத்தைத் தேர்ந்தெடுக்கவும்:",
    formIntro: "எங்கள் குழு உதவ சில விவரங்களைப் பகிரவும்:",
    platformLabel: "எங்கு வாங்கினீர்கள்?",
    dateLabel: "வாங்கிய தேதி",
    productLabel: "பொருளின் பெயர்",
    rateLabel: "விலை / அளவு",
    contactLabel: "தொடர்பு எண்",
    descriptionLabel: "என்ன நடந்தது என்று கூறவும்",
    attachmentLabel: "புகைப்படம் / PDF இணைக்கவும் (விருப்பத்தேர்வு)",
    attachmentHint: "JPG, PNG, WEBP, GIF அல்லது PDF, அதிகபட்சம் 5MB",
    attachmentChoose: "கோப்பைத் தேர்ந்தெடுக்கவும்",
    attachmentChange: "கோப்பை மாற்றவும்",
    attachmentRemove: "அகற்று",
    attachmentTooLarge: "கோப்பு மிகப் பெரியது. அதிகபட்சம் 5MB.",
    attachmentBadType: "படம் அல்லது PDF கோப்புகள் மட்டுமே அனுமதிக்கப்படும்.",
    submit: "சமர்ப்பிக்கவும்",
    thankYou: "பகிர்ந்ததற்கு நன்றி! எங்கள் குழு விரைவில் உங்களைத் தொடர்பு கொள்ளும். 🙏",
    restart: "மீண்டும் தொடங்கு",
    goBack: "மெனுவிற்குத் திரும்பு",
    menuConnect: "எங்களுடன் இணைய",
    menuProducts: "எங்கள் பொருட்கள்",
    menuStore: "எங்களை எங்கே காணலாம்",
    menuFeedback: "புகார் / கருத்து",
    menuContact: "தொடர்பு கொள்ள",
    queryNotReceived: "பொருள் கிடைக்கவில்லை",
    queryDamaged: "பொருள் சேதமடைந்துள்ளது",
    queryQuality: "தர பிரச்சனை",
    queryOthers: "மற்றவை",
  },
};

// The conversation tree. Each node id is referenced by "next" pointers.
// node types: "options" | "products" | "form" | "end"
export const FLOW = {
  welcome: {
    type: "options",
    text: (t) => t.welcome,
    options: [{ label: "Continue / தொடரவும்", next: "language" }],
  },

  language: {
    type: "options",
    text: (t) => t.chooseLanguage,
    options: [
      { label: "1. English", value: "english", next: "main_menu" },
      { label: "2. Tamil", value: "tamil", next: "main_menu" },
    ],
  },

  main_menu: {
    type: "options",
    text: (t) => t.mainMenu,
    options: [
      { label: (t) => t.menuConnect, next: "connect" },
      { label: (t) => t.menuProducts, next: "products" },
      { label: (t) => t.menuStore, next: "store" },
      { label: (t) => t.menuFeedback, next: "queries" },
      { label: (t) => t.menuContact, next: "contact" },
    ],
  },

  connect: {
    type: "options",
    text: (t) => t.connectPrompt,
    options: [
      { label: "▶️ YouTube", link: LINKS.youtube },
      { label: "📘 Facebook", link: LINKS.facebook },
      { label: "📸 Instagram", link: LINKS.instagram },
      { label: "🌐 Website", link: LINKS.website },
      { label: (t) => t.goBack, next: "main_menu" },
    ],
  },

  products: {
    type: "products",
    text: (t) => t.productsTitle,
    platform: "snacks",
    accent: "snacks",
  },

  store: {
    type: "options",
    text: (t) => t.storePrompt,
    options: [
      { label: (t) => t.getDirections, link: LINKS.directions },
      { label: (t) => t.goBack, next: "main_menu" },
    ],
  },

  contact: {
    type: "options",
    text: (t) => t.contactPrompt,
    options: [
      { label: (t) => t.emailUs, link: LINKS.email },
      { label: (t) => t.goBack, next: "main_menu" },
    ],
  },

  queries: {
    type: "options",
    text: (t) => t.queriesIntro,
    options: [
      {
        label: (t) => t.queryNotReceived,
        next: "query_form",
        queryType: "not_received",
      },
      {
        label: (t) => t.queryDamaged,
        next: "query_form",
        queryType: "damaged",
      },
      {
        label: (t) => t.queryQuality,
        next: "query_form",
        queryType: "quality",
      },
      {
        label: (t) => t.queryOthers,
        next: "query_form",
        queryType: "others",
      },
    ],
  },

  // Form node: fields collected then POSTed to the backend
  query_form: {
    type: "form",
    text: (t) => t.formIntro,
    fields: [
      { key: "platformPurchased", labelKey: "platformLabel" },
      { key: "orderedDate", labelKey: "dateLabel", inputType: "date" },
      { key: "product", labelKey: "productLabel" },
      { key: "rate", labelKey: "rateLabel" },
      { key: "contactNumber", labelKey: "contactLabel" },
      { key: "description", labelKey: "descriptionLabel", multiline: true },
      { key: "attachment", labelKey: "attachmentLabel", type: "file" },
    ],
    next: "thank_you",
  },

  thank_you: {
    type: "end",
    text: (t) => t.thankYou,
  },
};

export const START_NODE = "welcome";