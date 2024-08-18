from gtts import gTTS
import os
import pyttsx3
from playsound import playsound
import tempfile

text = "Welcome to our chatbot and language learner."
filename = 'back-end/audioDetection/output.txt'
def tts(text):
    tts = gTTS(text)
    temp_file = tempfile.NamedTemporaryFile(suffix=".mp3", delete=False)

    tts.save(temp_file.name)
    file_url = "file://" + os.path.abspath(temp_file.name)
    temp_file.close()
    return temp_file.name

file_path = tts(text)
playsound(file_path)
os.remove(file_path)
