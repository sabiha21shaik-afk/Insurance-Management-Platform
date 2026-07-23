from flask import Flask
from flask_cors import CORS

from config import Config
from extensions import db, jwt, bcrypt

# Import models
from models.models import *

# Import routes
from routes.auth import auth_bp
from routes.customer import customer_bp

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)
jwt.init_app(app)
bcrypt.init_app(app)

CORS(app)

# Register Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(customer_bp)


@app.route("/")
def home():
    return {
        "message": "Insurance Management Platform Backend Running Successfully!"
    }


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)