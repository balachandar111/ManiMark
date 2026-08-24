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
  // Quick commerce (fast delivery apps)
  blinkit:
    "https://blinkit.com/prn/assorted-burfi-combo-by-arcot-mani-mark/prid/791289",
  bigbasket: "https://www.bigbasket.com/pb/manimark/",
  // E-commerce marketplaces
  swiggy:
    "https://www.swiggy.com/city/chennai/arcot-manimark-kadalaimittai-omr-navalur-rest1105377",
  amazon: "https://www.amazon.in/s?k=ARCOT+MANI+MARK&ref=bl_dp_s_web_0",
};

// Snack line-up shown as cards. Replace `image` with real packshot URLs
// whenever you have them — leaving it out falls back to the drawn chikki-bar
// illustration so the UI never shows a broken image.
export const PRODUCTS = {
  snacks: {
    label: "Manimark Snacks",
    moreLink: LINKS.website,
    items: [
      // "image" points at /public/assets — drop the real packshot file
      // there and add its path here; leaving it out falls back to the
      // drawn chikki-bar illustration so the UI never shows a broken image.
      //
      // NOTE: the two images below are hotlinked from a third-party retailer
      // (vihangrocery.com) that stocks genuine Manimark packs — good for a
      // preview, but swap these for locally-hosted files in /public/assets
      // once you have the official packshots, so the chatbot never depends
      // on another site staying online.
      { name: "Peanut Chikki Bar", url: LINKS.website, image: "https://vihangrocery.com/cdn/shop/files/219c7f_bb7814bd1d034b14b7655ba483eddcba_mv2_d48618d8-462f-4ab0-9e5e-fe6c2ca2e530.png" },
      { name: "Kadalai Mittai", url: LINKS.website, image: "https://vihangrocery.com/cdn/shop/files/manimark-peanut-burfi-135g.jpg" },
      // Local packshot, served from /public/assets/murukku-thattai.jpg
      { name: "Murukku & Thattai", url: LINKS.website, image: "/assets/muruku.jpg" },
    ],
  },

  // Quick commerce — Blinkit. Only one live Blinkit product page is known
  // today (the assorted burfi combo), so all three cards point there for
  // now; replace each `url` with its own Blinkit product page once you
  // have individual listings.
  blinkit: {
    label: "Blinkit",
    moreLink: LINKS.blinkit,
    items: [
      { name: "Peanut Chikki Bar", url: LINKS.blinkit, image: "https://vihangrocery.com/cdn/shop/files/219c7f_bb7814bd1d034b14b7655ba483eddcba_mv2_d48618d8-462f-4ab0-9e5e-fe6c2ca2e530.png" },
   ,
    ],
  },

  // Quick commerce — BigBasket. Individual product pages, with real
  // packshots pulled from each product's bigbasket listing.
  bigbasket: {
    label: "BigBasket",
    moreLink: LINKS.bigbasket,
    items: [
      {
        name: "Rice Muruku - Crunchy Snack (350 g)",
        url: "https://www.bigbasket.com/pd/40283946/manimark-rice-muruku-crunchy-snack-350-g/",
        image: "https://www.bbassets.com/media/uploads/p/s/40283946_2-manimark-rice-muruku-crunchy-snack.jpg",
      },
      {
        name: "Butter Mottas - Crunchy Snack (160 g)",
        url: "https://www.bigbasket.com/pd/40283948/manimark-butter-mottas-crunchy-snack-160-g/",
        image: "https://www.bbassets.com/media/uploads/p/s/40283948_1-manimark-butter-mottas-crunchy-snack.jpg",
      },
      {
        name: "Peanut Balls - Crunchy (180 g)",
        url: "https://www.bigbasket.com/pd/40283978/manimark-peanut-balls-crunchy-180-g/",
        image: "https://www.bbassets.com/media/uploads/p/s/40283978_2-manimark-peanut-balls-crunchy.jpg",
      },
    ],
  },

  // E-commerce — Swiggy. Swiggy lists the Manimark storefront rather than
  // separate per-item pages, so all three cards point to the restaurant
  // page for now; update each `url` if per-item deep links become available.
  swiggy: {
    label: "Swiggy",
    moreLink: LINKS.swiggy,
    items: [
      { name: "Peanut Chikki Bar", url: LINKS.swiggy, image: "https://vihangrocery.com/cdn/shop/files/219c7f_bb7814bd1d034b14b7655ba483eddcba_mv2_d48618d8-462f-4ab0-9e5e-fe6c2ca2e530.png" },
     
    ],
  },

  // E-commerce — Amazon. Individual product pages.
  amazon: {
    label: "Amazon",
    moreLink: LINKS.amazon,
    items: [
      {
        name: "Peanut Chikki (Crushed Jaggery)",
        url: "https://www.amazon.in/ARCOT-MANIMARK-Crushed-Jaggery-Preservatives/dp/B0H1JKCD84/",
        image: "https://vihangrocery.com/cdn/shop/files/219c7f_bb7814bd1d034b14b7655ba483eddcba_mv2_d48618d8-462f-4ab0-9e5e-fe6c2ca2e530.png",
      },
      {
        name: "Peanut Chikki (Jaggery Sweetened)",
        url: "https://www.amazon.in/ARCOT-MANIMARK-Jaggery-Sweetened-Preservatives/dp/B0H1K75G24/",
        image: "https://vihangrocery.com/cdn/shop/files/manimark-peanut-burfi-135g.jpg",
      },
      {
        name: "Roasted Peanut Chikki (Traditional)",
        url: "https://www.amazon.in/ARCOT-MANIMARK-Roasted-Preservatives-Traditional/dp/B0H1JZSQ8M/",
        // Amazon blocks automated image fetching, so this reuses the
        // closest matching peanut-chikki packshot as a placeholder —
        // swap in the real Amazon listing photo when you have it.
        image: "https://vihangrocery.com/cdn/shop/files/manimark-peanut-burfi-135g.jpg",
      },
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
    menuQuickCommerce: "Quick commerce order",
    menuEcommerce: "E-commerce order",
    menuProducts: "Our products",
    menuPartyOrders: "Party Orders 🎉",
    menuStore: "Where to find us",
    menuFeedback: "Complaint / feedback",
    menuContact: "Contact us",
    quickCommercePrompt: "Order for quick delivery on:",
    ecommercePrompt: "Order online on:",
    blinkitProductsPrompt: "Order these on Blinkit ⚡",
    bigbasketProductsPrompt: "Order these on BigBasket 🧺",
    swiggyProductsPrompt: "Order these on Swiggy 🍽️",
    amazonProductsPrompt: "Order these on Amazon 🛒",
    // Query options
    queryNotReceived: "Product not received",
    queryDamaged: "Product damaged",
    queryQuality: "Quality issue",
    queryOthers: "Others",
    // Party orders
    partyOrdersTitle: "Planning a celebration? Pick your favourite treats for the party! 🎉",
    partyOrderCta: "Place a party order",
    partyFormIntro: "Tell us about your party order and we'll get it ready:",
    nameLabel: "Your name",
    partyTypeLabel: "Type of party / function",
    quantityLabel: "Quantity",
    partyDescriptionLabel: "Any additional details (optional)",
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
    menuQuickCommerce: "க்விக் கామர்ஸ் ஆர்டர்",
    menuEcommerce: "இ-காமர்ஸ் ஆர்டர்",
    menuProducts: "எங்கள் பொருட்கள்",
    menuPartyOrders: "விழா ஆர்டர்கள் 🎉",
    menuStore: "எங்களை எங்கே காணலாம்",
    menuFeedback: "புகார் / கருத்து",
    menuContact: "தொடர்பு கொள்ள",
    quickCommercePrompt: "விரைவு டெலிவரிக்கு இங்கே ஆர்டர் செய்யவும்:",
    ecommercePrompt: "ஆன்லைனில் இங்கே ஆர்டர் செய்யவும்:",
    blinkitProductsPrompt: "Blinkit-இல் இவற்றை ஆர்டர் செய்யவும் ⚡",
    bigbasketProductsPrompt: "BigBasket-இல் இவற்றை ஆர்டர் செய்யவும் 🧺",
    swiggyProductsPrompt: "Swiggy-இல் இவற்றை ஆர்டர் செய்யவும் 🍽️",
    amazonProductsPrompt: "Amazon-இல் இவற்றை ஆர்டர் செய்யவும் 🛒",
    queryNotReceived: "பொருள் கிடைக்கவில்லை",
    queryDamaged: "பொருள் சேதமடைந்துள்ளது",
    queryQuality: "தர பிரச்சனை",
    queryOthers: "மற்றவை",
    // Party orders
    partyOrdersTitle: "விழா திட்டமிடுகிறீர்களா? விருந்துக்கு பிடித்த சிற்றுண்டிகளைத் தேர்ந்தெடுக்கவும்! 🎉",
    partyOrderCta: "விழா ஆர்டர் செய்ய",
    partyFormIntro: "உங்கள் விழா ஆர்டர் பற்றி கூறுங்கள், நாங்கள் தயார் செய்கிறோம்:",
    nameLabel: "உங்கள் பெயர்",
    partyTypeLabel: "விழா / நிகழ்ச்சி வகை",
    quantityLabel: "அளவு",
    partyDescriptionLabel: "கூடுதல் விவரங்கள் (விருப்பத்தேர்வு)",
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
      { label: (t) => t.menuQuickCommerce, next: "quick_commerce" },
      { label: (t) => t.menuEcommerce, next: "e_commerce" },
      { label: (t) => t.menuProducts, next: "products" },
      { label: (t) => t.menuPartyOrders, next: "party_orders" },
      { label: (t) => t.menuStore, next: "store" },
      { label: (t) => t.menuFeedback, next: "queries" },
      { label: (t) => t.menuContact, next: "contact" },
    ],
  },

  // Quick commerce: fast-delivery apps that stock Manimark products.
  // Choosing a platform shows the 3 products available there.
  quick_commerce: {
    type: "options",
    text: (t) => t.quickCommercePrompt,
    options: [
      { label: "⚡ Blinkit", next: "quick_commerce_blinkit" },
      { label: "🧺 BigBasket", next: "quick_commerce_bigbasket" },
      { label: (t) => t.goBack, next: "main_menu" },
    ],
  },

  quick_commerce_blinkit: {
    type: "products",
    text: (t) => t.blinkitProductsPrompt,
    platform: "blinkit",
    accent: "quickcommerce",
    backTo: "quick_commerce",
  },

  quick_commerce_bigbasket: {
    type: "products",
    text: (t) => t.bigbasketProductsPrompt,
    platform: "bigbasket",
    accent: "quickcommerce",
    backTo: "quick_commerce",
  },

  // E-commerce: marketplaces / food-delivery apps that list Manimark products.
  // Choosing a platform shows the 3 products available there.
  e_commerce: {
    type: "options",
    text: (t) => t.ecommercePrompt,
    options: [
      { label: "🍽️ Swiggy", next: "e_commerce_swiggy" },
      { label: "🛒 Amazon", next: "e_commerce_amazon" },
      { label: (t) => t.goBack, next: "main_menu" },
    ],
  },

  e_commerce_swiggy: {
    type: "products",
    text: (t) => t.swiggyProductsPrompt,
    platform: "swiggy",
    accent: "ecommerce",
    backTo: "e_commerce",
  },

  e_commerce_amazon: {
    type: "products",
    text: (t) => t.amazonProductsPrompt,
    platform: "amazon",
    accent: "ecommerce",
    backTo: "e_commerce",
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

  // Party Orders: show the same snack catalog with photos, plus a CTA
  // that opens the party-order form below.
  party_orders: {
    type: "products",
    text: (t) => t.partyOrdersTitle,
    platform: "snacks",
    accent: "party",
    cta: {
      label: (t) => t.partyOrderCta,
      queryType: "party_order",
      next: "party_order_form",
    },
  },

  // Party order form: fields collected then POSTed to the backend
  // with queryType "party_order".
  party_order_form: {
    type: "form",
    text: (t) => t.partyFormIntro,
    fields: [
      { key: "name", labelKey: "nameLabel" },
      { key: "contactNumber", labelKey: "contactLabel", inputType: "tel" },
      { key: "typeOfParty", labelKey: "partyTypeLabel" },
      { key: "product", labelKey: "productLabel" },
      { key: "quantity", labelKey: "quantityLabel", inputType: "number" },
      { key: "description", labelKey: "partyDescriptionLabel", multiline: true },
    ],
    next: "thank_you",
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