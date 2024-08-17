import time

while True:
    with open('output.txt', 'r') as f:
        print(f.read())
    time.sleep(1)