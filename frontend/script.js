/*==================================================
            Agriculture AI Agent
            script.js - Part 1
==================================================*/

/*==================================================
                DOM Elements
==================================================*/

// Navbar
const menuBtn = document.getElementById("menuBtn");
const themeBtn = document.getElementById("themeBtn");
const heroUploadBtn = document.getElementById("heroUploadBtn");
const insightBtn = document.getElementById("insightBtn");
const newAnalysisBtn = document.getElementById("newAnalysisBtn");
const toast = document.getElementById("toast");

// Sidebar
const sidebar = document.querySelector(".sidebar");

// Upload
const uploadArea = document.getElementById("uploadArea");
const imageInput = document.getElementById("imageInput");
const chooseImage = document.getElementById("chooseImage");
const previewImage = document.getElementById("previewImage");
const imageName = document.getElementById("imageName");
const analyzeBtn = document.getElementById("analyzeBtn");

// Analysis
const progressBar = document.getElementById("progressBar");
const analysisStatus = document.getElementById("analysisStatus");

// Results
const imageType = document.getElementById("imageType");
const confidence = document.getElementById("confidence");
const status = document.getElementById("status");
const recommendation = document.getElementById("recommendation");

// Recommendations
const recommendationList = document.getElementById("recommendationList");

// Chat
const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const voiceBtn = document.getElementById("voiceBtn");

// Assistant Panel
const assistantFloatBtn = document.getElementById("assistantFloatBtn");
const assistantPanel = document.getElementById("assistantPanel");
const assistantCloseBtn = document.getElementById("assistantCloseBtn");
const assistantPanelBody = document.getElementById("assistantPanelBody");
const assistantInput = document.getElementById("assistantInput");
const assistantSendBtn = document.getElementById("assistantSendBtn");

// Weather
const temperature = document.getElementById("temperature");
const weatherStatus = document.getElementById("weatherStatus");

// Activity
const activityList = document.querySelector(".activity-list");
const accountModal = document.getElementById("accountModal");
const settingsModal = document.getElementById("settingsModal");
const accountCloseBtn = document.getElementById("accountCloseBtn");
const settingsCloseBtn = document.getElementById("settingsCloseBtn");
const profileTrigger = document.getElementById("profileTrigger");
const accountTabs = document.querySelectorAll(".account-tab-btn");
const accountNameField = document.getElementById("accountNameField");
const accountPassword = document.getElementById("accountPassword");
const saveSettingsBtn = document.getElementById("saveSettingsBtn");


/*==================================================
                Application State
==================================================*/

const appState = {

    uploadedImage: null,

    imageType: "",

    confidence: 0,

    analysisComplete: false,

    darkMode: false

};

const translations = {

    en: {

        nav: { logo: "🌾 Agriculture AI" },

        sidebar: {

            newAnalysis: "New Analysis",

            cardText: "Monitor crops, soil, weather, and recommendations in one place.",

            workspace: "Workspace",

            dashboard: "Dashboard",

            uploadImage: "Upload Image",

            cropRecommendation: "Crop Recommendation",

            diseaseDetection: "Disease Detection",

            history: "History",

            services: "Services",

            weather: "Weather",

            marketPrices: "Market Prices",

            settings: "Settings"

        },

        hero: {

            badge: "Smart farm insights in seconds",

            title: "👋 Welcome to Agriculture AI Agent",

            description: "Upload any agriculture-related image and let AI identify, analyze, and recommend the best solution.",

            uploadButton: "Upload image",

            insightButton: "Quick insights",

            metricCropTitle: "Crop health",

            metricCropText: "Instant scoring",

            metricWeatherTitle: "Weather-aware",

            metricWeatherText: "Contextual advice",

            metricActionTitle: "Actionable",

            metricActionText: "Fertilizer & irrigation"

        },

        recommendation: {

            title: "🌱 AI Recommendations",

            description: "Personalized recommendations based on the uploaded image."

        },

        chat: {

            title: "💬 Agriculture AI Assistant",

            greeting: "👋 Hello! I'm your Agriculture AI Assistant.",

            askAnything: "Ask me anything about:",

            crops: "🌱 Crops",

            soil: "🪨 Soil",

            diseases: "🍃 Plant Diseases",

            pests: "🐛 Pests",

            irrigation: "💧 Irrigation",

            weather: "🌦 Weather",

            placeholder: "Ask anything about agriculture..."

        },

        assistant: {

            title: "Farm Assistant",

            subtitle: "Guidance for customers",

            greeting: "Hello! I can guide you through uploads, recommendations, weather insights, and how to assess the app experience.",

            chipUpload: "Upload image",

            chipRecommendations: "Recommendations",

            chipAssess: "Assess the web",

            placeholder: "Ask the assistant...",

            startPrompt: "How can I get started?"

        },

        settings: {

            title: "⚙️ Settings",

            description: "Choose your preferred language for the dashboard.",

            nameLabel: "Full name",

            namePlaceholder: "Asha Rao",

            emailLabel: "Email",

            emailPlaceholder: "asha@example.com",

            locationLabel: "Farm location",

            locationPlaceholder: "Hyderabad, Telangana",

            languageLabel: "Preferred language",

            saveButton: "Confirm language"

        },

        account: {

            title: "Account",

            subtitle: "Sign in or create an account",

            loginTab: "Login",

            registerTab: "Register",

            nameLabel: "Full name",

            emailLabel: "Email",

            passwordLabel: "Password",

            submitLogin: "Sign in",

            submitRegister: "Create account"

        },

        notifications: {

            insight: "Sample insight: leafy crops are showing healthy vigor and moderate moisture.",

            newAnalysis: "Ready for a new analysis.",

            analysisComplete: "Analysis completed with fresh recommendations.",

            voiceUnsupported: "Voice input is not supported in this browser.",

            voiceInterrupted: "Voice input was interrupted.",

            imageReceived: "Image received. The assistant can guide the next step.",

            uploadFlow: "Upload a photo to start the analysis flow.",

            recommendationsReady: "The recommendations panel is ready for review.",

            diseaseGuidance: "Disease guidance and prevention tips are available here.",

            weatherAdvice: "Weather-aware crop advice is available in the dashboard.",

            marketAdvice: "Market insights and pricing guidance are ready in the assistant panel.",

            settingsAdvice: "Settings and preferences can be adjusted from the dashboard.",

            historyPrompt: "Show me the recent history and help me continue.",

            profileSaved: "Profile saved."

        },

        chatReplies: {

            soil: "Soil quality matters most. I recommend checking pH, adding compost, and keeping the moisture balanced for healthy roots.",

            weather: "Weather conditions can shift irrigation needs quickly. I suggest watering early in the morning and monitoring forecast changes.",

            disease: "If you suspect pests or disease, isolate the affected plants and treat early with the recommended crop-specific solution.",

            default: "I can help with crop selection, fertilization, irrigation, weather-aware planning, and disease prevention tips."

        },

        assistantReplies: {

            upload: "To upload an image, click the upload button in the hero section or use the Upload Image item in the sidebar. The system will analyze it and suggest actions.",

            recommendation: "Open the recommendations section to view crop guidance, fertilizer tips, and disease-prevention suggestions based on the latest analysis.",

            assess: "To assess the web experience, review the dashboard summary, check the recommendation panel, and ask the assistant for next steps or support.",

            weather: "For weather-related advice, review the forecast and irrigation guidance in the main dashboard and adjust your plan accordingly.",

            default: "I can help with product guidance, crop recommendations, weather advice, or how to use the web dashboard effectively."

        }

    },

    ar: {

        nav: { logo: "🌾 الذكاء الاصطناعي للزراعة" },

        sidebar: {

            newAnalysis: "تحليل جديد",

            cardText: "راقب المحاصيل والتربة والطقس والتوصيات في مكان واحد.",

            workspace: "المساحة العملية",

            dashboard: "لوحة التحكم",

            uploadImage: "رفع صورة",

            cropRecommendation: "توصية المحاصيل",

            diseaseDetection: "كشف الأمراض",

            history: "السجل",

            services: "الخدمات",

            weather: "الطقس",

            marketPrices: "أسعار السوق",

            settings: "الإعدادات"

        },

        hero: {

            badge: "رؤى ذكية للمزرعة في ثوانٍ",

            title: "👋 مرحبًا بكم في مساعد الزراعة الذكي",

            description: "ارفع أي صورة مرتبطة بالزراعة ودع الذكاء الاصطناعي يحدد وينحل ويقترح أفضل حل.",

            uploadButton: "رفع صورة",

            insightButton: "رؤى سريعة",

            metricCropTitle: "صحة المحصول",

            metricCropText: "تقييم فوري",

            metricWeatherTitle: "مستند للطقس",

            metricWeatherText: "نصائح سياقية",

            metricActionTitle: "قابل للتنفيذ",

            metricActionText: "التسميد والري"

        },

        recommendation: {

            title: "🌱 توصيات الذكاء الاصطناعي",

            description: "توصيات شخصية بناءً على الصورة المرفوعة."

        },

        chat: {

            title: "💬 مساعد الزراعة الذكي",

            greeting: "👋 مرحبًا! أنا مساعد الزراعة الذكي.",

            askAnything: "اسألني عن أي شيء يتعلق بـ:",

            crops: "🌱 المحاصيل",

            soil: "🪨 التربة",

            diseases: "🍃 أمراض النباتات",

            pests: "🐛 الآفات",

            irrigation: "💧 الري",

            weather: "🌦 الطقس",

            placeholder: "اسأل عن أي شيء يتعلق بالزراعة..."

        },

        assistant: {

            title: "المساعد الزراعي",

            subtitle: "إرشادات للعملاء",

            greeting: "مرحبًا! أستطيع توجيهك خلال عمليات الرفع والتوصيات والرؤى الجوية وكيفية تقييم تجربة التطبيق.",

            chipUpload: "رفع صورة",

            chipRecommendations: "التوصيات",

            chipAssess: "تقييم الموقع",

            placeholder: "اسأل المساعد...",

            startPrompt: "كيف أبدأ؟"

        },

        settings: {

            title: "⚙️ الإعدادات",

            description: "اختر اللغة المفضلة للوحة التحكم.",

            nameLabel: "الاسم الكامل",

            namePlaceholder: "آشا راو",

            emailLabel: "البريد الإلكتروني",

            emailPlaceholder: "asha@example.com",

            locationLabel: "موقع المزرعة",

            locationPlaceholder: "حيدر أباد، تلانجانا",

            languageLabel: "اللغة المفضلة",

            saveButton: "تأكيد اللغة"

        },

        account: {

            title: "الحساب",

            subtitle: "تسجيل الدخول أو إنشاء حساب",

            loginTab: "تسجيل الدخول",

            registerTab: "إنشاء حساب",

            nameLabel: "الاسم الكامل",

            emailLabel: "البريد الإلكتروني",

            passwordLabel: "كلمة المرور",

            submitLogin: "تسجيل الدخول",

            submitRegister: "إنشاء الحساب"

        },

        notifications: {

            insight: "رؤية نموذجية: المحاصيل الورقية تظهر قوة صحية ورطوبة معتدلة.",

            newAnalysis: "استعداد لتحليل جديد.",

            analysisComplete: "اكتمل التحليل مع توصيات جديدة.",

            voiceUnsupported: "الإدخال الصوتي غير مدعوم في هذا المتصفح.",

            voiceInterrupted: "تم مقاطعة الإدخال الصوتي.",

            imageReceived: "تم استلام الصورة. يمكن للمساعد توجيه الخطوة التالية.",

            uploadFlow: "ارفع صورة لبدء تدفق التحليل.",

            recommendationsReady: "قسم التوصيات جاهز للمراجعة.",

            diseaseGuidance: "إرشادات الأمراض ونصائح الوقاية متاحة هنا.",

            weatherAdvice: "نصائح المحاصيل المرتبطة بالطقس متاحة في لوحة التحكم.",

            marketAdvice: "رؤى السوق ونصائح الأسعار جاهزة في لوحة المساعد.",

            settingsAdvice: "يمكن تعديل الإعدادات والتفضيلات من لوحة التحكم.",

            historyPrompt: "أرني السجل الأخير وساعدني على المتابعة.",

            profileSaved: "تم حفظ الملف الشخصي."

        },

        chatReplies: {

            soil: "جودة التربة مهمة جدًا. أوصي بفحص الأس الهيدروجيني وإضافة السماد العضوي والحفاظ على الرطوبة متوازنة لأجل جذور صحية.",

            weather: "قد تغير الظروف الجوية احتياجات الري بسرعة. أوصي بالري مبكرًا في الصباح ومتابعة توقعات الطقس.",

            disease: "إذا suspected pests or disease, isolate the affected plants and treat early with the recommended crop-specific solution.",

            default: "أستطيع المساعدة في اختيار المحاصيل والتسميد والري والتخطيط بناءً على الطقس والوقاية من الأمراض."

        },

        assistantReplies: {

            upload: "لرفع صورة، اضغط على زر الرفع في قسم البداية أو استخدم عنصر رفع الصورة في الشريط الجانبي. سيقوم النظام بتحليلها واقتراح الإرشادات.",

            recommendation: "افتح قسم التوصيات لعرض إرشادات المحاصيل ونصائح التسميد وإرشادات الوقاية من الأمراض بناءً على أحدث تحليل.",

            assess: "لتقييم تجربة الموقع، راجع ملخص لوحة التحكم وافحص قسم التوصيات واطلب من المساعد الخطوات التالية أو الدعم.",

            weather: "للحصول على نصائح مرتبطة بالطقس، راجع التوقعات وإرشادات الري في لوحة التحكم الرئيسية واضبط خطتك وفقًا لذلك.",

            default: "أستطيع المساعدة في التوجيه حول المنتج وتوصيات المحاصيل والنصائح الجوية أو كيفية استخدام لوحة التحكم بكفاءة."

        }

    },

    te: {

        nav: { logo: "🌾 వ్యవసాయ AI" },

        sidebar: {

            newAnalysis: "కొత్త విశ్లేషణ",

            cardText: "పంటలు, మట్టి, వాతావరణం మరియు సిఫార్సులు ఒకే చోట చూడండి.",

            workspace: "కార్యక్షేత్రం",

            dashboard: "డ్యాష్‌బోర్డ్",

            uploadImage: "చిత్రాన్ని అప్లోడ్ చేయండి",

            cropRecommendation: "పంట సిఫార్సు",

            diseaseDetection: "వ్యాధి గుర్తింపు",

            history: "చరిత్ర",

            services: "సేవలు",

            weather: "వాతావరణం",

            marketPrices: "మార్కెట్ ధరలు",

            settings: "సెట్టింగ్‌లు"

        },

        hero: {

            badge: "సెకన్లలో శక్తివంతమైన రైతు అంతర్దృష్టులు",

            title: "👋 వ్యవసాయ AI ఏజెంట్‌కు స్వాగతం",

            description: "ఏదైనా వ్యవసాయ సంబంధిత చిత్రాన్ని అప్లోడ్ చేసి, AI దానిని గుర్తించి, విశ్లేషించి, ఉత్తమ సలహా ఇవ్వనివ్వండి.",

            uploadButton: "చిత్రాన్ని అప్లోడ్ చేయండి",

            insightButton: "త్వరిత అంతర్దృష్టులు",

            metricCropTitle: "పంట ఆరోగ్యం",

            metricCropText: "తక్షణ స్కోరింగ్",

            metricWeatherTitle: "వాతావరణ-ఆధారిత",

            metricWeatherText: "సందర్భ-ఆధారిత సలహాలు",

            metricActionTitle: "చర్యాత్మక",

            metricActionText: "ఎరువులు మరియు సస్యపోషణ"

        },

        recommendation: {

            title: "🌱 AI సిఫార్సులు",

            description: "అప్లోడ్ చేసిన చిత్రంపై ఆధారంగా వ్యక్తిగతీకరించిన సిఫార్సులు."

        },

        chat: {

            title: "💬 వ్యవసాయ AI అసిస్టెంట్",

            greeting: "👋こんにちは! నేను మీ వ్యవసాయ AI అసిస్టెంట్.",

            askAnything: "దయచేసి ఈ বিষয়ে anything about:",

            crops: "🌱 పంటలు",

            soil: "🪨 మట్టి",

            diseases: "🍃 మొక్కల వ్యాధులు",

            pests: "🐛 కీటకాలు",

            irrigation: "💧 పుష్కలమైన నీరు",

            weather: "🌦 వాతావరణం",

            placeholder: "వ్యవసాయంపై ఏదైనా అడగండి..."

        },

        assistant: {

            title: "అసిస్టెంట్",

            subtitle: "కస్టమర్లకు మార్గదర్శకత్వం",

            greeting: "హలో! చిత్రాలు అప్లోడ్ చేయడం, సిఫార్సులు, వాతావరణ అంతర్దృష్టులు మరియు వెబ్ అనుభవాన్ని అంచనా వేయడం గురించి నేను మీకు మార్గదర్శనం చేసగలను.",

            chipUpload: "చిత్రాన్ని అప్లోడ్ చేయండి",

            chipRecommendations: "సిఫార్సులు",

            chipAssess: "వెబ్‌ను అంచనా వేయండి",

            placeholder: "అసిస్టెంట్‌ను అడగండి...",

            startPrompt: "నన్ను ఎలా ప్రారంభించగలను?"

        },

        settings: {

            title: "⚙️ సెట్టింగ్‌లు",

            description: "డ్యాష్‌బోర్డ్ కోసం మీ ఇష్టమైన భాషను ఎంచుకోండి.",

            nameLabel: "పూర్తి పేరు",

            namePlaceholder: "అశ్వని రావు",

            emailLabel: "ఇమెయిల్",

            emailPlaceholder: "ashwini@example.com",

            locationLabel: "పంటల స్థానం",

            locationPlaceholder: "హైదరాబాదు, తెలంగాణ",

            languageLabel: "ఇష్టమైన భాష",

            saveButton: "భాషను నిర్ధారించండి"

        },

        account: {

            title: "ఖాతా",

            subtitle: "లాగిన్ లేదా ఖాతాను సృష్టించండి",

            loginTab: "లాగిన్",

            registerTab: "రిజిస్టర్",

            nameLabel: "పూర్తి పేరు",

            emailLabel: "ఇమెయిల్",

            passwordLabel: "పాస్వర్డ్",

            submitLogin: "లాగిన్",

            submitRegister: "ఖాతాను సృష్టించండి"

        },

        notifications: {

            insight: "నమూనా అంతర్దృష్టి: ఆకుల పంటలు ఆరోగ్యకరమైన శక్తి మరియు మితమైన తేమను చూపిస్తున్నాయి.",

            newAnalysis: "కొత్త విశ్లేషణకు సిద్ధంగా ఉంది.",

            analysisComplete: "విశ్లేషణ పూర్తయింది, తాజా సిఫార్సులతో.",

            voiceUnsupported: "ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ మద్దతు లేదు.",

            voiceInterrupted: "వాయిస్ ఇన్‌పుట్ మధ్యలో ఆపివేయబడింది.",

            imageReceived: "చిత్రం అందుకుంది. తదుపరి దశకు అసిస్టెంట్ మార్గదర్శనం చేస్తుంది.",

            uploadFlow: "విశ్లేషణను ప్రారంభించడానికి చిత్రాన్ని అప్లోడ్ చేయండి.",

            recommendationsReady: "సిఫార్సుల విభాగం సమీక్షకు సిద్ధంగా ఉంది.",

            diseaseGuidance: "వ్యాధి మార్గదర్శకాలు మరియు నివారణ చిట్కాలు ఇక్కడ అందుబాటులో ఉన్నాయి.",

            weatherAdvice: "వాతావరణ-ఆధారిత పంట సలహాలు డ్యాష్‌బోర్డ్‌లో అందుబాటులో ఉన్నాయి.",

            marketAdvice: "మార్కెట్ అంతర్దృష్టులు మరియు ధరల మార్గదర్శకత్వం అసిస్టెంట్ ప్యానెల్‌లో సిద్ధంగా ఉన్నాయి.",

            settingsAdvice: "సెట్టింగ్‌లు మరియు ప్రాధాన్యతలను డ్యాష్‌బోర్డ్ నుండి మార్చవచ్చు.",

            historyPrompt: "నా ఇటీవలి చరిత్రను చూపించి, కొనసాగడానికి నాకు సహాయం చేయండి.",

            profileSaved: "ప్రొఫైల్ సేవ్ చేయబడింది."

        },

        chatReplies: {

            soil: "మట్టির నాణ్యత చాలా ముఖ్యమైనది. pH తనిఖీ చేయడం, పొడవైన ఎరువును జోడించడం మరియు ఆరోగ్యకరమైన మూలాలకు తేమను సమతుల్యంగా ఉంచడం నేను సిఫార్సు చేస్తాను.",

            weather: "వాతావరణ పరిస్థితులు పంట నీటి అవసరాలను త్వరగా మార్చగలవు. సాయంత్రానికి ముందు నీరు పెట్టడం మరియు వాతావరణ అంచనాలను పర్యవేక్షించడం నేను సిఫార్సు చేస్తాను.",

            disease: "మీరు కీటకాలు లేదా వ్యాధిని అనుమానిస్తే, ప్రభావిత మొక్కలను వేరుగా ఉంచి, సిఫార్సు చేసిన పంట-నిర్దిష్ట పరిష్కారంతో త్వరగా చికిత్స చేయండి.",

            default: "పంట ఎంపిక, ఎరువులు, పుష్కలమైన నీరు, వాతావరణ-ఆధారిత ప్రణాళిక మరియు వ్యాధి నివారణకు నేను సహాయం చేయగలను."

        },

        assistantReplies: {

            upload: "చిత్రాన్ని అప్లోడ్ చేయడానికి, హీరో విభాగంలో ఉన్న అప్లోడ్ బటన్‌ను క్లిక్ చేయండి లేదా సైడ్‌బార్‌లోని అప్లోడ్ ఇమేజ్ అంశాన్ని ఉపయోగించండి. సిస్టమ్ దానిని విశ్లేషించి చర్యలను సూచిస్తుంది.",

            recommendation: "సిఫార్సుల విభాగాన్ని తెరిచి, తాజా విశ్లేషణ ఆధారంగా పంట మార్గదర్శకాలు, ఎరువుల చిట్కాలు మరియు వ్యాధి నివారణ ప్రతిపాదనలను చూడండి.",

            assess: "వెబ్ అనుభవాన్ని అంచనా వేయడానికి, డ్యాష్‌బోర్డ్ సారాంశాన్ని పరిశీలించి, సిఫార్సుల ప్యానెల్‌ను తనిఖీ చేసి, అసిస్టెంట్ ద్వారా తదుపరి దశలు లేదా సహాయం అడగండి.",

            weather: "వాతావరణ సంబంధిత సలహాల కోసం, ప్రధాన డ్యాష్‌బోర్డ్‌లో వాతావరణ అంచనాలు మరియు నీటి పుష్కల మార్గదర్శకాలను పరిశీలించి, మీ ప్రణాళికను దానికి అనుగుణంగా సవరించండి.",

            default: "ఉత్పత్తి మార్గదర్శకత్వం, పంట సిఫార్సులు, వాతావరణ సలహాలు లేదా వెబ్ డాష్‌బోర్డ్‌ను సమర్థంగా ఉపయోగించడం గురించి నేను సహాయం చేయగలను."

        }

    }

};

let currentLang = "en";

function getText(key){

    const currentTranslations = translations[currentLang] || translations.en;

    return key.split('.').reduce((acc, part) => acc && acc[part], currentTranslations) || key;

}

function loadProfile(){

    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");
    const profileLocation = document.getElementById("profileLocation");

    if(profileName){

        profileName.value = localStorage.getItem("profileName") || "";

    }

    if(profileEmail){

        profileEmail.value = localStorage.getItem("profileEmail") || "";

    }

    if(accountPassword){

        accountPassword.value = localStorage.getItem("accountPassword") || "";

    }

}

function saveProfile(event){

    if(event){

        event.preventDefault();

    }

    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");
    const profileLocation = document.getElementById("profileLocation");

    if(profileName){

        localStorage.setItem("profileName", profileName.value);

    }

    if(profileEmail){

        localStorage.setItem("profileEmail", profileEmail.value);

    }

    if(accountPassword){

        localStorage.setItem("accountPassword", accountPassword.value);

    }

    showNotification(getText("notifications.profileSaved") || "Profile saved.");

    closeAccountModal();

}

function applyTranslations(){

    document.documentElement.lang = currentLang === "te" ? "te" : "en";

    document.body.dir = "ltr";

    document.querySelectorAll("[data-i18n]").forEach((element) => {

        const key = element.getAttribute("data-i18n");

        const value = getText(key);

        if(value){

            element.textContent = value;

        }

    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {

        const key = element.getAttribute("data-i18n-placeholder");

        const value = getText(key);

        if(value){

            element.placeholder = value;

        }

    });

    const settingsLanguageSelect = document.getElementById("settingsLanguageSelect");

    if(settingsLanguageSelect){

        settingsLanguageSelect.value = currentLang;

    }

}

function setLanguage(lang){

    if(lang === "te"){

        currentLang = "te";

    } else {

        currentLang = "en";

    }

    localStorage.setItem("language", currentLang);

    applyTranslations();

}


/*==================================================
                Helper Functions
==================================================*/

/**
 * Update analysis status text
 */
function setStatus(message){

    if(analysisStatus){

        analysisStatus.textContent = message;

    }

}

/**
 * Update progress bar
 */
function updateProgress(value){

    if(progressBar){

        progressBar.style.width = value + "%";

    }

}

/**
 * Reset analysis section
 */
function resetAnalysis(){

    updateProgress(0);

    setStatus("Waiting for image...");

    if(imageType) imageType.textContent = "-";
    if(confidence) confidence.textContent = "-";
    if(status) {

        status.textContent = "-";
        status.className = "";

    }
    if(recommendation) recommendation.textContent = "-";

    if(recommendationList){

        recommendationList.innerHTML = `

            <div class="recommend-item">

                <i class="fas fa-seedling"></i>

                <div>

                    <h4>Upload an image to receive recommendations</h4>

                    <p>Crop suggestions, disease treatments, fertilizer advice, and more will appear here.</p>

                </div>

            </div>

        `;

    }

    appState.analysisComplete = false;

}

/**
 * Add recent activity
 */
function addActivity(message){

    if(!activityList) return;

    const item = document.createElement("li");

    item.textContent = message;

    activityList.prepend(item);

}

/**
 * Show notification
 */
function showNotification(message){

    if(!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showNotification.timeoutId);
    showNotification.timeoutId = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

function updateDashboard(result){

    if(imageType) imageType.textContent = result.imageType || "Unknown";

    if(confidence) confidence.textContent = `${((result.confidence || 0) * 100).toFixed(0)}%`;

    if(status){

        status.textContent = result.status || "Ready";
        status.className = "";

        const statusText = (result.status || "").toLowerCase();

        if(statusText.includes("healthy")){

            status.classList.add("status-success");

        } else if(statusText.includes("check") || statusText.includes("warning")){

            status.classList.add("status-warning");

        } else{

            status.classList.add("status-danger");

        }

    }

    if(recommendation) recommendation.textContent = result.recommendation || "Monitor regularly";

    if(temperature && result.weather){

        temperature.textContent = `${result.weather.temperature || 30}°C`;

    }

    if(weatherStatus && result.weather){

        weatherStatus.textContent = result.weather.status || "Sunny";

    }

    if(recommendationList && Array.isArray(result.recommendations)){

        if(result.recommendations.length === 0){

            recommendationList.innerHTML = `

                <div class="recommend-item">

                    <i class="fas fa-seedling"></i>

                    <div>

                        <h4>No recommendations available</h4>

                        <p>Please try another image for more tailored advice.</p>

                    </div>

                </div>

            `;

            return;

        }

        recommendationList.innerHTML = result.recommendations.map(item => `

            <div class="recommend-item">

                <i class="${item.icon || 'fas fa-leaf'}"></i>

                <div>

                    <h4>${item.title}</h4>

                    <p>${item.detail}</p>

                </div>

            </div>

        `).join("");

    }

}

function addChatMessage(text, isUser = false){

    if(!chatMessages) return;

    const message = document.createElement("div");
    message.className = isUser ? "user-message" : "bot-message";
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;

}

function getBotReply(message){

    const lower = message.toLowerCase();

    if(lower.includes("soil") || lower.includes("ph")){

        return getText("chatReplies.soil");

    }

    if(lower.includes("weather") || lower.includes("rain") || lower.includes("dry")){

        return getText("chatReplies.weather");

    }

    if(lower.includes("pest") || lower.includes("disease")){

        return getText("chatReplies.disease");

    }

    return getText("chatReplies.default");

}

function openAssistantPanel(initialText = ""){

    if(!assistantPanel) return;

    assistantPanel.classList.add("open");
    assistantPanel.setAttribute("aria-hidden", "false");

    if(initialText && assistantInput){

        assistantInput.value = initialText;

    }

    if(assistantInput){

        assistantInput.focus();

    }

}

function closeAssistantPanel(){

    if(!assistantPanel) return;

    assistantPanel.classList.remove("open");
    assistantPanel.setAttribute("aria-hidden", "true");

}

function addAssistantMessage(text, isUser = false){

    if(!assistantPanelBody) return;

    const bubble = document.createElement("div");
    bubble.className = `assistant-message ${isUser ? "user" : "bot"}`;
    bubble.textContent = text;
    assistantPanelBody.appendChild(bubble);
    assistantPanelBody.scrollTop = assistantPanelBody.scrollHeight;

}

function getAssistantReply(message){

    const lower = message.toLowerCase();

    if(lower.includes("upload") || lower.includes("image")){

        return getText("assistantReplies.upload");

    }

    if(lower.includes("recommend") || lower.includes("crop") || lower.includes("fertilizer")){

        return getText("assistantReplies.recommendation");

    }

    if(lower.includes("assess") || lower.includes("web") || lower.includes("website")){

        return getText("assistantReplies.assess");

    }

    if(lower.includes("weather") || lower.includes("rain") || lower.includes("dry")){

        return getText("assistantReplies.weather");

    }

    return getText("assistantReplies.default");

}

function sendAssistantMessage(){

    if(!assistantInput || !assistantPanelBody) return;

    const value = assistantInput.value.trim();

    if(!value) return;

    addAssistantMessage(value, true);
    assistantInput.value = "";

    setTimeout(() => {

        addAssistantMessage(getAssistantReply(value));

    }, 600);

}

function handleChatSubmit(){

    if(!userInput || !chatMessages) return;

    const value = userInput.value.trim();

    if(!value) return;

    addChatMessage(value, true);
    userInput.value = "";

    setTimeout(() => {

        addChatMessage(getBotReply(value));

    }, 700);

}

function toggleVoiceInput(){

    if(!voiceBtn || !userInput || !('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)){

        showNotification(getText("notifications.voiceUnsupported"));
        return;

    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    voiceBtn.classList.add('listening');
    voiceBtn.innerHTML = '<i class="fas fa-stop"></i>';

    recognition.onresult = (event) => {

        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
        voiceBtn.classList.remove('listening');
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        handleChatSubmit();

    };

    recognition.onerror = () => {

        voiceBtn.classList.remove('listening');
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        showNotification(getText("notifications.voiceInterrupted"));

    };

    recognition.onend = () => {

        voiceBtn.classList.remove('listening');
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';

    };

    recognition.start();

}

/*==================================================
                Startup
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    console.log("🌾 Agriculture AI Agent Loaded");

    resetAnalysis();
    loadTheme();
    loadProfile();
    setLanguage(localStorage.getItem("language") || "en");

    const profileForm = document.getElementById("profileForm");

    if(profileForm){

        profileForm.addEventListener("submit", saveProfile);

    }

    if(accountModal){

        accountModal.addEventListener("click", (event) => {

            if(event.target === accountModal){

                closeAccountModal();

            }

        });

    }

    if(settingsModal){

        settingsModal.addEventListener("click", (event) => {

            if(event.target === settingsModal){

                closeSettingsModal();

            }

        });

    }

    if(accountCloseBtn){

        accountCloseBtn.addEventListener("click", closeAccountModal);

    }

    if(settingsCloseBtn){

        settingsCloseBtn.addEventListener("click", closeSettingsModal);

    }

    if(saveSettingsBtn){

        saveSettingsBtn.addEventListener("click", () => {

            const select = document.getElementById("settingsLanguageSelect");

            if(select){

                setLanguage(select.value);

            }

            closeSettingsModal();

        });

    }

    if(profileTrigger){

        profileTrigger.addEventListener("click", openAccountModal);

    }

    accountTabs.forEach((tab) => {

        tab.addEventListener("click", () => {

            const mode = tab.dataset.mode || "login";
            localStorage.setItem("accountMode", mode);
            setAccountMode(mode);

        });

    });

    setAccountMode(localStorage.getItem("accountMode") || "login");

    if (heroUploadBtn) {

        heroUploadBtn.addEventListener("click", () => imageInput?.click());

    }

    if (insightBtn) {

        insightBtn.addEventListener("click", () => {

            showNotification(getText("notifications.insight"));

        });

    }

    if (newAnalysisBtn) {

        newAnalysisBtn.addEventListener("click", () => {

            clearImage();
            showNotification(getText("notifications.newAnalysis"));

        });

    }

    if (sendBtn) {

        sendBtn.addEventListener("click", handleChatSubmit);

    }

    if (voiceBtn) {

        voiceBtn.addEventListener("click", toggleVoiceInput);

    }

    if (assistantFloatBtn) {

        assistantFloatBtn.addEventListener("click", () => {

            openAssistantPanel(getText("assistant.startPrompt"));

        });

    }

    if (assistantCloseBtn) {

        assistantCloseBtn.addEventListener("click", closeAssistantPanel);

    }

    if (assistantSendBtn) {

        assistantSendBtn.addEventListener("click", sendAssistantMessage);

    }

    if (assistantInput) {

        assistantInput.addEventListener("keydown", (event) => {

            if(event.key === "Enter"){

                event.preventDefault();
                sendAssistantMessage();

            }

        });

    }

    document.querySelectorAll(".assistant-chip").forEach(chip => {

        chip.addEventListener("click", () => {

            const action = chip.dataset.action;

            if(action === "upload"){

                openAssistantPanel("How do I upload an image?");
                sendAssistantMessage();

            } else if(action === "recommendation"){

                openAssistantPanel("How do I view recommendations?");
                sendAssistantMessage();

            } else if(action === "web"){

                openAssistantPanel("How do I assess the web experience?");
                sendAssistantMessage();

            }

        });

    });

    if (userInput) {

        userInput.addEventListener("keydown", (event) => {

            if(event.key === "Enter"){

                event.preventDefault();
                handleChatSubmit();

            }

        });

    }

});
/*==================================================
            UI INTERACTIONS
            script.js - Part 2
==================================================*/


/*==================================================
                Sidebar Toggle
==================================================*/

if (menuBtn && sidebar) {

    menuBtn.addEventListener("click", () => {

        sidebar.classList.toggle("collapsed");
        document.querySelector('.dashboard').classList.toggle('sidebar-collapsed');

        if (window.innerWidth <= 992) {

            sidebar.classList.toggle("active");

        }

    });

}


/*==================================================
                Dark Mode
==================================================*/

function enableDarkMode() {

    document.body.classList.add("dark");

    localStorage.setItem("theme", "dark");

    appState.darkMode = true;

}

function disableDarkMode() {

    document.body.classList.remove("dark");

    localStorage.setItem("theme", "light");

    appState.darkMode = false;

}

function loadTheme() {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        enableDarkMode();

    } else {

        disableDarkMode();

    }

}

if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        if (document.body.classList.contains("dark")) {

            disableDarkMode();

        } else {

            enableDarkMode();

        }

    });

}

const settingsLanguageSelect = document.getElementById("settingsLanguageSelect");

if (settingsLanguageSelect) {

    settingsLanguageSelect.addEventListener("change", (event) => {

        setLanguage(event.target.value);

    });

}


/*==================================================
            Sidebar Active Menu
==================================================*/

function setActiveMenuItem(targetId){

    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach(item => {

        item.classList.toggle("active", item.dataset.target === targetId);

    });

}

function openAccountModal(){

    if(accountModal){

        accountModal.classList.add("open");
        accountModal.setAttribute("aria-hidden", "false");

    }

}

function closeAccountModal(){

    if(accountModal){

        accountModal.classList.remove("open");
        accountModal.setAttribute("aria-hidden", "true");

    }

}

function openSettingsModal(){

    if(settingsModal){

        settingsModal.classList.add("open");
        settingsModal.setAttribute("aria-hidden", "false");

    }

}

function closeSettingsModal(){

    if(settingsModal){

        settingsModal.classList.remove("open");
        settingsModal.setAttribute("aria-hidden", "true");

    }

}

function setAccountMode(mode){

    const activeMode = mode === "register" ? "register" : "login";

    accountTabs.forEach((tab) => {

        tab.classList.toggle("active", tab.dataset.mode === activeMode);

    });

    if(accountNameField){

        accountNameField.style.display = activeMode === "register" ? "flex" : "none";

    }

    const saveButton = document.getElementById("saveProfileBtn");

    if(saveButton){

        const label = saveButton.querySelector("span");

        if(label){

            label.textContent = activeMode === "register" ? getText("account.submitRegister") : getText("account.submitLogin");

        }

    }

}

function handleSidebarAction(targetId, action){

    const targetSection = document.getElementById(targetId);

    if(targetSection){

        targetSection.scrollIntoView({behavior:"smooth", block:"start"});

    }

    if(action === "upload"){

        if(imageInput){

            imageInput.click();

        }

        showNotification(getText("notifications.uploadFlow"));

    } else if(action === "recommendation"){

        showNotification(getText("notifications.recommendationsReady"));

    } else if(action === "disease"){

        showNotification(getText("notifications.diseaseGuidance"));

    } else if(action === "history"){

        openAssistantPanel(getText("notifications.historyPrompt"));
        sendAssistantMessage();

    } else if(action === "weather"){

        showNotification(getText("notifications.weatherAdvice"));

    } else if(action === "market"){

        showNotification(getText("notifications.marketAdvice"));

    } else if(action === "settings"){

        openSettingsModal();
        showNotification(getText("notifications.settingsAdvice"));

    }

}

const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach(item => {

    item.addEventListener("click", function (event) {

        event.preventDefault();
        setActiveMenuItem(this.dataset.target);
        handleSidebarAction(this.dataset.target, this.dataset.action);

        if (window.innerWidth <= 992) {

            sidebar.classList.remove("active");

        }

    });

});


/*==================================================
            Notification Button
==================================================*/

const notificationBtn = document.getElementById("notificationBtn");

if (notificationBtn) {

    notificationBtn.addEventListener("click", () => {

        alert(
            "🔔 Notifications\n\nNo new notifications available."
        );

    });

}


/*==================================================
            Profile Button
==================================================*/

const profileBtn = document.querySelector(".profile-btn");

if (profileBtn) {

    profileBtn.addEventListener("click", () => {

        openAccountModal();
        showNotification("Open the account panel to sign in or register.");

    });

}


/*==================================================
            Close Sidebar on Mobile
==================================================*/

document.addEventListener("click", (event) => {

    if (window.innerWidth > 992) return;

    if (
        sidebar &&
        !sidebar.contains(event.target) &&
        !menuBtn.contains(event.target)
    ) {

        sidebar.classList.remove("active");

    }

});


/*==================================================
            Window Resize
==================================================*/

window.addEventListener("resize", () => {

    if (window.innerWidth > 992) {

        sidebar.classList.remove("active");

    }

});


/*==================================================
            Initialize UI
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    loadTheme();

});
/*==================================================
            IMAGE UPLOAD
            script.js - Part 3
==================================================*/


/*==================================================
                Upload Events
==================================================*/

if (chooseImage) {

    chooseImage.addEventListener("click", () => {

        imageInput.click();

    });

}

if (imageInput) {

    imageInput.addEventListener("change", (event) => {

        const file = event.target.files[0];

        if (file) {

            handleImage(file);

        }

    });

}


/*==================================================
                Drag & Drop
==================================================*/

if (uploadArea) {

    uploadArea.addEventListener("dragover", (e) => {

        e.preventDefault();

        uploadArea.classList.add("dragover");

    });

    uploadArea.addEventListener("dragleave", () => {

        uploadArea.classList.remove("dragover");

    });

    uploadArea.addEventListener("drop", (e) => {

        e.preventDefault();

        uploadArea.classList.remove("dragover");

        const file = e.dataTransfer.files[0];

        if (file) {

            handleImage(file);

        }

    });

}


/*==================================================
                Validate Image
==================================================*/

function validateImage(file) {

    const allowedTypes = [

        "image/jpeg",

        "image/jpg",

        "image/png",

        "image/webp"

    ];

    if (!allowedTypes.includes(file.type)) {

        alert("❌ Please upload JPG, JPEG, PNG or WEBP images.");

        return false;

    }

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {

        alert("❌ Image size should be below 10 MB.");

        return false;

    }

    return true;

}


/*==================================================
                Handle Image
==================================================*/

function handleImage(file) {

    if (!validateImage(file)) return;

    appState.uploadedImage = file;

    if (imageName) {

        imageName.textContent = file.name;

    }

    if (previewImage) {

        const reader = new FileReader();

        reader.onload = function (e) {

            previewImage.src = e.target.result;
            previewImage.style.display = "block";

        };

        reader.readAsDataURL(file);

    }

    if (analyzeBtn) {

        analyzeBtn.disabled = false;
        analyzeBtn.style.opacity = "1";

    }

    resetAnalysis();
    addActivity("Uploaded: " + file.name);

    if (recommendationList) {

        recommendationList.innerHTML = `

            <div class="recommend-item">

                <i class="fas fa-check-circle"></i>

                <div>

                    <h4>Image received</h4>

                    <p>${file.name} is ready for review. The assistant can guide you through recommendations and next steps.</p>

                </div>

            </div>

        `;

    }

    showNotification(getText("notifications.imageReceived"));

}


/*==================================================
                Remove Image
==================================================*/

function clearImage() {

    if (imageInput) imageInput.value = "";

    if (previewImage) {

        previewImage.src = "";
        previewImage.style.display = "none";

    }

    if (imageName) imageName.textContent = "No image selected";

    if (analyzeBtn) {

        analyzeBtn.disabled = true;
        analyzeBtn.style.opacity = ".6";

    }

    appState.uploadedImage = null;
    appState.analysisComplete = false;
    resetAnalysis();

}


/*==================================================
                Analyze Button
==================================================*/

if (analyzeBtn) {

    analyzeBtn.disabled = true;

    analyzeBtn.style.opacity = ".6";

    analyzeBtn.addEventListener("click", () => {

        if (!appState.uploadedImage) {

            alert("Please upload an image first.");

            return;

        }

        startAnalysis();

    });

}
/*==================================================
        FASTAPI IMAGE ANALYSIS
        script.js - Part 4
==================================================*/

const API_BASE = "http://127.0.0.1:8001";


/*==================================================
        Analyze Image
==================================================*/

async function startAnalysis(){

    if(!appState.uploadedImage){

        alert("Please upload an image.");

        return;

    }

    updateProgress(10);

    setStatus("Preparing image...");

    analyzeBtn.disabled = true;
    analyzeBtn.style.opacity = ".6";

    const formData = new FormData();

    formData.append("file", appState.uploadedImage);

    try{

        updateProgress(30);

        setStatus("Uploading image...");

        const response = await fetch(

            `${API_BASE}/analyze-image`,

            {

                method:"POST",

                body:formData

            }

        );

        if(!response.ok){

            throw new Error("Server Error");

        }

        updateProgress(70);

        setStatus("AI Processing...");

        const result = await response.json();

        updateDashboard(result);
        showNotification("Analysis completed with fresh recommendations.");

        updateProgress(100);

        setStatus("Analysis Completed");

        analyzeBtn.disabled = false;

        appState.analysisComplete = true;

        addActivity(

            `Analyzed ${appState.uploadedImage.name}`

        );

    }

    catch(error){

        console.error(error);

        analyzeBtn.disabled = false;
        analyzeBtn.style.opacity = "1";

        updateProgress(0);

        setStatus("Analysis Failed");

        alert(

            "Unable to connect to FastAPI Server."

        );

    }

}