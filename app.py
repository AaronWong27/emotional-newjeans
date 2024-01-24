import text2emotion as te
import pandas as pd
from flask import Flask, render_template, request, jsonify

# Have to do pip install emotion 0.6.0


app = Flask(__name__, static_url_path='/static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process_data', methods=['POST'])
def process_data():
    if request.method == 'POST':
        # Get the data from the text box in the request
        user_input = request.form['user_input']

        # Perform emotion detection using your function
        result = emotion_detection(user_input)

        # Return the result as JSON to the frontend
        return jsonify(result)


def emotion_detection(x):
    # Get all the emotion value
    # There are 5 different emotion: Happy, Angry, Sad, Suprise, and Fear
    all_emotions_value = te.get_emotion(x)
    # Get the keymax values
    Keymax_value = max(zip(all_emotions_value.values(), all_emotions_value.keys()))
    return Keymax_value


if __name__ == '__main__':
    app.run(debug=True)
