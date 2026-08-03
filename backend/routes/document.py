import os

from flask import (
    Blueprint,
    request,
    jsonify,
    send_from_directory
)

from extensions import db
from models.models import Document



document_bp = Blueprint(
    "documents",
    __name__
)



UPLOAD_FOLDER = "uploads"



# Create upload folder if not exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)





# Upload Document
@document_bp.route(
    "/documents",
    methods=["POST"]
)
def upload_document():


    try:

        file = request.files["file"]

        customer_id = request.form["customer_id"]

        document_type = request.form["document_type"]



        filename = file.filename


        filepath = os.path.join(
            UPLOAD_FOLDER,
            filename
        )


        file.save(filepath)



        document = Document(

            customer_id=customer_id,

            file_name=filename,

            file_path=filepath,

            document_type=document_type

        )


        db.session.add(document)

        db.session.commit()



        return jsonify({

            "message":
            "Document uploaded successfully"

        }),201



    except Exception as e:

        return jsonify({

            "error":str(e)

        }),400







# Get Documents
@document_bp.route(
    "/documents",
    methods=["GET"]
)
def get_documents():


    documents = Document.query.all()



    return jsonify([

        {

        "id":doc.id,

        "customer_id":doc.customer_id,

        "file_name":doc.file_name,

        "document_type":doc.document_type,

        "uploaded_at":doc.uploaded_at

        }

        for doc in documents

    ])








# Download Document
@document_bp.route(
    "/documents/download/<filename>"
)
def download_document(filename):


    return send_from_directory(

        UPLOAD_FOLDER,

        filename

    )