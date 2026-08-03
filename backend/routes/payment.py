from flask import Blueprint, request, jsonify
from extensions import db
from models.models import PremiumPayment

payment_bp = Blueprint("payment", __name__)


# -----------------------------
# GET ALL PAYMENTS
# -----------------------------
@payment_bp.route("/payments", methods=["GET"])
def get_payments():
    payments = PremiumPayment.query.all()

    data = []

    for payment in payments:
        data.append({
            "id": payment.id,
            "policy_id": payment.policy_id,
            "payment_date": payment.payment_date,
            "amount": payment.amount,
            "status": payment.payment_status
        })

    return jsonify(data)


# -----------------------------
# ADD PAYMENT
# -----------------------------
@payment_bp.route("/payments", methods=["POST"])
def add_payment():
    data = request.get_json()

    payment = PremiumPayment(
        policy_id=data["policy_id"],
        payment_date=data["payment_date"],
        amount=data["amount"],
        payment_status=data["status"]
    )

    db.session.add(payment)
    db.session.commit()

    return jsonify({
        "message": "Payment Added Successfully"
    }), 201


# -----------------------------
# UPDATE PAYMENT
# -----------------------------
@payment_bp.route("/payments/<int:id>", methods=["PUT"])
def update_payment(id):
    payment = PremiumPayment.query.get_or_404(id)

    data = request.get_json()

    payment.policy_id = data["policy_id"]
    payment.payment_date = data["payment_date"]
    payment.amount = data["amount"]
    payment.payment_status = data["status"]

    db.session.commit()

    return jsonify({
        "message": "Payment Updated Successfully"
    })


# -----------------------------
# DELETE PAYMENT
# -----------------------------
@payment_bp.route("/payments/<int:id>", methods=["DELETE"])
def delete_payment(id):
    payment = PremiumPayment.query.get_or_404(id)

    db.session.delete(payment)
    db.session.commit()

    return jsonify({
        "message": "Payment Deleted Successfully"
    })