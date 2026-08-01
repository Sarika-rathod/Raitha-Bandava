from fastapi import FastAPI, UploadFile, File
import uvicorn
from io import BytesIO
from PIL import Image
import numpy as np
import tensorflow as tf
import os

app = FastAPI()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = r"C:\Users\sarik\Raitha Bandava\training\models\crop_disease_model.keras"

MODEL = tf.keras.models.load_model(MODEL_PATH)

CLASS_NAMES = [
    "Maize_Common_Rust",
    "Maize_Gray_Leaf_Spot",
    "Maize_Healthy",
    "Maize_Maize_Rust",
    "Sugarcane_Bacterial_Blight",
    "Sugarcane_Healthy",
    "Sugarcane_Mosaic",
    "Wheat_Brown_Rust",
    "Wheat_Crown_Root_Rot",
    "Wheat_Healthy",
    "Wheat_Loose_Smut",
    "Wheat_Septoria"
]

def read_file_as_image(data) -> np.ndarray:
    
    image = Image.open(BytesIO(data))

    # Resize image according to model input size
    image = image.resize((256, 256))

    # Convert image to numpy array
    image = np.array(image)

    return image

@app.get("/")
async def home():
    return {"message": "API is running"}

@app.get("/ping")
async def ping():
    return {"message": "working"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    # Read image
    image = read_file_as_image(await file.read())

    # Add batch dimension
    img_batch = np.expand_dims(image, 0)

    # Predict
    predictions = MODEL.predict(img_batch)

    # Get predicted class
    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]

    # Get confidence
    confidence = float(np.max(predictions[0]))

    return {
        "class": predicted_class,
        "confidence": confidence
    }



if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8002)