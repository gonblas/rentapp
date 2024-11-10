import boto3
import os
from dotenv import load_dotenv

s3 = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET")
)

BUCKET_NAME=os.getenv("BUCKET_NAME")

def upload_image_to_bucket(local_file_path : str, file_name : str):
    try:
        s3.upload_file(local_file_path, BUCKET_NAME, f"images/{file_name}")
        return True
    except Exception as e:
        print(e)
        return False

def upload_avatar_to_bucket(local_file_path : str, file_name : str):
    try:
        s3.upload_file(local_file_path, BUCKET_NAME, f"avatar/{file_name}")
        return True
    except Exception as e:
        print(e)
        return False

# def upload_file_to_s3(file: UploadFile, bucket_name: str, object_name: str):
#     try:
#         # Sube el archivo directamente desde el objeto UploadFile
#         s3_client.upload_fileobj(file.file, bucket_name, object_name)
#         return f"https://{bucket_name}.s3.amazonaws.com/{object_name}"
#     except NoCredentialsError:
#         print("Credenciales no encontradas")
#         return None
