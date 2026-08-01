//======================================================
// RAITHA BANDAVA AI CHATBOT
// Part 1 - Initialization
//======================================================

//------------------------------
// DOM ELEMENTS
//------------------------------

const chatArea = document.getElementById("chatArea");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const micBtn = document.getElementById("micBtn");

const typingIndicator =
document.getElementById("typingIndicator");

const welcomeScreen =
document.getElementById("welcomeScreen");

const historyList =
document.getElementById("historyList");

const assistantTitle =
document.getElementById("assistantTitle");

const assistantName =
document.getElementById("assistantName");

const welcomeMessage =
document.getElementById("welcomeMessage");

const statusText =
document.getElementById("status");

const newChatBtn =
document.getElementById("newChatBtn");

const langBtn =
document.getElementById("langBtn");


//======================================================
// GLOBAL VARIABLES
//======================================================

let currentLanguage =
localStorage.getItem("language") || "en";

let currentChat = [];

let recognition = null;

let speaking = false;


//======================================================
// TRANSLATIONS
//======================================================

const translations = {

    en:{

        assistant:"Raitha Bandava AI",

        title:"Raitha Bandava",

        welcome:"Hello Farmer 👋",

        subtitle:
        "Ask me anything about farming, crops, diseases, government schemes, fertilizers, irrigation or weather.",

        placeholder:"Ask anything...",

        ready:"Ready",

        newChat:"New Chat"

    },

    kn:{

        assistant:"ರೈತ ಬಂಧವ AI",

        title:"ರೈತ ಬಂಧವ",

        welcome:"ನಮಸ್ಕಾರ ರೈತರೇ 👋",

        subtitle:
        "ಕೃಷಿ, ಬೆಳೆಗಳು, ರೋಗಗಳು, ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು, ರಸಗೊಬ್ಬರ, ನೀರಾವರಿ ಹಾಗೂ ಹವಾಮಾನದ ಬಗ್ಗೆ ಕೇಳಿ.",

        placeholder:"ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ...",

        ready:"ಸಿದ್ಧವಾಗಿದೆ",

        newChat:"ಹೊಸ ಸಂಭಾಷಣೆ"

    }

};


//======================================================
// GET CURRENT LANGUAGE
//======================================================

function getLanguage(){

    return localStorage.getItem("language") || "en";

}


//======================================================
// APPLY LANGUAGE
//======================================================

function applyLanguage(){

    currentLanguage = getLanguage();

    assistantTitle.innerText =
    translations[currentLanguage].title;

    assistantName.innerText =
    translations[currentLanguage].assistant;

    welcomeMessage.innerText =
    translations[currentLanguage].welcome;

    messageInput.placeholder =
    translations[currentLanguage].placeholder;

    statusText.innerText =
    translations[currentLanguage].ready;

    newChatBtn.innerHTML =
    `<i class="fa-solid fa-plus"></i> ${translations[currentLanguage].newChat}`;

    const subtitle =
    welcomeScreen.querySelector("p");

    if(subtitle){

        subtitle.innerText =
        translations[currentLanguage].subtitle;

    }

}


//======================================================
// AUTO RESIZE TEXTAREA
//======================================================

messageInput.addEventListener("input",()=>{

    messageInput.style.height="50px";

    messageInput.style.height=
    messageInput.scrollHeight+"px";

});


//======================================================
// ENTER TO SEND
//======================================================

messageInput.addEventListener("keydown",(e)=>{

    if(e.key==="Enter" && !e.shiftKey){

        e.preventDefault();

        sendMessage();

    }

});


//======================================================
// HISTORY
//======================================================

function saveHistory(){

    localStorage.setItem(

        "rb_chat_history",

        JSON.stringify(currentChat)

    );

}

function loadHistory(){

    const history=

    JSON.parse(

        localStorage.getItem("rb_chat_history")

    ) || [];

    currentChat=history;

    renderHistory();

}


//======================================================
// SIDEBAR HISTORY
//======================================================

function renderHistory(){

    historyList.innerHTML="";

    currentChat.forEach((item,index)=>{

        const div=document.createElement("div");

        div.className="historyItem";

        div.innerHTML=`

            <i class="fa-solid fa-message"></i>

            <span>

            ${item.question.substring(0,35)}

            </span>

        `;

        div.onclick=()=>{

            loadConversation(index);

        };

        historyList.appendChild(div);

    });

}


//======================================================
// LOAD OLD CHAT
//======================================================

function loadConversation(index){

    chatArea.innerHTML="";

    chatArea.appendChild(welcomeScreen);

    welcomeScreen.style.display="none";

    addUserMessage(

        currentChat[index].question

    );

    addBotMessage(

        currentChat[index].answer

    );

}


//======================================================
// NEW CHAT
//======================================================

newChatBtn.addEventListener("click",()=>{

    welcomeScreen.style.display="flex";

    chatArea.innerHTML="";

    chatArea.appendChild(welcomeScreen);

    messageInput.value="";

    messageInput.focus();

});


//======================================================
// BUTTON EVENTS
//======================================================

sendBtn.addEventListener(

    "click",

    sendMessage

);


//======================================================
// INITIALIZE
//======================================================

window.onload=()=>{

    applyLanguage();

    loadHistory();

    messageInput.focus();

};
//======================================================
// PART 2A
// USER MESSAGE + FLASK API
//======================================================


//------------------------------------------------------
// SHOW TYPING
//------------------------------------------------------

function showTyping(){

    typingIndicator.classList.remove("hidden");

    chatArea.scrollTop = chatArea.scrollHeight;

}


//------------------------------------------------------
// HIDE TYPING
//------------------------------------------------------

function hideTyping(){

    typingIndicator.classList.add("hidden");

}


//------------------------------------------------------
// USER MESSAGE
//------------------------------------------------------

function addUserMessage(text){

    welcomeScreen.style.display="none";

    const row=document.createElement("div");

    row.className="message-row user";

    const bubble=document.createElement("div");

    bubble.className="message user-message";

    bubble.innerText=text;

    row.appendChild(bubble);

    chatArea.appendChild(row);

    chatArea.scrollTop=chatArea.scrollHeight;

}


//------------------------------------------------------
// SEND MESSAGE
//------------------------------------------------------

async function sendMessage(){

    const message=messageInput.value.trim();

    if(message==="") return;

    addUserMessage(message);

    messageInput.value="";

    messageInput.style.height="50px";

    showTyping();

    statusText.innerText=
    currentLanguage==="kn"
    ? "ಯೋಚಿಸುತ್ತಿದೆ..."
    : "Thinking...";

    try{

        const response=await fetch("/chat",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                message:message,

                language:getLanguage()

            })

        });

        if(!response.ok){

            throw new Error("Server Error");

        }

        const data=await response.json();

        hideTyping();

        statusText.innerText=
        translations[currentLanguage].ready;

        addBotMessage(data.response);

        currentChat.push({

            question:message,

            answer:data.response

        });

        saveHistory();

        renderHistory();

    }

    catch(error){

        hideTyping();

        statusText.innerText=
        translations[currentLanguage].ready;

        addBotMessage(

            currentLanguage==="kn"

            ? "ಕ್ಷಮಿಸಿ, ಸರ್ವರ್‌ಗೆ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ."

            : "Sorry, I couldn't connect to the server."

        );

        console.error(error);

    }

}
//======================================================
// PART 2B
// BOT MESSAGE + MARKDOWN + COPY + SPEAK
//======================================================


//------------------------------------------------------
// BOT MESSAGE
//------------------------------------------------------

function addBotMessage(text){

    const row=document.createElement("div");

    row.className="message-row";

    //--------------------------------------------------
    // Speaker Icon
    //--------------------------------------------------

    const speaker=document.createElement("div");

    speaker.className="speaker";

    speaker.innerHTML=
    '<i class="fa-solid fa-volume-high"></i>';

    speaker.onclick=()=>{

        speakText(text);

    };

    //--------------------------------------------------
    // Bubble
    //--------------------------------------------------

    const bubble=document.createElement("div");

    bubble.className="message bot-message";

    bubble.innerHTML=marked.parse(text);

    //--------------------------------------------------
    // Action Buttons
    //--------------------------------------------------

    const actions=document.createElement("div");

    actions.className="bot-actions";

    //--------------------------------------------------
    // Copy Button
    //--------------------------------------------------

    const copyBtn=document.createElement("button");

    copyBtn.className="action-btn";

    copyBtn.title="Copy";

    copyBtn.innerHTML=

    '<i class="fa-regular fa-copy"></i>';

    copyBtn.onclick=()=>{

        navigator.clipboard.writeText(text);

        copyBtn.innerHTML=

        '<i class="fa-solid fa-check"></i>';

        setTimeout(()=>{

            copyBtn.innerHTML=

            '<i class="fa-regular fa-copy"></i>';

        },1500);

    };

    //--------------------------------------------------
    // Speak Button
    //--------------------------------------------------

    const speakBtn=document.createElement("button");

    speakBtn.className="action-btn";

    speakBtn.title="Speak";

    speakBtn.innerHTML=

    '<i class="fa-solid fa-volume-high"></i>';

    speakBtn.onclick=()=>{

        speakText(text);

    };

    //--------------------------------------------------
    // Regenerate Button
    //--------------------------------------------------

    const regenBtn=document.createElement("button");

    regenBtn.className="action-btn";

    regenBtn.title="Speak Again";

    regenBtn.innerHTML=

    '<i class="fa-solid fa-rotate-right"></i>';

    regenBtn.onclick=()=>{

        speakText(text);

    };

    actions.appendChild(copyBtn);

    actions.appendChild(speakBtn);

    actions.appendChild(regenBtn);

    bubble.appendChild(actions);

    row.appendChild(speaker);

    row.appendChild(bubble);

    chatArea.appendChild(row);

    chatArea.scrollTop=chatArea.scrollHeight;

}


//------------------------------------------------------
// COPY MESSAGE
//------------------------------------------------------

function copyMessage(text){

    navigator.clipboard.writeText(text);

}


//------------------------------------------------------
// AUTO SCROLL
//------------------------------------------------------

function scrollBottom(){

    chatArea.scrollTop=

    chatArea.scrollHeight;

}


//------------------------------------------------------
// CLEAR CHAT
//------------------------------------------------------

function clearChat(){

    chatArea.innerHTML="";

    chatArea.appendChild(welcomeScreen);

    welcomeScreen.style.display="flex";

}


//------------------------------------------------------
// STATUS
//------------------------------------------------------

function setReady(){

    statusText.innerText=

    translations[currentLanguage].ready;

}

function setThinking(){

    statusText.innerText=

    currentLanguage==="kn"

    ? "ಯೋಚಿಸುತ್ತಿದೆ..."

    : "Thinking...";

}


//------------------------------------------------------
// SIMPLE LOADING
//------------------------------------------------------

function loading(state){

    if(state){

        showTyping();

        sendBtn.disabled=true;

    }

    else{

        hideTyping();

        sendBtn.disabled=false;

    }

}
//======================================================
// PART 3A
// SPEECH RECOGNITION
//======================================================


//------------------------------------------------------
// CHECK BROWSER SUPPORT
//------------------------------------------------------

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if(SpeechRecognition){

    recognition = new SpeechRecognition();

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.maxAlternatives = 1;

}


//------------------------------------------------------
// UPDATE RECOGNITION LANGUAGE
//------------------------------------------------------

function updateRecognitionLanguage(){

    const lang = getLanguage();

    if(!recognition) return;

    recognition.lang =
    lang === "kn"
        ? "kn-IN"
        : "en-IN";

}


//------------------------------------------------------
// START LISTENING
//------------------------------------------------------

function startListening(){

    if(!recognition){

        alert("Speech Recognition is not supported.");

        return;

    }

    updateRecognitionLanguage();

    recognition.start();

}


//------------------------------------------------------
// STOP LISTENING
//------------------------------------------------------

function stopListening(){

    if(recognition){

        recognition.stop();

    }

}


//------------------------------------------------------
// LISTENING STARTED
//------------------------------------------------------

recognition.onstart = ()=>{

    micBtn.classList.add("listening");

    statusText.innerText =
    currentLanguage==="kn"
    ? "ಕೇಳುತ್ತಿದೆ..."
    : "Listening...";

};


//------------------------------------------------------
// LISTENING ENDED
//------------------------------------------------------

recognition.onend = ()=>{

    micBtn.classList.remove("listening");

    statusText.innerText =
    translations[currentLanguage].ready;

};


//------------------------------------------------------
// RECOGNITION RESULT
//------------------------------------------------------

recognition.onresult = (event)=>{

    const transcript =

    event.results[0][0].transcript;

    messageInput.value = transcript;

    messageInput.style.height="50px";

    messageInput.style.height=
    messageInput.scrollHeight+"px";

    sendMessage();

};


//------------------------------------------------------
// ERROR
//------------------------------------------------------

recognition.onerror=(event)=>{

    micBtn.classList.remove("listening");

    console.log(event.error);

    statusText.innerText =

    currentLanguage==="kn"

    ? "ಮೈಕ್ ದೋಷ"

    : "Mic Error";

};


//------------------------------------------------------
// MIC BUTTON
//------------------------------------------------------

micBtn.addEventListener("click",()=>{

    startListening();

});


//------------------------------------------------------
// CHANGE LANGUAGE
//------------------------------------------------------

window.addEventListener("storage",()=>{

    currentLanguage=getLanguage();

    applyLanguage();

    updateRecognitionLanguage();

});
//======================================================
// PART 3B
// TEXT TO SPEECH + FINAL INITIALIZATION
//======================================================


//------------------------------------------------------
// STOP SPEAKING
//------------------------------------------------------

function stopSpeaking(){

    speechSynthesis.cancel();

    speaking=false;

}


//------------------------------------------------------
// SPEAK TEXT
//------------------------------------------------------

function speakText(text){

    stopSpeaking();

    const speech=new SpeechSynthesisUtterance();

    speech.text=text.replace(/[#*_>`]/g,"");

    speech.rate=1;

    speech.pitch=1;

    speech.volume=1;

    speech.lang=
    getLanguage()==="kn"
    ?"kn-IN"
    :"en-IN";

    const voices=speechSynthesis.getVoices();

    const voice=voices.find(v=>

        getLanguage()==="kn"

        ?v.lang.includes("kn")

        :v.lang.includes("en")

    );

    if(voice){

        speech.voice=voice;

    }

    speech.onstart=()=>{

        speaking=true;

        statusText.innerText=

        getLanguage()==="kn"

        ?"ಮಾತನಾಡುತ್ತಿದೆ..."

        :"Speaking...";

    };

    speech.onend=()=>{

        speaking=false;

        statusText.innerText=

        translations[getLanguage()].ready;

    };

    speech.onerror=()=>{

        speaking=false;

    };

    speechSynthesis.speak(speech);

}


//------------------------------------------------------
// LOAD VOICES
//------------------------------------------------------

speechSynthesis.onvoiceschanged=()=>{

    speechSynthesis.getVoices();

};


//------------------------------------------------------
// LANGUAGE BUTTON
//------------------------------------------------------

langBtn.addEventListener("click",(e)=>{

    e.preventDefault();

    currentLanguage=

    currentLanguage==="en"

    ?"kn"

    :"en";

    localStorage.setItem(

        "language",

        currentLanguage

    );

    applyLanguage();

    updateRecognitionLanguage();

});


//------------------------------------------------------
// PAGE VISIBILITY
//------------------------------------------------------

document.addEventListener(

"visibilitychange",

()=>{

    if(document.hidden){

        stopSpeaking();

    }

});


//------------------------------------------------------
// ESC KEY
//------------------------------------------------------

document.addEventListener(

"keydown",

(e)=>{

    if(e.key==="Escape"){

        stopSpeaking();

    }

});


//------------------------------------------------------
// CLEAR INPUT
//------------------------------------------------------

function clearInput(){

    messageInput.value="";

    messageInput.style.height="50px";

}


//------------------------------------------------------
// RESET CHAT
//------------------------------------------------------

function resetChat(){

    stopSpeaking();

    clearInput();

    hideTyping();

    statusText.innerText=

    translations[getLanguage()].ready;

}


//------------------------------------------------------
// PAGE LOAD
//------------------------------------------------------

window.addEventListener(

"load",

()=>{

    applyLanguage();

    updateRecognitionLanguage();

    loadHistory();

    messageInput.focus();

});


//------------------------------------------------------
// BEFORE UNLOAD
//------------------------------------------------------

window.addEventListener(

"beforeunload",

()=>{

    stopSpeaking();

    saveHistory();

});


//------------------------------------------------------
// READY
//------------------------------------------------------

console.log(

"🌱 Raitha Bandava AI Ready"

);