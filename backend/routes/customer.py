from flask import Blueprint, request, jsonify
from extensions import db
from models.models import Customer

customer_bp = Blueprint("customer", __name__)


# Get all customers
@customer_bp.route("/customers", methods=["GET"])
def get_customers():

    customers = Customer.query.all()

    data = []

    for customer in customers:
        data.append({
            "id": customer.id,
            "name": customer.name,
            "email": customer.email,
            "phone": customer.phone,
            "address": customer.address
        })

    return jsonify(data), 200


# Add customer
@customer_bp.route("/customers", methods=["POST"])
def add_customer():

    data = request.get_json()

    if not data:
        return jsonify({
            "message": "No data received"
        }), 400


    customer = Customer(
        name=data.get("name"),
        email=data.get("email"),
        phone=data.get("phone"),
        address=data.get("address")
    )


    db.session.add(customer)
    db.session.commit()


    return jsonify({
        "message": "Customer added successfully",
        "customer": {
            "id": customer.id,
            "name": customer.name,
            "email": customer.email,
            "phone": customer.phone,
            "address": customer.address
        }
    }), 201



# Delete customer
@customer_bp.route("/customers/<int:id>", methods=["DELETE"])
def delete_customer(id):

    customer = Customer.query.get(id)

    if not customer:
        return jsonify({
            "message": "Customer not found"
        }), 404


    db.session.delete(customer)
    db.session.commit()


    return jsonify({
        "message": "Customer deleted successfully"
    }), 200