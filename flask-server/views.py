from flask import Flask, request, jsonify, make_response
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
        json_output = getGenres(user_input)
        
        response = make_response(json_output)
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000/'
        response.headers['Access-Control-Allow-Methods'] = 'POST, GET'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        
        #'user_input' should be a string, returns json output of similar games.
        return (
            #getGenres(user_input)
            response
        )
    except Exception as e :
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500



if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=8080)