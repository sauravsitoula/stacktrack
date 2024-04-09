from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.vgg16 import VGG16, preprocess_input, decode_predictions
import numpy as np
import requests
from PIL import Image
from io import BytesIO
from pydantic import BaseModel
import boto3
import os
S3_BUCKET_NAME = 'stacktrack'
MODEL_FILE_NAME = 'vgg16_model.keras'
LOCAL_MODEL_PATH = 'vgg16_model.keras' 

# Set AWS credentials and region
os.environ['AWS_ACCESS_KEY_ID'] = 'AKIAZI2LDY6UZATZWMFH'
os.environ['AWS_SECRET_ACCESS_KEY'] = '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'
os.environ['AWS_DEFAULT_REGION'] = 'us-east-2'

app = FastAPI()

def download_model_from_s3():
    s3 = boto3.client('s3')
    try:
        print("Downloading model from S3...")
        s3.download_file(S3_BUCKET_NAME, MODEL_FILE_NAME, LOCAL_MODEL_PATH)
        print("Model downloaded successfully.")
    except Exception as e:
        print(f"Failed to download model from S3: {e}")
        raise

def ensure_model_available():
    # Check if the model exists locally
    if not os.path.exists(LOCAL_MODEL_PATH):
        print(f"Model not found at {LOCAL_MODEL_PATH}. Downloading from S3...")
        download_model_from_s3()
    else:
        print(f"Model found at {LOCAL_MODEL_PATH}. No download needed.")

# Ensure the model is available for use
ensure_model_available()

# Now you can load the model
model = load_model(LOCAL_MODEL_PATH)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = load_model('vgg16_model.keras')

class ImageURL(BaseModel):
    image_url: str

def preprocess_image_from_url(img_url):
    response = requests.get(img_url)
    img = Image.open(BytesIO(response.content))
    img = img.resize((224, 224))
    img_array = image.img_to_array(img)
    img_array_expanded_dims = np.expand_dims(img_array, axis=0)
    return img_array_expanded_dims

@app.post("/predict/")
async def predict_image(request_body: ImageURL):
    return {"status": "success"}
    # try:
    #     img_array_expanded_dims = preprocess_image_from_url(request_body.image_url)
    #     predictions = model.predict(img_array_expanded_dims)
    #     top_prediction = decode_predictions(predictions, top=1)[0][0]
    #     return {"label": top_prediction[1], "probability": float(top_prediction[2])}
    # except Exception as e:
    #     raise HTTPException(status_code=400, detail=str(e))