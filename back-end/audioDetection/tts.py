from gtts import gTTS
import os
import pyttsx3
from playsound import playsound
import tempfile

text_english = "Welcome to our chatbot and language learner."
text_french = "Bienvenue sur notre chatbot et apprenant de langues."

def tts(text, lang='en'):
    tts = gTTS(text, lang=lang)
    temp_file = tempfile.NamedTemporaryFile(suffix=".mp3", delete=False)

    tts.save(temp_file.name)
    file_url = "file://" + os.path.abspath(temp_file.name)
    temp_file.close()
    return temp_file.name

# Play English text
file_path_english = tts(text_english, lang='en')
playsound(file_path_english)
os.remove(file_path_english)

# Play French text
file_path_french = tts(text_french, lang='fr')
playsound(file_path_french)
os.remove(file_path_french)
