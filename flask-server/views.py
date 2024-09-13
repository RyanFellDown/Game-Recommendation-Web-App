from flask import Flask, request, jsonify
from GameRecFile import getGenres
from flask_cors import CORS
from GameRecFile import *

app = Flask(__name__)

#, origins='*'
CORS(app)

@app.route('/api/process-input/', methods = ["GET", "POST"])
def processInput():
    #If the method is correct (aka POST), continue.
    try:
        #Whatever request user sent, set as 'user_input'.
        data = request.json
        user_input = data.get('input', '')
        
        #'user_input' should be a string, returns json output of similar games.
        return (
            getGenres(user_input)
        )
    except Exception as e :
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True, port=8080)