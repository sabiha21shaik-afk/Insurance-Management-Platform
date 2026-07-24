from flask import Blueprint, request, jsonify
from extensions import db
from models.models import Policy

policy_bp = Blueprint("policy", __name__)


# Create Policy
@policy_bp.route("/policies", methods=["POST"])
def create_policy():
    data = request.get_json()

    policy = Policy(
        customer_id=data["customer_id"],
        policy_type=data["policy_type"],
        policy_number=data["policy_number"],
        premium_amount=data["premium_amount"],
        start_date=data["start_date"],
        end_date=data["end_date"],
        status=data["status"]
    )

    db.session.add(policy)
    db.session.commit()

    return jsonify({"message": "Policy created successfully"}), 201


# Get All Policies
@policy_bp.route("/policies", methods=["GET"])
def get_policies():
    policies = Policy.query.all()

    result = []
    for policy in policies:
        result.append({
            "id": policy.id,
            "customer_id": policy.customer_id,
            "policy_type": policy.policy_type,
            "policy_number": policy.policy_number,
            "premium_amount": policy.premium_amount,
            "start_date": policy.start_date,
            "end_date": policy.end_date,
            "status": policy.status
        })

    return jsonify(result)


# Get Single Policy
@policy_bp.route("/policies/<int:id>", methods=["GET"])
def get_policy(id):
    policy = Policy.query.get_or_404(id)

    return jsonify({
        "id": policy.id,
        "customer_id": policy.customer_id,
        "policy_type": policy.policy_type,
        "policy_number": policy.policy_number,
        "premium_amount": policy.premium_amount,
        "start_date": policy.start_date,
        "end_date": policy.end_date,
        "status": policy.status
    })


# Update Policy
@policy_bp.route("/policies/<int:id>", methods=["PUT"])
def update_policy(id):
    policy = Policy.query.get_or_404(id)
    data = request.get_json()

    policy.customer_id = data["customer_id"]
    policy.policy_type = data["policy_type"]
    policy.policy_number = data["policy_number"]
    policy.premium_amount = data["premium_amount"]
    policy.start_date = data["start_date"]
    policy.end_date = data["end_date"]
    policy.status = data["status"]

    db.session.commit()

    return jsonify({"message": "Policy updated successfully"})


# Delete Policy
@policy_bp.route("/policies/<int:id>", methods=["DELETE"])
def delete_policy(id):
    policy = Policy.query.get_or_404(id)

    db.session.delete(policy)
    db.session.commit()

    return jsonify({"message": "Policy deleted successfully"})