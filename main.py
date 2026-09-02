from flask import Flask, render_template, request, jsonify
import os

# Reduce TensorFlow memory/CPU usage on Render
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"
os.environ["OMP_NUM_THREADS"] = "1"
os.environ["TF_NUM_INTRAOP_THREADS"] = "1"
os.environ["TF_NUM_INTEROP_THREADS"] = "1"

import sqlite3
import json
import numpy as np
import tensorflow as tf


tf.config.threading.set_intra_op_parallelism_threads(1)
tf.config.threading.set_inter_op_parallelism_threads(1)

from PIL import Image
from dotenv import load_dotenv
from tensorflow.keras.utils import img_to_array
from werkzeug.security import generate_password_hash, check_password_hash

from model_architecture import create_model

load_dotenv()
print("=" * 50)
print("GROQ_API_KEY exists:", os.getenv("GROQ_API_KEY") is not None)

key = os.getenv("GROQ_API_KEY")
if key:
    print("Key starts with:", key[:8])
    print("Key length:", len(key))
else:
    print("No API key found")
print("=" * 50)

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

print("Loading disease model...")

model = create_model(len(CLASS_NAMES))
model.load_weights("training/crop_disease.weights.h5")

print("Disease model loaded.")

recommendations = {

"Maize_Common_Rust":{
    "kn":"ಮಕ್ಕಜೋಳ - ಸಾಮಾನ್ಯ ಕಂಗು",
    "en":"Spray Mancozeb or Propiconazole.",
    "kn_rec":"ಮ್ಯಾಂಕೋಜೆಬ್ ಅಥವಾ ಪ್ರೊಪಿಕೊನಾಜೋಲ್ ಸಿಂಪಡಿಸಿ."
},

"Maize_Gray_Leaf_Spot":{
    "kn":"ಮಕ್ಕಜೋಳ - ಗ್ರೇ ಲೀಫ್ ಸ್ಪಾಟ್",
    "en":"Use resistant varieties and fungicide.",
    "kn_rec":"ರೋಗನಿರೋಧಕ ತಳಿ ಹಾಗೂ ಶಿಲೀಂಧ್ರನಾಶಕ ಬಳಸಿ."
},

"Maize_Healthy":{
    "kn":"ಆರೋಗ್ಯಕರ",
    "en":"Crop is healthy.",
    "kn_rec":"ಬೆಳೆ ಆರೋಗ್ಯಕರವಾಗಿದೆ."
},

"Maize_Maize_Rust":{
    "kn":"ಮಕ್ಕಜೋಳ ಕಂಗು",
    "en":"Spray fungicide immediately.",
    "kn_rec":"ತಕ್ಷಣ ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಿಸಿ."
},

"Sugarcane_Bacterial_Blight":{
    "kn":"ಕಬ್ಬು ಬ್ಯಾಕ್ಟೀರಿಯಾ ಬ್ಲೈಟ್",
    "en":"Avoid water stagnation and remove infected leaves.",
    "kn_rec":"ನೀರು ನಿಲ್ಲದಂತೆ ಮಾಡಿ ಹಾಗೂ ಸೋಂಕಿತ ಎಲೆ ತೆಗೆದುಹಾಕಿ."
},

"Sugarcane_Healthy":{
    "kn":"ಆರೋಗ್ಯಕರ",
    "en":"Crop is healthy.",
    "kn_rec":"ಬೆಳೆ ಆರೋಗ್ಯಕರವಾಗಿದೆ."
},

"Sugarcane_Mosaic":{
    "kn":"ಕಬ್ಬು ಮೊಸಾಯಿಕ್",
    "en":"Remove infected plants and control aphids.",
    "kn_rec":"ಸೋಂಕಿತ ಗಿಡ ತೆಗೆದುಹಾಕಿ ಹಾಗೂ ಆಫಿಡ್ ನಿಯಂತ್ರಿಸಿ."
},

"Wheat_Brown_Rust":{
    "kn":"ಗೋಧಿ ಬ್ರೌನ್ ರಸ್ಟ್",
    "en":"Spray Propiconazole.",
    "kn_rec":"ಪ್ರೊಪಿಕೊನಾಜೋಲ್ ಸಿಂಪಡಿಸಿ."
},

"Wheat_Crown_Root_Rot":{
    "kn":"ಗೋಧಿ ಕ್ರೌನ್ ರೂಟ್ ರಾಟ್",
    "en":"Improve drainage and rotate crops.",
    "kn_rec":"ಒಳ್ಳೆಯ ನೀರು ಹರಿವು ಹಾಗೂ ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ."
},

"Wheat_Healthy":{
    "kn":"ಆರೋಗ್ಯಕರ",
    "en":"Crop is healthy.",
    "kn_rec":"ಬೆಳೆ ಆರೋಗ್ಯಕರವಾಗಿದೆ."
},

"Wheat_Loose_Smut":{
    "kn":"ಗೋಧಿ ಲೂಸ್ ಸ್ಮಟ್",
    "en":"Use treated seeds.",
    "kn_rec":"ಬೀಜ ಸಂಸ್ಕರಣೆ ಮಾಡಿ."
},

"Wheat_Septoria":{
    "kn":"ಗೋಧಿ ಸೆಪ್ಟೋರಿಯಾ",
    "en":"Spray suitable fungicide.",
    "kn_rec":"ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಿಸಿ."
}

}


from agno.agent import Agent
from agno.models.groq import Groq
from agno.db.sqlite import SqliteDb


memory_db = SqliteDb(
    db_file="chat_memory.db"
)

farmer_agent = Agent(
    model=Groq(
        id="openai/gpt-oss-120b",
        api_key=os.getenv("GROQ_API_KEY"),
        
    ),
    db=memory_db,
    add_history_to_context=True,
    num_history_runs=20,
    add_datetime_to_context=True,
    instructions=[
        "You are Raitha Bandava AI.",
        "You are an agriculture expert for Karnataka farmers.",
        "Answer only agriculture-related questions.",
        "Give practical farming advice.",
        "Keep answers short and easy to understand."
    ]
)
app = Flask(__name__)


DATABASE = "raitha_bandava.db"

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


def create_tables():
    conn = sqlite3.connect("raitha_bandava.db")
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    """)

    conn.commit()
    conn.close()
    
create_tables()

def get_chat_session(username):

    if not username:
        username = "guest"

    return f"user_{username}"



@app.route("/")
def home():

    return render_template("index.html")



@app.route("/scheme")
def scheme():

    return render_template("index1.html")



@app.route("/calender")
def calender():

    return render_template("index2.html")


@app.route("/smart_farmimg")
def smart_farming():

    return render_template("index3.html")



@app.route("/disease_detector")
def disease_detector():

    return render_template("index4.html")



@app.route("/chatbot")
def chatbot():

    return render_template("index5.html")



@app.route("/register", methods=["POST"])
def register():

    connection = None
    cursor = None

    try:

        data = request.get_json(silent=True)

        if not data:

            return jsonify({
                "success": False,
                "message": "Invalid request"
            }), 400


        name = data.get("name", "").strip()

        password = data.get("password", "")

        if not name or not password:

            return jsonify({
                "success": False,
                "message": "Enter name and password"
            }), 400


        # PASSWORD LENGTH

        if len(password) < 6:

            return jsonify({
                "success": False,
                "message": "Password must contain at least 6 characters"
            }), 400


        # DATABASE CONNECTION

        connection = get_db_connection()
        cursor = connection.cursor()

        cursor.execute(
            "SELECT id FROM users WHERE name=?",
            (name,)
        )


        existing_user = cursor.fetchone()


        if existing_user:

            return jsonify({
                "success": False,
                "message": "Username already exists"
            }), 409


        # HASH PASSWORD

        hashed_password = generate_password_hash(password)
        cursor.execute(
            """
            INSERT INTO users(name,password)
            VALUES(?,?)
            """,
            (
                name,
                hashed_password
            )
        )
        connection.commit()


        print(
            f"NEW USER REGISTERED: {name}"
        )


        return jsonify({
            "success": True,
            "message":
                "Registration Successful"
        }), 201

    except Exception as e:

        print("REGISTER ERROR :", e)

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()



@app.route("/login", methods=["POST"])
def login():

    connection = None
    cursor = None

    try:

        data = request.get_json(silent=True)

        if not data:
            return jsonify({
                "success": False,
                "message": "Invalid request"
            }), 400

        name = data.get("name", "").strip()
        password = data.get("password", "")

        if not name or not password:
            return jsonify({
                "success": False,
                "message": "Enter username and password"
            }), 400

        connection = get_db_connection()
        cursor = connection.cursor()

        cursor.execute("""
            SELECT id, name, password
            FROM users
            WHERE name=?
        """, (name,))

        user = cursor.fetchone()

        if not user:
            return jsonify({
                "success": False,
                "message": "User not found"
            }), 404

        if not check_password_hash(user["password"], password):
            return jsonify({
                "success": False,
                "message": "Incorrect password"
            }), 401

        print(f"✅ USER LOGGED IN : {user['name']}")

        return jsonify({
            "success": True,
            "message": "Login Successful",
            "user": {
                "id": user["id"],
                "name": user["name"]
            }
        }), 200

    except Exception as e:

        print("LOGIN ERROR :", e)

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()


@app.route("/health")
def health():

    try:

        conn = get_db_connection()
        conn.close()

        return jsonify({
            "status": "OK",
            "database": "Connected",
            "ai": "Running"
        })

    except Exception as error:

        return jsonify({
            "status": "ERROR",
            "database": str(error)
        }), 500

@app.route("/chat", methods=["POST"])
def chat():

    try:

        data = request.get_json(silent=True)

        if not data:
            return jsonify({
                "error": "Invalid request."
            }), 400

        question = data.get("message", "").strip()
        language = data.get("language", "en")
        username = data.get("username", "guest")

        if not question:
            return jsonify({
                "error": "Question cannot be empty."
            }), 400

        # Create a unique session for every user
        session_id = get_chat_session(username)

        # Kannada Prompt
        if language == "kn":

            prompt = f"""
ನೀವು ರೈತ ಬಂಧವ AI.

ನೀವು ಕರ್ನಾಟಕದ ರೈತರಿಗೆ ಸಹಾಯ ಮಾಡುವ ಕೃಷಿ ತಜ್ಞ.

ಯಾವಾಗಲೂ ಕನ್ನಡದಲ್ಲಿ ಮಾತ್ರ ಉತ್ತರಿಸಿ.

ಹಿಂದಿನ ಸಂಭಾಷಣೆಯನ್ನು ನೆನಪಿಟ್ಟುಕೊಂಡು ಉತ್ತರಿಸಿ.

ಕೃಷಿಗೆ ಸಂಬಂಧಿಸಿದ ಪ್ರಶ್ನೆಗಳಿಗೆ ಮಾತ್ರ ಉತ್ತರಿಸಿ.

ಪ್ರಶ್ನೆ:
{question}
"""

        # English Prompt
        else:

            prompt = f"""
You are Raitha Bandava AI.

You are an agriculture expert helping Karnataka farmers.

Always answer in English.

Remember previous conversations.

Answer only agriculture related questions.

Question:
{question}
"""

        # Ask Agno
        response = farmer_agent.run(
            prompt,
            session_id=session_id
        )

        return jsonify({
            "success": True,
            "response": response.content
        })

    except Exception as e:

        print("CHAT ERROR :", e)

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route("/predict", methods=["POST"])
def predict():

    try:

        if "image" not in request.files:
            return jsonify({
                "success": False,
                "error": "No image uploaded"
            }), 400

        file = request.files["image"]

        if file.filename == "":
            return jsonify({
                "success": False,
                "error": "No file selected"
            }), 400

        img = Image.open(file).convert("RGB")
        img = img.resize((256,256))
        img = img_to_array(img)
        img = np.expand_dims(img, axis=0)

        img = tf.keras.applications.efficientnet.preprocess_input(img)

        prediction = model.predict(img, verbose=0)

        index = np.argmax(prediction)
        confidence = float(np.max(prediction))

        disease = CLASS_NAMES[index]
        rec = recommendations[disease]

        return jsonify({
            "success": True,
            "disease": disease,
            "disease_kn": rec["kn"],
            "confidence": round(confidence * 100, 2),
            "recommendation_en": rec["en"],
            "recommendation_kn": rec["kn_rec"]
        })

    except Exception as e:
        print("PREDICTION ERROR:", e)

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5001,
        debug=True
    )
