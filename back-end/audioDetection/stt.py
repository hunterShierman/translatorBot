#import subprocess
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
    while True:
        try:
            with sr.Microphone() as source:
                r.adjust_for_ambient_noise(source, duration=0.2)

                #listens for the user's input
                audio = r.listen(source)

                #use google to recognize audio
                text = r.recognize_google(audio)
                
                return text

        except sr.RequestError:
            print("Could not request results.")
        except sr.UnknownValueError:
             print("Could not understand the audio, please try again.")
    

def output(text):
    with open("back-end/audioDetection/output.txt", "a") as f:
        f.write(text + "\n")

def main():
    while True:

        text = record()
        if text:
            output(text)
            print(text)

if __name__ == "__main__":
    main()
