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

def upload_property_images(files: list[UploadFile]):
    urls = []
    for image in files:
        try:
            new_file_name = f"{uuid.uuid4().hex}_{image.filename}"
            s3.upload_fileobj(image.file, BUCKET_NAME, f"images/{new_file_name}")
            urls.append(f"https://{BUCKET_NAME}.s3.sa-east-1.amazonaws.com/images/{new_file_name}")
        except Exception as e:
            print(e)
            return None
    return urls

def delete_avatar_from_s3(url: str):
    try:
        file_name = url.split("/")[-1]
        s3.delete_object(Bucket=BUCKET_NAME, Key=f"avatars/{file_name}")
    except Exception as e:
        print(e)
        return None

def delete_property_images_from_s3(urls: list[str]):
    try:
        for url in urls:
            file_name = url.split("/")[-1]
            s3.delete_object(Bucket=BUCKET_NAME, Key=f"images/{file_name}")
    except Exception as e:
        print(e)
        return None