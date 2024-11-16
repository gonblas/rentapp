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

# def upload_(local_file_path : str, file_name : str):
#     try:
        # s3.upload_file(local_file_path, BUCKET_NAME, f"images/{file_name}")
#         return True
#     except Exception as e:
#         print(e)
#         return False

def upload_avatar_to_s3(file: UploadFile, file_name: str):
    try:
        # s3.upload_file(file, BUCKET_NAME, f"avatar/{file_name}")
        # print("nasheeeeeeeeeeee")
        s3.upload_fileobj(file.file, BUCKET_NAME, f"avatars/{file_name}")
        return f"https://{BUCKET_NAME}.s3.sa-east-1.amazonaws.com/avatars/{file_name}"
    except Exception as e:
        print(e)
        return None

def upload_avatar(file: UploadFile):
    new_file_name = uuid.uuid4().hex + file.filename
    return upload_avatar_to_s3(file, new_file_name)

# def upload_file_to_s3(file: UploadFile, bucket_name: str, object_name: str):
#     try:
#         # Sube el archivo directamente desde el objeto UploadFile
#         s3_client.upload_fileobj(file.file, bucket_name, object_name)
#         return f"https://{bucket_name}.s3.amazonaws.com/{object_name}"
#     except NoCredentialsError:
#         print("Credenciales no encontradas")
#         return None
