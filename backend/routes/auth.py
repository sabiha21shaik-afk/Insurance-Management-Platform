from flask import Blueprint, request, jsonify

from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required
)

from extensions import db, bcrypt

from models.models import User



auth_bp = Blueprint(
    "auth",
    __name__
)





# Register User

@auth_bp.route(
    "/register",
    methods=["POST"]
)
def register():

    data = request.get_json()



    if not data:

        return jsonify({

            "message":
            "No data received"

        }),400




    required_fields = [
        "name",
        "email",
        "password"
    ]



    for field in required_fields:

        if field not in data:

            return jsonify({

                "message":
                f"{field} is required"

            }),400






    existing_user = User.query.filter_by(

        email=data["email"]

    ).first()



    if existing_user:

        return jsonify({

            "message":
            "Email already exists"

        }),400






    hashed_password = bcrypt.generate_password_hash(

        data["password"]

    ).decode("utf-8")






    user = User(

        name=data["name"],

        email=data["email"],

        password=hashed_password,

        role=data.get(
            "role",
            "Customer"
        )

    )





    db.session.add(user)

    db.session.commit()





    return jsonify({

        "message":
        "User Registered Successfully"

    }),201










# Login User

@auth_bp.route(
    "/login",
    methods=["POST"]
)
def login():


    data=request.get_json()



    if not data:

        return jsonify({

            "message":
            "No data received"

        }),400






    user = User.query.filter_by(

        email=data["email"]

    ).first()





    if not user:

        return jsonify({

            "message":
            "User not found"

        }),404







    if bcrypt.check_password_hash(

        user.password,

        data["password"]

    ):



        access_token = create_access_token(

            identity=user.email,

            additional_claims={

                "role":
                user.role,

                "name":
                user.name

            }

        )





        return jsonify({


            "message":
            "Login Successful",


            "token":
            access_token,


            "user":{

                "name":
                user.name,

                "email":
                user.email,

                "role":
                user.role

            }


        }),200







    return jsonify({

        "message":
        "Invalid Password"

    }),401










# Test Protected Route

@auth_bp.route(
    "/profile",
    methods=["GET"]
)

@jwt_required()

def profile():


    email = get_jwt_identity()



    user = User.query.filter_by(

        email=email

    ).first()



    return jsonify({

        "name":
        user.name,

        "email":
        user.email,

        "role":
        user.role

    })