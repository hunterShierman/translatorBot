let mode = null;
let language = null;
let system_message;

function setTraining() {
    mode = "Training";
    alert("Mode set to " + mode + "!");
}

function setFreeplay() {
    mode = "Freeplay";
    alert("Mode set to " + mode + "!");
}

function setEnglish() {
    language = "English";
    alert("Language set to " + language + "!");
}

function setFrench() {
    language = "French";
    alert("Language set to " + language + "!");
}

function settingsCheck() {
    if (language === null && mode === null) {
        alert("Please select a mode and language!");
    } else if (language === null) {
        alert("Please select a language!");
    } else if (mode === null) {
        alert("Please select a mode!");
    } else {
        settingConfiguration();
        document.getElementById("chatbot-window-container").style.display = "flex";
    }
}

function settingConfiguration() {
    if (mode === "Training") {
        if (language === "English") {
            document.getElementById("en-training").style.display = "block";
            system_message = "Only speak in English. You are a friendly chatbot who is helping the user learn English by quizzing them on English terms. Please limit your responses to three sentences."
        } else {
            document.getElementById("fr-training").style.display = "block";
            system_message = "Only speak in French. You are a friendly chatbot who is helping the user learn French by quizzing them on French terms. Please limit your responses to three sentences."
        }
    } else {
        if (language === "English") {
            document.getElementById("en-freeplay").style.display = "block";
            system_message = "Only speak in English. You are a friendly chatbot who is helping the user learn English by engaging in conversation with them. Please limit your responses to three sentences."
        } else {
            document.getElementById("fr-freeplay").style.display = "block";
            system_message = "Only speak in French. You are a friendly chatbot who is helping the user learn English by engaging in conversation with them. Please limit your responses to three sentences."
        }
    }
}

const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");

let userMessage;
const API_KEY = ""; //Enter the key here

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span><img id="chatbot-img" src="images/chatbot.png" alt="Chatbot" class="image"></img></span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{
                role: "system", content: system_message,
                role: "user", content: userMessage
            }]
        })
    }

    // Send POST request to API, get response
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatInput.value = "";

    //Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

sendChatBtn.addEventListener("click", handleChat);