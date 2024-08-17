from gtts import gTTS
import os
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import time

class Handler(FileSystemEventHandler):
    def __init__(self, filename):
        self.filename = filename

    def on_modified(self, event):
        if event.src_path.endswith(self.filename):
            with open(self.filename, 'r') as file:
                newtext = file.read().strip()
                print("New content detected:", newtext)

                # Convert to speech
                language = 'en'
                myobj = gTTS(text=newtext, lang=language, slow=False)
                myobj.save("new.mp3")
                os.system("start new.mp3")

if __name__ == '__main__':
    filename = "output.txt"  # Replace with your actual text file name
    event_handler = Handler(filename)
    observer = Observer()
    observer.schedule(event_handler, path='.', recursive=False)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
