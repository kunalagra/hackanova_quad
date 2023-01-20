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
from pickle import load
# model = load(open('model.pkl', 'rb'))
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
patients = client.get_database('Company').patient

jwt = JWTManager(app)


@app.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    data = request.get_json()
    print(data)
    var = patients.find_one({'email': data['email']})
    print(var)
    if var:
        if bcrypt.check_password_hash(var['password'], data['password']):
            access_token = create_access_token(identity=data['email'])
            return jsonify({'message': 'User logged in successfully', 'access_token': access_token, 'registerAs': var['registerer']}), 200
        else:
            return jsonify({'message': 'Invalid password'}), 400
    else:
        var = doctor.find_one({'email': data['email']})
        print(var)
        if var:
            if bcrypt.check_password_hash(var['password'], data['password']):
                access_token = create_access_token(identity=data['email'])
                return jsonify({'message': 'User logged in successfully', 'access_token': access_token, 'registerAs': var['registerer']}), 200
            else:
                return jsonify({'message': 'Invalid password'}), 400
        else:
            return jsonify({'message': 'Invalid username or password'}), 401

    

@app.route('/patient/details', methods=['POST'])
@jwt_required()
def patient_details():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    data = request.get_json()
    user = get_jwt_identity()
    user = db.find_one({'email': user['email']})
    if user:
        db.update_one({'email': user['email']}, {'$set': {'age': data['age'],'bloodGroup':data['bloodGroup']}})
        return jsonify({'message': 'Details updated successfully'}), 200
    return jsonify({'message': 'Invalid username or password'}), 401


@app.route('/login/doctor', methods=['POST'])
def loginD():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    data = request.get_json()

@app.route('/register', methods=['POST'])
def register():
    if request.is_json:
        data = request.get_json()
        if data['registerer'] == 'patient':
            user = patients.find_one({'email': data['email']})
            if user:
                return jsonify({'message': 'User already exists'}), 400
            else:
                hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
                data['password'] = hashed_password
                patients.insert_one(data)
                return jsonify({'message': 'User created successfully'}), 200
        elif data['registerer'] == 'doctor':
            user = doctor.find_one({'email': data['email']})
            if user:
                return jsonify({'message': 'User already exists'}), 400
            else:
                hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
                data['password'] = hashed_password
                doctor.insert_one(data)
                return jsonify({'message': 'User created successfully'}), 200
        else:
            return jsonify({'message': 'Invalid registerAs'}), 400
    else:
        return jsonify({'message': 'Invalid request'}), 400
    
                                             

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

