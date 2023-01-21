import json
from flask import Flask, make_response, request, jsonify, Response
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import pymongo
from bson import json_util
import secrets
import time
from datetime import datetime
secret_key = secrets.token_hex(16)
# example output, secret_key = 000d88cd9d90036ebdd237eb6b0db000



app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = secret_key

SECRET_KEY = "jkajoisjosk"

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)


client = pymongo.MongoClient("mongodb+srv://Deexith:Deexith@cluster0.w5geufm.mongodb.net/?retryWrites=true&w=majority", server_api=ServerApi('1'))
# db = client.get_database('Company').users
doctor = client.get_database('Company').doctors
patients = client.get_database('Company').patient

jwt = JWTManager(app)


@app.before_request
def before_request():
    if request.method == 'OPTIONS':
        return Response()

@app.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    data = request.get_json()
    var = patients.find_one({'email': data['email']})
    if var:
        if bcrypt.check_password_hash(var['password'], data['password']):
            access_token = create_access_token(identity=data['email'])
            return jsonify({'message': 'User logged in successfully', 'access_token': access_token, 'registerAs': var['registerer'],'firstName': var['firstName'],'lastName': var['lastName']}), 200
        else:
            return jsonify({'message': 'Invalid password'}), 400
    else:
        var = doctor.find_one({'email': data['email']})
        if var:
            if bcrypt.check_password_hash(var['password'], data['password']):
                access_token = create_access_token(identity=data['email'])
                return jsonify({'message': 'User logged in successfully', 'access_token': access_token, 'registerAs': var['registerer'],'firstName': var['firstName'],'lastName': var['lastName']}), 200
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
    user = patients.find_one({'email': user})
    if user:
        patients.update_one({'email': user['email']}, {'$set': data})
        return jsonify({'message': 'Details updated successfully'}), 200
    return jsonify({'message': 'Invalid username or password'}), 401


@app.route('/doctor/details', methods=['POST'])
@jwt_required()
def doctor_details():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    data = request.get_json()
    user = get_jwt_identity()
    user = doctor.find_one({'email': user})
    if user:
        doctor.update_one({'email': user['email']}, {'$set': data})
        return jsonify({'message': 'Details updated successfully'}), 200
    return jsonify({'message': 'Invalid username or password'}), 401



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
                data['meet'] = "na"
                doctor.insert_one(data)
                return jsonify({'message': 'User created successfully'}), 200
        else:
            return jsonify({'message': 'Invalid registerAs'}), 400
    else:
        return jsonify({'message': 'Invalid request'}), 400
    
                                             


@app.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user = get_jwt_identity()
    return jsonify({'user': user}), 200

@app.route('/doctor', methods=['GET'])
def get_doctor():
    data = []
    for x in doctor.find():
        if 'status' in x:
            if x['status']=="Online":
                x['name'] = 'Dr.' + x['firstName'] + " "+ x['lastName']
                data.append(x)
    return json_util.dumps(data), 200

@app.route('/news',methods=['GET'])
def getNews():
    data = client.get_database('Company').news.find()
    data = [x for x in data]    
    return json_util.dumps(data), 200

@app.route('/gen-meet',methods=['GET'])
def genMeet():
    data = request.get_json()
    t = int(time.time())
    user = doctor.find_one({'email': data['email']})
    payload = {"meet": str(t)}
    doctor.update_one({'email': user['email']}, {'$set': payload})
    return json_util.dumps(payload),200

@app.route('/fetchmeets',methods=['GET'])
@jwt_required()
def fetM():
    user = get_jwt_identity()
    data = doctor.find_one({'email': user})
    print(data)
    return json_util.dumps(data['meet']),200


@app.route('/del-meet',methods=['GET'])
def delMeet():
    data = request.get_json()
    payload = {"meet": "na"}
    user = doctor.find_one({'email': data['email']})
    doctor.update_one({'email': user['email']}, {'$set': payload})
    return jsonify({'message': 'Deleted Meet'}),200


@app.route('/news',methods=['POST'])
def addNews():
    data = request.get_json()
    data['date'] = datetime.today().strftime('%Y-%m-%d')
    client.get_database('Company').news.insert_one(data)
    return jsonify({'message': 'News Added'}), 200
    

@app.route('/details', methods=['POST'])
@jwt_required()
def get_details():
    data = request.get_json()
    print(data)
    user = get_jwt_identity()
    print(user)
    if data['registerer'] == 'patient':
        return json_util.dumps(patients.find_one({'email': user}))
    elif data['registerer'] == 'doctor':
        return json_util.dumps(doctor.find_one({'email': user}))
    else:
        return jsonify({'message': 'Invalid registerAs'}), 400
    

if __name__ == "__main__":
    app.run(debug=True)

