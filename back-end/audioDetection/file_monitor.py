from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import time

class Watcher:
    DIRECTORY_TO_WATCH = "./" 
    def __init__(self, filename):
        self.observer = Observer()
        self.filename = filename

    def run(self): 
        event_handler = Handler(self.filename)
        self.observer.schedule(event_handler, self.DIRECTORY_TO_WATCH, recursive=False)
        self.observer.start()
        try:
            while(True):
                time.sleep(1)
        except KeyboardInterrupt:
            self.observer.stop()
        self.observer.join()

class Handler(FileSystemEventHandler):
    def __init__(self, filename):
        self.filename = filename

    def on_modified(self, event):
        if event.src_path.endswith(self.filename):
            with open(self.filename, 'r') as file:
                print("New content:", file.read())

if __name__ == '__main__':
    w = Watcher("output.txt")
    w.run()
