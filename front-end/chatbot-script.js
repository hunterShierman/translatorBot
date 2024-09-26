

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
    language = "english";
    alert("Language set to " + language + "!");
}

function setFrench() {
    language = "french";
    alert("Language set to " + language + "!");
}

function initializeChat() {
    // Check if the language is set
    if (language === null) {
        alert("Please select a language before starting the chat.");
        return;
    }

    // Generate a question
    const { question, options } = generateQuestionWithOptions(language);

    // Display the question
    setTimeout(() => {
        addMessage(question, 'received', options);
    }, 600);
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


        if (mode == "Freeplay") {
            document.getElementById("chatbot-window-container").style.display = "flex";
            document.getElementById("test-mode").style.display = "none";

        }
        
        else if (mode == "Training") {
            document.getElementById("chatbot-window-container").style.display = "none";
            document.getElementById("test-mode").style.display = "flex";
            handleUserMessage();
        }

    }
}

function settingConfiguration() {

    if (language === "english") {
        document.getElementById("en-freeplay").style.display = "block";
        document.getElementById("fr-freeplay").style.display = "none";
        document.getElementById("en-training").style.display = "block";
        document.getElementById("fr-training").style.display = "none";



        system_message = "Only speak in English. You are a friendly chatbot who is helping the user learn English by quizzing them on English terms. Please limit your responses to three sentences."
    } else if (language == "french") {
        document.getElementById("fr-freeplay").style.display = "block";
        document.getElementById("en-freeplay").style.display = "none";
        document.getElementById("fr-training").style.display = "block";
        document.getElementById("en-training").style.display = "none";
        system_message = "Only speak in French. You are a friendly chatbot who is helping the user learn French by quizzing them on French terms. Please limit your responses to three sentences."
    }

}

const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".newAddedText");
const fullChatBox = document.querySelector(".chatbox")

let userMessage;
const API_KEY = "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"; //Enter the key here

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span><img class="chatbot-img" src="images/chatbot.png" alt="Chatbot" class="image"></img></span><p>${message}</p>`;
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
    }).finally(() => fullChatBox.scrollTo(0, fullChatBox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatInput.value = "";

    //Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    fullChatBox.scrollTo(0, fullChatBox.scrollHeight);

    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        fullChatBox.scrollTo(0, fullChatBox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

document.getElementById('reset-button').addEventListener('click', () => {
    // Clear the chatbox
    chatbox.innerHTML = '';
    messageArea.innerHTML = '';
});



const chatbox2 = document.querySelector('.support-chat-box');
const messageArea = document.getElementById("addedTestingText");
const messageFullArea = document.querySelector(".support-chat-box .message-area");
const userInput = document.querySelector('.input-area textarea');
const sendButton = document.querySelector('.input-area #send-button');

// Function to get a random index
function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

// Function to generate a random question with three options
function generateQuestionWithOptions(questionLanguage) {
    let englishItems = [
        'apple', 'house', 'car', 'dog', 'cat', 'computer', 'phone',
        'tree', 'ball', 'shoe', 'pen', 'book', 'table', 'chair',
        'river', 'mountain', 'city', 'street', 'lamp', 'box',
        'shirt', 'hat', 'glass', 'cup', 'phone', 'bag', 'window',
        'door', 'key', 'boat', 'dog', 'flower', 'bike', 'camera'
    ];

    let frenchItems = [
        'pomme', 'maison', 'voiture', 'chien', 'chat', 'ordinateur', 'téléphone',
        'arbre', 'balle', 'chaussure', 'stylo', 'livre', 'table', 'chaise',
        'rivière', 'montagne', 'ville', 'rue', 'lampe', 'boîte',
        'chemise', 'chapeau', 'verre', 'tasse', 'téléphone', 'sac', 'fenêtre',
        'porte', 'clé', 'bateau', 'chien', 'fleur', 'vélo', 'appareil photo'
    ];

    let question, correctAnswer, options = [];
    let index, correctIndex;

    if (questionLanguage === "french") {
        index = getRandomIndex(englishItems);
        correctAnswer = frenchItems[index];
        question = "How do you say " + englishItems[index] + " in French?";

        options.push(frenchItems[getRandomIndex(frenchItems)]); // Add a wrong answer
        options.push(frenchItems[index]); // Add the correct answer

    } else if (questionLanguage === "english") {
        index = getRandomIndex(frenchItems);
        correctAnswer = englishItems[index];
        question = "Qu'est-ce que " + frenchItems[index] + " en anglais?";

        options.push(englishItems[getRandomIndex(englishItems)]); // Add a wrong answer
        options.push(englishItems[index]); // Add the correct answer

    } else {
        question = "Please select a valid language.";
        options = [];
    }

    // Shuffle options
    options = options.sort(() => Math.random() - 0.5);

    return { question, correctAnswer, options };
}

// Function to add a message to the chat area
function addMessage(text, type) {
    const messageDiv = document.createElement('li');
    messageDiv.className = `message ${type}`;
    
    // Create the text element
    const p = document.createElement('p');
    p.textContent = text;

    if (type === 'received') {
        // Create the span element
        const avatarSpan = document.createElement('span');
        
        // Create the image element
        const avatarImg = document.createElement('img');
        avatarImg.src = 'images/chatbot.png'; // Path to your avatar image
        avatarImg.alt = 'Chatbot Avatar';
        avatarImg.className = 'chatbot-img'; // Add a class if needed
        
        // Append the image to the span
        avatarSpan.appendChild(avatarImg);

        // Insert the span before the text element
        messageDiv.appendChild(avatarSpan);
    }

    // Append the text content
    messageDiv.appendChild(p);

    // Append the message div to the message area
    messageArea.appendChild(messageDiv);

    // Scroll to the bottom
    messageFullArea.scrollTop = messageFullArea.scrollHeight;
}


// Function to handle user messages
function handleUserMessage() {

    const { question, correctAnswer, options } = generateQuestionWithOptions(language);

    // Simulate chatbot response
    setTimeout(() => {
        addMessage(question, 'received');

        // Add options to the chat
        options.forEach(option => {
            addMessage(option, 'received');
        });

        // Store the correct answer for later checking
        chatbox.setAttribute('data-correct-answer', correctAnswer);
    }, 600); // Delay for demo purposes

    messageFullArea.scrollTop = messageFullArea.scrollHeight;

}

// Function to check the user's answer
function checkAnswer(userAnswer) {
    const correctAnswer = chatbox.getAttribute('data-correct-answer');

    // check language
    if (language == "french") {

        if (userAnswer === correctAnswer) {
            addMessage("Correct Well done.", "received");
        }
        else {
            addMessage("Incorrect. The correct answer was: " + correctAnswer, "received")
        }

    }

    if (language == "english") {

        if (userAnswer === correctAnswer) {
            addMessage("Correct bravo!", 'received');
        }
        else {
            addMessage("Incorrect. La bonne réponse était: " + correctAnswer, 'received');
        }

    }

    
    // // Clear the correct answer after checking
    chatbox.removeAttribute('data-correct-answer');

}



sendChatBtn.addEventListener("click", handleChat);

document.querySelector('.training').addEventListener('click', setTraining);
document.querySelector('.freeplay').addEventListener('click', setFreeplay);
document.querySelector('.english-button').addEventListener('click', setEnglish);
document.querySelector('.french-button').addEventListener('click', setFrench);
document.getElementById('begin-chat').addEventListener('click', settingsCheck);


messageArea.addEventListener('click', (e) => {
    if (e.target.tagName === 'P') {
        const selectedOption = e.target.textContent;
        checkAnswer(selectedOption);
        handleUserMessage();

    }
});

