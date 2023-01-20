import json
from flask import Flask, make_response, request, jsonify
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import pymongo
import secrets


secret_key = secrets.token_hex(16)
# example output, secret_key = 000d88cd9d90036ebdd237eb6b0db000

app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = secret_key

SECRET_KEY = "jkajoisjosk"

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)


client = pymongo.MongoClient("mongodb+srv://Deexith:Deexith@cluster0.w5geufm.mongodb.net/?retryWrites=true&w=majority", server_api=ServerApi('1'))
db = client.get_database('Company').users
doctor = client.get_database('Company').doctors

jwt = JWTManager(app)




@app.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    data = request.get_json()
    user = db.find_one({'email': data['email']})
    if user:
        if bcrypt.check_password_hash(user['password'], data['password']):
            access_token = create_access_token(identity={
                'id': str(user['_id']),
                'email': user['email']
            })
            return jsonify({'token': access_token}), 200
    return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/register', methods=['POST'])
def register():
    if request.is_json:
        data = request.get_json()
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        data['password'] = hashed_password
        db.insert_one(data)
        return jsonify({'message': 'User created successfully'}), 200
    else:
        return jsonify({'message': 'Invalid payload'}), 400

@app.route('/logout', methods=['GET'])
def logout():
    return jsonify({'message': 'User logged out successfully'}), 200

@app.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user = get_jwt_identity()
    return jsonify({'user': user}), 200

@app.route('/doctor', methods=['GET'])
def get_doctor():
    doctor_list = []
    for doc in doctor.find():
        doctor_list.append({'id': doc['id'] ,'name': doc['name'], 'age': doc['age'], 'country': doc['country'], 'specialization': doc['specialization'], 'noOfAppointments': doc['noOfAppointments']})
    return doctor_list, 200




if __name__ == "__main__":
    app.run(debug=True)

