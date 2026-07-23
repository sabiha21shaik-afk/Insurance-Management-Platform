from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token

from extensions import db, bcrypt
from models.models import User

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    if not data:
        return jsonify({"message": "No data received"}), 400

    existing_user = User.query.filter_by(email=data["email"]).first()

    if existing_user:
        return jsonify({"message": "Email already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(
        data["password"]
    ).decode("utf-8")

    user = User(
        name=data["name"],
        email=data["email"],
        password=hashed_password,
        role=data["role"]
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User Registered Successfully"}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data:
        return jsonify({"message": "No data received"}), 400

    user = User.query.filter_by(email=data["email"]).first()

    if not user:
        return jsonify({"message": "User not found"}), 404

    if bcrypt.check_password_hash(user.password, data["password"]):

        access_token = create_access_token(identity=user.email)

        return jsonify({
            "message": "Login Successful",
            "token": access_token,
            "role": user.role
        })

    return jsonify({"message": "Invalid Password"}), 401