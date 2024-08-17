#this is the text to speech code
from gtts import gTTS
import os


#this is the text you want to make audio
newtext = 'Welcome to our translator bot. How can I help you today?'

#figure how to make it french or whatever
language = 'en'

myobj = gTTS(text=newtext, lang = language, slow = False)

myobj.save("new.mp3")

#this part will play the file
os.system("start new.mp3")