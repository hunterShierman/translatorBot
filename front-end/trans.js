// Function to perform the translation using OpenAI's API
const YOUR_OPENAI_API_KEY = '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';

async function translateText() {
    const text = document.getElementById('convert_text').value;

    if (!text) {
        alert("Please record or enter a phrase first.");
        return;
    }

    try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + YOUR_OPENAI_API_KEY
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        "role": "system",
                        "content": "You are a helpful assistant that translates English text to French."
                    },
                    {
                        "role": "user",
                        "content": `Translate the following text to French: "${text}"`
                    }
                ],
                max_tokens: 60
            })
        });

        const data = await res.json();

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
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR'; // Set the language to French
        window.speechSynthesis.speak(utterance);
    });
}

// Event listener for the translate button
document.getElementById('translate_button').addEventListener('click', translateText);
