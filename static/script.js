
let currentLang = localStorage.getItem("language") || "en";
let latestText = "";
let micUsed = false;

const translations = {

    en: {
        button: "ಕನ್ನಡ",

        home: {
            siteTitle: "Raitha<br> Bandhava",
            main_heading: "RAITA BANDHAVA",
            main_para: "Empowering Karnataka's Farmers with Modern Knowledge",

            services: "Services and Schemes",
            intro: "Learn about government benefits through easy videos.",

            calendar: "Crop Calendar",
            cal_intro: "Get recommendations based on your soil and district.",

            smart: "Smart Farming",
            smat_intro: "New techniques to increase your yield and profit.",

            disease: "Disease Detector",
            dis_intro: "Scan your crop to identify diseases instantly.",

            crop_recom: "------List of crops recommended------",

            chatbotText: "Ask your query here...",
            login:"Login",
            signup:"Sign Up",
            logout:"Logout"
        },

        servicesPage: {
            title: "Services and Schemes",

            list: [
                "Raitha Siri",
                "Fertilizer and Biofertilizer Quality Control Laboratory",
                "Karnataka Raita Suraksha Pradhana Mantri Fasal Bima Yojana",
                "Plant Protection",
                "Raitha Samparka Kendra",
                "Crop Survey Scheme",
                "Maize D B T",
                "Conservation and Promotion of Landraces",
                "Karnataka Raitha Samruddhi Yojane",
                "AGRI STARTUP"
            ]
        },

        smartPage: {
            title: "Smart Farming",

            list: [
                "Precision Farming",
                "AI Smart Irrigation",
                "Vertical Farming",
                "Agolla Cultivation",
                "Hydroponics and Aquaponics",
                "Mushroom Cultivation"
            ]
        },

        calendarPage: {
            title: "Crop Calendar",
            district: "District :",
            soil: "Soil :",
            season: "Season :",
            submit: "Submit"
        },

        diseasePage: {
            title: "Disease Detector",
            submit: "Capture",
            upload:"Upload image",
            listen: "Listen here"
        },
        chatbotPage:{
            title:"Raitha Bandava AI",
            welcome:"Hello Farmers 👋",
            subtitle:"Ask me anything about farming.",
            placeholder:"Ask anything..."
        }
    },


    kn: {
        button: "English",

        home: {
            siteTitle: "ರೈತ<br> ಬಂಧವ",

            main_heading: "ರೈತ ಬಂಧವ",

            main_para:
                "ಆಧುನಿಕ ಜ್ಞಾನದಿಂದ ಕರ್ನಾಟಕದ ರೈತರ ಸಬಲೀಕರಣ",

            services: "ಸೇವೆಗಳು ಮತ್ತು ಯೋಜನೆಗಳು",

            intro:
                "ಸರಳವಾದ ವಿಡಿಯೋಗಳ ಮೂಲಕ ಸರ್ಕಾರದ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ತಿಳಿದುಕೊಳ್ಳಿ",

            calendar: "ಬೆಳೆ ಕ್ಯಾಲೆಂಡರ್",

            cal_intro:
                "ನಿಮ್ಮ ಮಣ್ಣು ಮತ್ತು ಜಿಲ್ಲೆ ಆಧಾರದ ಮೇಲೆ ಬೆಳೆ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ",

            smart: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ",

            smat_intro:
                "ನಿಮ್ಮ ಉತ್ಪಾದನೆ ಮತ್ತು ಲಾಭವನ್ನು ಹೆಚ್ಚಿಸಲು ಹೊಸ ತಂತ್ರಗಳನ್ನು ತಿಳಿಯಿರಿ",

            disease: "ರೋಗ ಪತ್ತೆಗಾರ",

            dis_intro:
                "ನಿಮ್ಮ ಬೆಳೆಯ ರೋಗವನ್ನು ತಕ್ಷಣ ಗುರುತಿಸಿ",

            crop_recom:
                "------ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆಗಳ ಪಟ್ಟಿ------",

            chatbotText: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಕೇಳಿ...",
            login:"ಲಾಗಿನ್",
            signup: "ನೋಂದಣಿ",
            logout: "ಲಾಗ್ ಔಟ್",
        },

        servicesPage: {
            title: "ಸೇವೆಗಳು ಮತ್ತು ಯೋಜನೆಗಳು",

            list: [
                "ರೈತ ಸಿರಿ",
                "ರಸಗೊಬ್ಬರ ಮತ್ತು ಜೈವ ರಸಗೊಬ್ಬರ ಗುಣಮಟ್ಟ ನಿಯಂತ್ರಣ ಪ್ರಯೋಗಾಲಯ",
                "ಕರ್ನಾಟಕ ರೈತ ಸುರಕ್ಷಾ ಪ್ರಧಾನಮಂತ್ರಿ ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆ",
                "ಸಸ್ಯ ರಕ್ಷಣೆ",
                "ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರ",
                "ಬೆಳೆ ಸಮೀಕ್ಷೆ ಯೋಜನೆ",
                "ಮೆಕ್ಕೆಜೋಳ ಡಿ.ಬಿ.ಟಿ",
                "ಸ್ಥಳೀಯ ತಳಿಗಳ ಸಂರಕ್ಷಣೆ ಮತ್ತು ಪ್ರೋತ್ಸಾಹ",
                "ಕರ್ನಾಟಕ ರೈತ ಸಮೃದ್ಧಿ ಯೋಜನೆ",
                "ಕೃಷಿ ಸ್ಟಾರ್ಟ್‌ಅಪ್"
            ]
        },

        smartPage: {
            title: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ",

            list: [
                "ನಿಖರ ಕೃಷಿ",
                "ಎಐ ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ",
                "ಲಂಬ ಕೃಷಿ",
                "ಅಗೋಲ್ಲಾ ಬೆಳೆಗಾರಿಕೆ",
                "ಹೈಡ್ರೋಪೊನಿಕ್ಸ್ ಮತ್ತು ಅಕ್ವಾಪೊನಿಕ್ಸ್",
                "ಅಣಬೆ ಬೆಳೆಗಾರಿಕೆ"
            ]
        },

        calendarPage: {
            title: "ಬೆಳೆ ಕ್ಯಾಲೆಂಡರ್",
            district: "ಜಿಲ್ಲೆ :",
            soil: "ಮಣ್ಣು :",
            season: "ಹಂಗಾಮು :",
            submit: "ಸಲ್ಲಿಸಿ"
        },

        diseasePage: {
            title: "ರೋಗ ಪತ್ತೆಗಾರ",
            submit: "ಫೋಟೋ ತೆಗೆಯಿರಿ",
            upload:"ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
            listen: "ಇಲ್ಲಿ ಕೇಳಿ"
        },
        chatbotPage:{
            title:"ರೈತ ಬಂಧವ AI",
            welcome:"ನಮಸ್ಕಾರ ರೈತರೇ 👋",
            subtitle:"ಕೃಷಿ ಬಗ್ಗೆ ಕೇಳಿ.",
            placeholder:"ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ..."
        }
    }
};


// ======================================================
// PAGE INITIALIZATION
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Raitha Bandhava JavaScript Loaded");

    initializeNavigation();

    applyLanguage(currentLang);

    translateDropdowns(currentLang);

    translateDropdownOptions(currentLang);

    initializeLanguageButton();

    initializeChatbot();

    initializeVideoPopup();

    initializeCropRecommendation();

    initializeLoginSignup();

    loadLoggedInUser();


    const camera = document.getElementById("camera");

    if (camera) {
        startCamera();
    }

});


// ======================================================
// NAVIGATION
// ======================================================

function initializeNavigation() {

    const navMap = {
        loan: "/scheme",
        crop_cal: "/calender",
        hybrid: "/smart_farmimg",
        detector: "/disease_detector"
    };


    Object.keys(navMap).forEach(function (id) {

        const element = document.getElementById(id);

        if (element) {

            element.addEventListener("click", function () {

                window.location.href = navMap[id];

            });

        }

    });

}


// ======================================================
// LANGUAGE BUTTON
// ======================================================

function initializeLanguageButton() {

    const langBtn = document.getElementById("langBtn");

    if (!langBtn) {
        return;
    }


    langBtn.addEventListener("click", function () {

        currentLang =
            currentLang === "en"
                ? "kn"
                : "en";


        localStorage.setItem(
            "language",
            currentLang
        );


        applyLanguage(currentLang);

        translateDropdowns(currentLang);

        translateDropdownOptions(currentLang);


        console.log(
            "Language changed:",
            currentLang
        );

    });

}


// ======================================================
// APPLY LANGUAGE
// ======================================================

function applyLanguage(lang) {

    if (!translations[lang]) {
        lang = "en";
    }


    document.documentElement.lang = lang;


    // HOME PAGE

    setHTML(
        "siteTitle",
        translations[lang].home.siteTitle
    );


    setText(
        "main_heading",
        translations[lang].home.main_heading
    );


    setText(
        "main_para",
        translations[lang].home.main_para
    );


    setText(
        "services",
        translations[lang].home.services
    );


    setText(
        "intro",
        translations[lang].home.intro
    );


    setText(
        "calendar",
        translations[lang].home.calendar
    );


    setText(
        "cal_intro",
        translations[lang].home.cal_intro
    );


    setText(
        "smart",
        translations[lang].home.smart
    );


    setText(
        "smat_intro",
        translations[lang].home.smat_intro
    );


    setText(
        "disease",
        translations[lang].home.disease
    );


    setText(
        "dis_intro",
        translations[lang].home.dis_intro
    );


    setText(
        "crop_recom",
        translations[lang].home.crop_recom
    );
    
    setText(
    "chatbotText",
    translations[lang].home.chatbotText
    );

    setText(
    "loginBtn",
    translations[lang].home.login
    );

    setText(
    "signupBtn",
    translations[lang].home.signup
    );

    setText(
    "logoutBtn",
    translations[lang].home.logout
    );

    // CHATBOT PAGE

setText(
    "chatbotHeading",
    translations[lang].chatbotPage.title
);

setText(
    "welcomeHeading",
    translations[lang].chatbotPage.welcome
);

setText(
    "subtitleHeading",
    translations[lang].chatbotPage.subtitle
);

const input = document.getElementById("userInput");

if(input){
    input.placeholder =
        translations[lang].chatbotPage.placeholder;
}


    // LANGUAGE BUTTON

    setText(
        "langBtn",
        translations[lang].button
    );


    // SERVICES PAGE

    setText(
        "servicesHeading",
        translations[lang].servicesPage.title
    );


    const servicesList =
        document.getElementById("servicesList");


    if (servicesList) {

        servicesList.innerHTML = "";


        translations[lang]
            .servicesPage
            .list
            .forEach(function (item) {

                const li =
                    document.createElement("li");

                li.textContent = item;

                servicesList.appendChild(li);

            });

    }


    // SMART FARMING PAGE

    setText(
        "SmartHeading",
        translations[lang].smartPage.title
    );


    const smartList =
        document.getElementById("smart_videoList");


    if (smartList) {

        smartList.innerHTML = "";


        translations[lang]
            .smartPage
            .list
            .forEach(function (item) {

                const li =
                    document.createElement("li");

                li.textContent = item;

                smartList.appendChild(li);

            });

    }


    // DISEASE PAGE

    setText(
        "DiseaseHeading",
        translations[lang].diseasePage.title
    );


    setText(
        "captureBtn",
        translations[lang].diseasePage.submit
    );

    setText(
        "uploadBtn",
        translations[lang].diseasePage.upload
    )
    setText(
        "listenBtn",
        translations[lang].diseasePage.listen
    );


    // CALENDAR PAGE

    setText(
        "calendarHeading",
        translations[lang].calendarPage.title
    );


    setText(
        "districtLabel",
        translations[lang].calendarPage.district
    );


    setText(
        "soilLabel",
        translations[lang].calendarPage.soil
    );


    setText(
        "seasonLabel",
        translations[lang].calendarPage.season
    );


    setText(
        "submitBtn",
        translations[lang].calendarPage.submit
    );

}


// ======================================================
// CHATBOT
// ======================================================

function initializeChatbot() {

    const chatbot =
        document.getElementById("chatbot");


    if (!chatbot) {
        return;
    }


    chatbot.addEventListener("click", function () {

        window.location.href = "/chatbot";

    });

}


// ======================================================
// DROPDOWN PLACEHOLDERS
// ======================================================

function translateDropdowns(lang) {

    const districtSelect =
        document.getElementById("districtSelect");

    const soilSelect =
        document.getElementById("soilSelect");

    const seasonSelect =
        document.getElementById("seasonSelect");


    if (
        !districtSelect ||
        !soilSelect ||
        !seasonSelect
    ) {
        return;
    }


    if (lang === "kn") {

        districtSelect.options[0].text =
            "ನಿಮ್ಮ ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ";

        soilSelect.options[0].text =
            "ನಿಮ್ಮ ಮಣ್ಣಿನ ಪ್ರಕಾರ ಆಯ್ಕೆಮಾಡಿ";

        seasonSelect.options[0].text =
            "ಹಂಗಾಮು ಆಯ್ಕೆಮಾಡಿ";

    } else {

        districtSelect.options[0].text =
            "Select your district";

        soilSelect.options[0].text =
            "Select your soil type";

        seasonSelect.options[0].text =
            "Select your season";

    }

}


// ======================================================
// DROPDOWN OPTIONS
// ======================================================

function translateDropdownOptions(lang) {

    const districtSelect =
        document.getElementById("districtSelect");

    const soilSelect =
        document.getElementById("soilSelect");

    const seasonSelect =
        document.getElementById("seasonSelect");


    if (
        !districtSelect ||
        !soilSelect ||
        !seasonSelect
    ) {
        return;
    }


    const districtKN = {

        "Bagalkot": "ಬಾಗಲಕೋಟೆ",
        "Ballari": "ಬಳ್ಳಾರಿ",
        "Belagavi": "ಬೆಳಗಾವಿ",
        "Bengaluru Rural": "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ",
        "Bengaluru Urban": "ಬೆಂಗಳೂರು ನಗರ",
        "Bidar": "ಬೀದರ್",
        "Chamarajanagar": "ಚಾಮರಾಜನಗರ",
        "Chikkaballapur": "ಚಿಕ್ಕಬಳ್ಳಾಪುರ",
        "Chikkamagaluru": "ಚಿಕ್ಕಮಗಳೂರು",
        "Chitradurga": "ಚಿತ್ರದುರ್ಗ",
        "Dakshina Kannada": "ದಕ್ಷಿಣ ಕನ್ನಡ",
        "Davanagere": "ದಾವಣಗೆರೆ",
        "Dharwad": "ಧಾರವಾಡ",
        "Gadag": "ಗದಗ",
        "Hassan": "ಹಾಸನ",
        "Haveri": "ಹಾವೇರಿ",
        "Kalaburagi": "ಕಲಬುರಗಿ",
        "Kodagu": "ಕೊಡಗು",
        "Kolar": "ಕೋಲಾರ",
        "Koppal": "ಕೊಪ್ಪಳ",
        "Mandya": "ಮಂಡ್ಯ",
        "Mysuru": "ಮೈಸೂರು",
        "Raichur": "ರಾಯಚೂರು",
        "Ramanagara": "ರಾಮನಗರ",
        "Shivamogga": "ಶಿವಮೊಗ್ಗ",
        "Tumakuru": "ತುಮಕೂರು",
        "Udupi": "ಉಡುಪಿ",
        "Uttara Kannada": "ಉತ್ತರ ಕನ್ನಡ",
        "Vijayapura": "ವಿಜಯಪುರ",
        "Vijayanagara": "ವಿಜಯನಗರ",
        "Yadgir": "ಯಾದಗಿರಿ"

    };


    const soilKN = {

        Black: "ಕರಿ ಮಣ್ಣು",
        Red: "ಕೆಂಪು ಮಣ್ಣು",
        Laterite: "ಲ್ಯಾಟರೈಟ್ ಮಣ್ಣು",
        Coastal: "ತೀರ ಪ್ರದೇಶ ಮಣ್ಣು",
        Alluvial: "ಅಲ್ಲುವಿಯಲ್ ಮಣ್ಣು"

    };


    const seasonKN = {

        Kharif: "ಖರೀಫ್",
        Rabi: "ರಬಿ",
        Zaid: "ಜೈದ್"

    };


    translateOptions(
        districtSelect,
        districtKN,
        lang
    );


    translateOptions(
        soilSelect,
        soilKN,
        lang
    );


    translateOptions(
        seasonSelect,
        seasonKN,
        lang
    );

}


function translateOptions(select, translationMap, lang) {

    for (
        let i = 1;
        i < select.options.length;
        i++
    ) {

        const value =
            select.options[i].value;


        select.options[i].text =

            lang === "kn"

                ? translationMap[value] || value

                : value;

    }

}


// ======================================================
// VIDEO POPUP
// ======================================================

function initializeVideoPopup() {

    const modal =
        document.getElementById("videoModal");

    const video =
        document.getElementById("popupVideo");

    const source =
        document.getElementById("popupSource");

    const closeBtn =
        document.querySelector(".close-video");


    if (!modal || !video || !source) {
        return;
    }


    const videoConfig = {

        servicesList: [

            "/static/videos/video1.mp4",
            "/static/videos/video2.mp4",
            "/static/videos/video3.mp4",
            "/static/videos/video4.mp4",
            "/static/videos/video5.mp4",
            "/static/videos/video6.mp4",
            "/static/videos/video7.mp4",
            "/static/videos/video8.mp4",
            "/static/videos/video9.mp4",
            "/static/videos/video10.mp4"

        ],

        smart_videoList: [

            "/static/videos/video11.mp4",
            "/static/videos/video12.mp4",
            "/static/videos/video13.mp4",
            "/static/videos/video14.mp4",
            "/static/videos/video15.mp4",
            "/static/videos/video16.mp4"

        ]

    };


    Object.keys(videoConfig).forEach(function (listId) {

        const list =
            document.getElementById(listId);


        if (!list) {
            return;
        }


        list.addEventListener("click", function (event) {

            const clickedItem =
                event.target.closest("li");


            if (!clickedItem) {
                return;
            }


            const items =
                Array.from(
                    list.querySelectorAll("li")
                );


            const index =
                items.indexOf(clickedItem);


            const videoFile =
                videoConfig[listId][index];


            if (!videoFile) {
                return;
            }


            source.src = videoFile;

            video.load();

            modal.style.display = "flex";


            video.play().catch(function (error) {

                console.error(
                    "Video error:",
                    error
                );

            });

        });

    });


    function closeVideo() {

        video.pause();

        video.currentTime = 0;

        source.src = "";

        video.load();

        modal.style.display = "none";

    }


    if (closeBtn) {

        closeBtn.addEventListener(
            "click",
            closeVideo
        );

    }


    modal.addEventListener("click", function (event) {

        if (event.target === modal) {

            closeVideo();

        }

    });

}


// ======================================================
// CROP RECOMMENDATION
// ======================================================

function initializeCropRecommendation() {

    const submitBtn =
        document.getElementById("submitBtn");


    if (!submitBtn) {
        return;
    }


    submitBtn.addEventListener("click", async function () {

        const districtSelect =
            document.getElementById("districtSelect");

        const soilSelect =
            document.getElementById("soilSelect");

        const seasonSelect =
            document.getElementById("seasonSelect");

        const cropList =
            document.querySelector(".crop_suges ul");


        if (
            !districtSelect ||
            !soilSelect ||
            !seasonSelect ||
            !cropList
        ) {
            return;
        }


        const district =
            districtSelect.value.trim();

        const soil =
            soilSelect.value.trim();

        const season =
            seasonSelect.value.trim();


        if (!district || !soil || !season) {

            cropList.innerHTML =

                currentLang === "kn"

                    ? "<li>ಎಲ್ಲಾ ಆಯ್ಕೆಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ</li>"

                    : "<li>Please select all fields</li>";

            return;

        }


        cropList.innerHTML =
            "<li>Loading...</li>";


        try {

            const response =
                await fetch("/static/suges_crop.json");


            if (!response.ok) {

                throw new Error(
                    "Crop JSON not found"
                );

            }


            const data =
                await response.json();


            const result =
                data.find(function (item) {

                    return (
                        item.district === district &&
                        item.soil === soil &&
                        item.season === season
                    );

                });


            cropList.innerHTML = "";


            if (!result) {

                cropList.innerHTML =

                    currentLang === "kn"

                        ? "<li>ಬೆಳೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ</li>"

                        : "<li>No crops found</li>";

                return;

            }


            const crops =

                currentLang === "kn"

                    ? result.crops_kn

                    : result.crops;


            crops.forEach(function (crop) {

                const li =
                    document.createElement("li");

                li.textContent = crop;

                cropList.appendChild(li);

            });


        } catch (error) {

            console.error(error);

            cropList.innerHTML =
                "<li>Error loading data</li>";

        }

    });

}


// ======================================================
// CAMERA
// ======================================================

async function startCamera() {

    const camera =
        document.getElementById("camera");


    if (!camera) {
        return;
    }


    try {

        const stream =

            await navigator.mediaDevices
                .getUserMedia({

                    video: {
                        facingMode: "environment"
                    }

                });


        camera.srcObject = stream;


    } catch (error) {

        console.error(
            "Camera error:",
            error
        );


        alert("Camera access denied");

    }

}


// ======================================================
// CAPTURE AND PREDICT
// ======================================================

async function capture() {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );


    if (!user) {

        alert(

            currentLang === "kn"

                ? "ಮೊದಲು ಲಾಗಿನ್ ಮಾಡಿ"

                : "Please login first"

        );

        return;

    }


    const camera =
        document.getElementById("camera");

    const canvas =
        document.getElementById("canvas");

    const result =
        document.getElementById("result");

    const resultSection =
        document.getElementById("resultSection");


    if (!camera || !canvas || !result) {
        return;
    }


    if (camera.videoWidth === 0) {

        alert("Camera not ready");

        return;

    }


    const ctx =
        canvas.getContext("2d");


    canvas.width =
        camera.videoWidth;

    canvas.height =
        camera.videoHeight;


    ctx.drawImage(
        camera,
        0,
        0,
        canvas.width,
        canvas.height
    );


    if (resultSection) {

        resultSection.style.display =
            "block";

    }


    result.innerText =

        currentLang === "kn"

            ? "⏳ ಗುರುತಿಸಲಾಗುತ್ತಿದೆ..."

            : "⏳ Processing...";


    canvas.toBlob(async function (blob) {

        try {

            const formData =
                new FormData();


            formData.append(
                "image",
                blob,
                "crop.png"
            );


            const response =
                await fetch(
                    `${API_URL}/predict`,
                    {
                        method: "POST",
                        body: formData
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Prediction failed"
                );

            }


            const data =
                await response.json();


            if (currentLang === "kn") {

                latestText =

`ರೋಗ : ${data.disease_kn}

ವಿಶ್ವಾಸಾರ್ಹತೆ : ${data.confidence}%

ಪರಿಹಾರ :

${data.recommendation_kn}`;

            } else {

                latestText =

`Disease : ${data.disease}

Confidence : ${data.confidence}%

Recommendation :

${data.recommendation_en}`;

           }

document.getElementById("result").innerText = latestText;


            const listenBtn =
                document.getElementById("listenBtn");


            if (listenBtn) {

                listenBtn.style.display =
                    "inline-block";

            }


            await savePrediction(
                user,
                data
            );


        } catch (error) {

            console.error(
                "Prediction error:",
                error
            );


            result.innerText =

                currentLang === "kn"

                    ? "❌ ಸರ್ವರ್ ದೋಷ"

                    : "❌ Server Error";

        }

    }, "image/png");

}


// ======================================================
// SAVE PREDICTION
// ======================================================

async function savePrediction(user, data) {

    try {

        await fetch(
            `${API_URL}/save_prediction`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    user_id: user.id,

                    disease: data.disease,

                    confidence:
                        data.confidence,

                    image_name:
                        "captured-image"

                })
            }
        );


    } catch (error) {

        console.error(
            "Save prediction error:",
            error
        );

    }

}
async function predictUploadedImage() {

    const input = document.getElementById("imageInput");
    const file = input.files[0];

    if (!file) {
        alert(currentLang === "kn"
            ? "ಚಿತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ"
            : "Please select an image.");
        return;
    }

    const preview = document.getElementById("previewImage");
    const camera = document.getElementById("camera");
    const result = document.getElementById("result");
    const resultSection = document.getElementById("resultSection");
    const listenBtn = document.getElementById("listenBtn");

    // Show uploaded image
    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";

    // Hide camera
    camera.style.display = "none";

    // Hide previous prediction
    resultSection.style.display = "none";
    listenBtn.style.display = "none";

    result.innerText =
        currentLang === "kn"
            ? "⏳ ರೋಗವನ್ನು ಗುರುತಿಸಲಾಗುತ್ತಿದೆ..."
            : "⏳ Detecting disease...";

    const formData = new FormData();
    formData.append("image", file);

    try {

        const response = await fetch("/predict", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Prediction failed");
        }

        const data = await response.json();

        console.log(data);

        if (currentLang === "kn") {

            latestText =
`ರೋಗ : ${data.disease_kn}

ವಿಶ್ವಾಸಾರ್ಹತೆ : ${data.confidence}%

ಪರಿಹಾರ :

${data.recommendation_kn}`;

        } else {

            latestText =
`Disease : ${data.disease}

Confidence : ${data.confidence}%

Recommendation :

${data.recommendation_en}`;

        }

        result.innerText = latestText;

        resultSection.style.display = "block";

        listenBtn.style.display = "inline-block";

    }
    catch (error) {

        console.error("Prediction Error:", error);

        resultSection.style.display = "block";

        result.innerText =
            currentLang === "kn"
                ? "❌ ರೋಗ ಪತ್ತೆ ವಿಫಲವಾಗಿದೆ"
                : "❌ Prediction Failed";

    }
}

// ======================================================
// SPEAK RESULT
// ======================================================

function speak() {

    if (!latestText) {
        alert("No prediction available.");
        return;
    }

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(latestText);

    speech.lang = currentLang === "kn" ? "kn-IN" : "en-US";
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;

    speechSynthesis.speak(speech);
}

// ======================================================
// LOGIN AND SIGNUP INITIALIZATION
// ======================================================

function initializeLoginSignup() {

    const loginBtn =
        document.getElementById("loginBtn");

    const signupBtn =
        document.getElementById("signupBtn");

    const logoutBtn =
        document.getElementById("logoutBtn");


    if (loginBtn) {

        loginBtn.addEventListener("click", function () {

            const modal =
                document.getElementById("loginModal");


            if (modal) {

                modal.style.display =
                    "block";

            }

        });

    }


    if (signupBtn) {

        signupBtn.addEventListener("click", function () {

            const modal =
                document.getElementById("signupModal");


            if (modal) {

                modal.style.display =
                    "block";

            }

        });

    }


    if (logoutBtn) {

        logoutBtn.addEventListener("click", function () {

            localStorage.removeItem("user");

            location.reload();

        });

    }

}


// ======================================================
// CLOSE LOGIN
// ======================================================

function closeLogin() {

    const modal =
        document.getElementById("loginModal");


    if (modal) {

        modal.style.display =
            "none";

    }

}


// ======================================================
// CLOSE SIGNUP
// ======================================================

function closeSignup() {

    const modal =
        document.getElementById("signupModal");


    if (modal) {

        modal.style.display =
            "none";

    }

}


// ======================================================
// REGISTER USER
// ======================================================

async function registerUser() {

    const name =
        document
            .getElementById("signupName")
            .value
            .trim();


    const password =
        document
            .getElementById("signupPassword")
            .value;


    if (!name || !password) {

        alert(
            "Please enter name and password"
        );

        return;

    }


    try {

        const response =
            await fetch("/register", {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

                    name: name,

                    password: password

                })

            });


        const data =
            await response.json();


        alert(data.message);


        if (data.success) {

            closeSignup();


            document
                .getElementById("signupName")
                .value = "";


            document
                .getElementById("signupPassword")
                .value = "";


            const loginModal =
                document.getElementById("loginModal");


            if (loginModal) {

                loginModal.style.display =
                    "block";

            }

        }


    } catch (error) {

        console.error(
            "REGISTER ERROR:",
            error
        );


        alert(
            "Registration Failed"
        );

    }

}


// ======================================================
// LOGIN USER
// ======================================================

async function loginUser() {

    const name = document
        .getElementById("login_name")
        .value
        .trim();

    const password = document
        .getElementById("loginPassword")
        .value;

    if (!name || !password) {
        alert("Enter username and password");
        return;
    }

    try {

        const response = await fetch("/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                password: password
            })

        });

        const data = await response.json();

        if (data.success) {

            // Save logged in user
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            updateUserUI(data.user);

            closeLogin();

            alert("Login Successful");

            // Optional
            // window.location.href="/chatbot";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error("LOGIN ERROR:", error);

        alert("Login Failed");

    }

}

// ======================================================
// LOAD LOGGED USER
// ======================================================

function loadLoggedInUser() {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );


    if (user) {

        updateUserUI(user);

    }

}


// ======================================================
// UPDATE USER UI
// ======================================================

function updateUserUI(user) {

    const userSection =
        document.getElementById("userSection");

    const userName =
        document.getElementById("userName");

    const loginBtn =
        document.getElementById("loginBtn");

    const signupBtn =
        document.getElementById("signupBtn");


    if (userSection) {

        userSection.style.display =
            "block";

    }


    if (userName) {

        userName.innerText =
            user.name;

    }


    if (loginBtn) {

        loginBtn.style.display =
            "none";

    }


    if (signupBtn) {

        signupBtn.style.display =
            "none";

    }

}
// ======================================================
// CHATBOT OPERATIONS
// ======================================================
async function sendMessage() {

    const input = document.getElementById("userInput");
    input.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";

    const chatArea = document.getElementById("chatArea");
    chatArea.scrollTop = chatArea.scrollHeight;
    });

    const message = input.value.trim();

    if (message === "") return;

    

    // Clear input
    input.value = "";

    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message,
                language: currentLang,
                username: user ? user.name : "guest"
            })
        });

        if (!response.ok) {
            throw new Error("Server Error: " + response.status);
        }

        const data = await response.json();

        console.log("Chat Response:", data);

        let botReply = "";

        if (data.response) {
            botReply = data.response;
        }
else if (data.reply) {
    botReply = data.reply;
}
else if (data.error) {
    botReply = data.error;
}
else {
    botReply = "No response received.";
}

addMessage(message, botReply);

        // Speak answer if microphone was used
        if (typeof micUsed !== "undefined" && micUsed) {

            speechSynthesis.cancel();

            const speech = new SpeechSynthesisUtterance(botReply);

            speech.lang = currentLang === "kn" ? "kn-IN" : "en-US";
            speech.rate = 0.9;
            speech.pitch = 1;

            speechSynthesis.speak(speech);

            micUsed = false;
        }

    }
    catch(error){

    console.error("FULL ERROR:", error);

    addMessage(message, error.message);

}
}

function addMessage(question, answer) {

    const chatArea = document.getElementById("chatArea");

    // User Message
    const userDiv = document.createElement("div");
    userDiv.className = "user-message";
    userDiv.innerHTML = `<p>${question}</p>`;
    chatArea.appendChild(userDiv);

    // Bot Message
    const botDiv = document.createElement("div");
    botDiv.className = "bot-message";
    botDiv.innerHTML = `<p>${answer}</p>`;
    chatArea.appendChild(botDiv);

    // Auto-scroll to the latest message
    chatArea.scrollTo({
        top: chatArea.scrollHeight,
        behavior: "smooth"
    });
}

function startSpeechRecognition(){

    if(!('webkitSpeechRecognition' in window)){
        alert("Speech recognition not supported");
        return;
    }

    micUsed = true;

    const recognition = new webkitSpeechRecognition();

    recognition.lang =
        currentLang==="kn" ? "kn-IN" : "en-IN";

    recognition.start();

    recognition.onresult = function(event){

        document.getElementById("userInput").value =
            event.results[0][0].transcript;

        sendMessage();   // Automatically send after speaking
    };
}

function speakResponse(text){

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang =
        currentLang==="kn"
            ? "kn-IN"
            : "en-US";

    speech.rate = 0.9;
    speech.pitch = 1;

    speechSynthesis.speak(speech);
}

function initializeChatbot(){

    const chatbot =
        document.getElementById("chatbot");

    if(chatbot){

        chatbot.addEventListener("click",function(){

            window.location.href="/chatbot";

        });

    }
    

    const sendBtn =
        document.getElementById("sendBtn");

    const input =
        document.getElementById("userInput");

    const micBtn =
        document.getElementById("micBtn");

    if(sendBtn){

        sendBtn.addEventListener(
            "click",
            sendMessage
        );

    }

    if(input){

        input.addEventListener(
            "keydown",
            function(e){

                if(e.key==="Enter" && !e.shiftKey){

                    e.preventDefault();

                    sendMessage();

                }

            }
        );

    }

    if(micBtn){

        micBtn.addEventListener(
            "click",
            startSpeechRecognition
        );

    }

}
// ======================================================
// HELPER FUNCTIONS
// ======================================================

function setText(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.innerText = value;

    }

}


function setHTML(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.innerHTML = value;

    }

}
