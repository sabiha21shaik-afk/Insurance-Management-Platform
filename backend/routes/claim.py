from flask import Blueprint, request, jsonify
from extensions import db
from models.models import Claim

claim_bp = Blueprint("claim", __name__)


# -----------------------------
# AI Risk Score & Fraud Detection
# -----------------------------
def calculate_risk(claim_amount):
    if claim_amount < 10000:
        return {
            "risk_score": 25,
            "risk_level": "Low",
            "fraud_alert": False,
            "recommendation": "Low risk claim"
        }

    elif claim_amount < 50000:
        return {
            "risk_score": 60,
            "risk_level": "Medium",
            "fraud_alert": False,
            "recommendation": "Review documents before approval"
        }

    else:
        return {
            "risk_score": 90,
            "risk_level": "High",
            "fraud_alert": True,
            "recommendation": "Manual verification required"
        }


# -----------------------------
# Create Claim
# -----------------------------
@claim_bp.route("/claims", methods=["POST"])
def create_claim():
    data = request.get_json()

    claim = Claim(
        policy_id=data["policy_id"],
        claim_amount=data["claim_amount"],
        reason=data["reason"],
        status=data["status"],
        submission_date=data["submission_date"]
    )

    db.session.add(claim)
    db.session.commit()

    return jsonify({"message": "Claim created successfully"}), 201


# -----------------------------
# Get All Claims
# -----------------------------
@claim_bp.route("/claims", methods=["GET"])
def get_claims():

    claims = Claim.query.all()

    result = []

    for claim in claims:

        ai = calculate_risk(claim.claim_amount)

        result.append({
            "id": claim.id,
            "policy_id": claim.policy_id,
            "claim_amount": claim.claim_amount,
            "reason": claim.reason,
            "status": claim.status,
            "submission_date": claim.submission_date,

            # AI Fields
            "risk_score": ai["risk_score"],
            "risk_level": ai["risk_level"],
            "fraud_alert": ai["fraud_alert"],
            "recommendation": ai["recommendation"]
        })

    return jsonify(result)


# -----------------------------
# Get Single Claim
# -----------------------------
@claim_bp.route("/claims/<int:id>", methods=["GET"])
def get_claim(id):

    claim = Claim.query.get_or_404(id)

    ai = calculate_risk(claim.claim_amount)

    return jsonify({
        "id": claim.id,
        "policy_id": claim.policy_id,
        "claim_amount": claim.claim_amount,
        "reason": claim.reason,
        "status": claim.status,
        "submission_date": claim.submission_date,

        "risk_score": ai["risk_score"],
        "risk_level": ai["risk_level"],
        "fraud_alert": ai["fraud_alert"],
        "recommendation": ai["recommendation"]
    })


# -----------------------------
# Update Claim
# -----------------------------
@claim_bp.route("/claims/<int:id>", methods=["PUT"])
def update_claim(id):

    claim = Claim.query.get_or_404(id)
    data = request.get_json()

    claim.policy_id = data["policy_id"]
    claim.claim_amount = data["claim_amount"]
    claim.reason = data["reason"]
    claim.status = data["status"]
    claim.submission_date = data["submission_date"]

    db.session.commit()

    return jsonify({"message": "Claim updated successfully"})


# -----------------------------
# Delete Claim
# -----------------------------
@claim_bp.route("/claims/<int:id>", methods=["DELETE"])
def delete_claim(id):

    claim = Claim.query.get_or_404(id)

    db.session.delete(claim)
    db.session.commit()

    return jsonify({"message": "Claim deleted successfully"})