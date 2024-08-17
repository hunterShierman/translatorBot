import subprocess
import speech_recognition as sr
import pyttsx3

#notes
#first setp is for the python program to receive speech
#second step is for the program to put the speech into a string
#make it while loop


r = sr.Recognizer()

def record():
    #basically an endless loop 
    #so that it does not end when it picks up an undecodeable noise
    while(1):
        try:
            with sr.Microphone() as source:
                r.adjust_for_ambient_noise(source, duration=0.2)

                #listens for the user's input
                audio = r.listen(source)

                #use google to recognize audio
                text = r.recognize_google(audio)
                
                return text

        except sr.RequestError as e:
            print("Could not request results; {e}")
        except sr.UnknownValueError:
             print("Could not understand the audio, please try again.")
    

def output(text):
    f = open("output.txt", "a")
    f.write(text)
    f.write("\n")
    f.close()
    return

def send_text(text):
    subprocess.run(["python", "test2.py", text])


while(1):
    text = record()
    output(text)
    print("Writing text...")
