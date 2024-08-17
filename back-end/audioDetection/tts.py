from gtts import gTTS
import os


def text_to_speech(text, language, filename):
    """
    Convert the given text to speech in the specified language and save it as an MP3 file.

    Args:
        text (str): The text to convert to speech.
        language (str): The language code ('en' for English, 'fr' for French).
        filename (str): The name of the MP3 file to save the speech to.
    """
    try:
        tts = gTTS(text=text, lang=language, slow=False)
        tts.save(filename)
        print(f"Saved speech to {filename}")
        os.system(f"start {filename}")  # On macOS/Linux, use 'open' or 'xdg-open' instead of 'start'
    except Exception as e:
        print(f"An error occurred: {e}")

def main():
    text = input("back-end/audioDetection/output.txt")

    # Use the same filename for English and French to overwrite the files
    english_filename = "speech_en.mp3"
    french_filename = "speech_fr.mp3"

    # Convert text to speech in English
    text_to_speech(text, 'en', english_filename)

    # Convert text to speech in French
    text_to_speech(text, 'fr', french_filename)

if __name__ == "__main__":
    main()


