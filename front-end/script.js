let language = "english";
let languageTo = "french";

function englishFrench() {

    //switch from frenchEnglish
    if (language == "french") {
        var container = document.querySelector(".flags");
        container.classList.toggle("swapped");
        language = "english";
        languageTo = "french";
    }

}

function frenchEnglish() {

    // switch from EnglishFrench
    if (language == "english") {
        var container = document.querySelector(".flags");
        container.classList.toggle("swapped");
        language = "french";
        languageTo = "english";

    }

}


// Function to perform the translation using OpenAI's API
const YOUR_OPENAI_API_KEY = '';

async function translateText() {
    const text = document.getElementById('convert_text').value;

    if (!text) {
        alert("Please record or enter a phrase first.");
        return;
    }

    // send http request to open ai
    try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + YOUR_OPENAI_API_KEY
            },

            // send as a json file
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        // system message defines chatbots role
                        "role": "system",
                        "content": `You are a helpful assistant that translates ${language} text to ${languageTo}.`
                    },
                    {
                        // user message what do i actually want them to do
                        "role": "user",
                        "content": `Translate the following text from ${language} to ${languageTo}: "${text}"`
                    }
                ],
                max_tokens: 30,
            })
        });

        // returns chatbots reponse as a json file
        const data = await res.json();

        // select the actual string text
        if (res.ok) {
            const translatedText = data.choices[0].message.content.trim();
            document.getElementById('translated_text').textContent = translatedText;

            // Set up the text for playback
            setupTTS(translatedText);

        } else {
            document.getElementById('translated_text').textContent = "Translation failed. Please try again.";
            console.error("Translation API error:", data);
        }
    } catch (error) {
        document.getElementById('translated_text').textContent = "Translation error. Please try again.";
        console.error("Error with the translation request:", error);
    }
}

// Function to play the translated text using the Web Speech API
function setupTTS(text) {
    document.getElementById('play_button').addEventListener('click', function() {

        // clear any previous speech
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);

        // check which language to speak
        if (language == "english") {
            utterance.lang = "fr-FR";
        }
        else {
            utterance.lang = "en-US";
        }
        window.speechSynthesis.speak(utterance);
    });
}


function textToSpeech() {

    var speech = true;
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    // allows you to see partial results before speech over
    recognition.interimResults = true;

    // translate to right language
    if (language == "english") {
        recognition.lang = "en-US";
    }
    else {
        recognition.lang = "fr-FR"
    }

    // convert speech to text
    recognition.addEventListener('result', function(e) {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        // add text to div
        document.getElementById("convert_text").value = transcript;
    });

    if (speech) {
        recognition.start();
    }

}

// call record button
document.getElementById('click_to_record').addEventListener('click', textToSpeech);

// Event listener for the translate button
document.getElementById('translate_button').addEventListener('click', () => {
    translateText()
});
