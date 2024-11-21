import boto3
import os
from dotenv import load_dotenv
from fastapi import UploadFile
import uuid

s3 = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET")
)

BUCKET_NAME=os.getenv("BUCKET_NAME")


def upload_avatar_to_s3(file: UploadFile, file_name: str):
    try:
        s3.upload_fileobj(file.file, BUCKET_NAME, f"avatars/{file_name}")
        return f"https://{BUCKET_NAME}.s3.sa-east-1.amazonaws.com/avatars/{file_name}"
    except Exception as e:
        print(e)
        return None

def upload_avatar(file: UploadFile):
    new_file_name = uuid.uuid4().hex + file.filename
    return upload_avatar_to_s3(file, new_file_name)
