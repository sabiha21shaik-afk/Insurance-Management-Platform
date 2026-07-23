from flask import Blueprint, request, jsonify

from extensions import db
from models.models import Customer

customer_bp = Blueprint("customer", __name__)


# Add Customer
@customer_bp.route("/customers", methods=["POST"])
def add_customer():

    data = request.get_json()

    customer = Customer(
        name=data["name"],
        dob=data["dob"],
        phone=data["phone"],
        address=data["address"],
        email=data["email"]
    )

    db.session.add(customer)
    db.session.commit()

    return jsonify({"message": "Customer Added Successfully"}), 201


# View All Customers
@customer_bp.route("/customers", methods=["GET"])
def get_customers():

    customers = Customer.query.all()

    result = []

    for customer in customers:
        result.append({
            "id": customer.id,
            "name": customer.name,
            "dob": customer.dob,
            "phone": customer.phone,
            "address": customer.address,
            "email": customer.email
        })

    return jsonify(result)


# Update Customer
@customer_bp.route("/customers/<int:id>", methods=["PUT"])
def update_customer(id):

    customer = Customer.query.get(id)

    if not customer:
        return jsonify({"message": "Customer not found"}), 404

    data = request.get_json()

    customer.name = data["name"]
    customer.dob = data["dob"]
    customer.phone = data["phone"]
    customer.address = data["address"]
    customer.email = data["email"]

    db.session.commit()

    return jsonify({"message": "Customer Updated Successfully"})


# Delete Customer
@customer_bp.route("/customers/<int:id>", methods=["DELETE"])
def delete_customer(id):

    customer = Customer.query.get(id)

    if not customer:
        return jsonify({"message": "Customer not found"}), 404

    db.session.delete(customer)
    db.session.commit()

    return jsonify({"message": "Customer Deleted Successfully"})