from extensions import db


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False)


class Customer(db.Model):
    __tablename__ = "customers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    dob = db.Column(db.String(20))
    phone = db.Column(db.String(20))
    address = db.Column(db.String(255))
    email = db.Column(db.String(120))


class Policy(db.Model):
    __tablename__ = "policies"

    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey("customers.id"))
    policy_type = db.Column(db.String(100))
    policy_number = db.Column(db.String(100), unique=True)
    premium_amount = db.Column(db.Float)
    start_date = db.Column(db.String(20))
    end_date = db.Column(db.String(20))
    status = db.Column(db.String(50))


class Claim(db.Model):
    __tablename__ = "claims"

    id = db.Column(db.Integer, primary_key=True)
    policy_id = db.Column(db.Integer, db.ForeignKey("policies.id"))
    claim_amount = db.Column(db.Float)
    reason = db.Column(db.Text)
    status = db.Column(db.String(50))
    submission_date = db.Column(db.String(20))


class PremiumPayment(db.Model):
    __tablename__ = "premium_payments"

    id = db.Column(db.Integer, primary_key=True)
    policy_id = db.Column(db.Integer, db.ForeignKey("policies.id"))
    payment_date = db.Column(db.String(20))
    amount = db.Column(db.Float)
    payment_status = db.Column(db.String(50))


class Document(db.Model):
    __tablename__ = "documents"

    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey("customers.id"))
    file_name = db.Column(db.String(255))
    file_path = db.Column(db.String(255))
    uploaded_at = db.Column(db.String(50))