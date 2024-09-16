from flask import Flask, request, jsonify
from GameRecFile import getGenres
from flask_cors import CORS
from GameRecFile import *

app = Flask(__name__)

#, origins='*'
CORS(app)


@app.route('/api/process-input/', methods = ["POST"])
def processInput():
    if request.method !='POST':
        return jsonify({'error': 'Wrong method, use POST'}), 405
    
    if not request.is_json:
        return jsonify({'error': 'Not json'}), 415
    
        
    #If the method is correct (aka POST), continue.
    try:
        #Whatever request user sent, set as 'user_input'.
        data = request.json
        user_input = data.get('input', '')
        
        if not user_input:
            return jsonify({'error': 'No input'})

        #'user_input' should be a string, returns json output of similar games.
        return (
            getGenres(user_input)
        )
    except Exception as e :
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500



if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=8080)