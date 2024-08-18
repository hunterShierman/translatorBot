from flask import Flask, render_template_string

app = Flask(__name__)

@app.route('/')
def index():
    try:
        with open('output.txt', 'r') as file:
            content = file.read()
    except FileNotFoundError:
        content = "No content available yet."

    return render_template_string("""
    
    """, content=content)

if __name__ == '__main__':
    app.run(debug=True)
