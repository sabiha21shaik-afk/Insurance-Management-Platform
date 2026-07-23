import os

class Config:
    SECRET_KEY = "insurance-secret-key"

    SQLALCHEMY_DATABASE_URI = "sqlite:///insurance.db"

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = "jwt-secret-key"

    UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")