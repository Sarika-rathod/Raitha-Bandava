from flask import Flask, render_template, request, jsonify
import mysql.connector
import os
from tensorflow.keras.models import load_model
from tensorflow.keras.utils import img_to_array
from PIL import Image
import tensorflow as tf
import numpy as np
import json

from dotenv import load_dotenv
load_dotenv()

from model_architecture import create_model

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

model = create_model(len(CLASS_NAMES))

model.load_weights("training/crop_disease.weights.h5")

print("✅ Model loaded successfully")

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

from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)
from agno.agent import Agent
from agno.models.groq import Groq
from agno.tools.websearch import WebSearchTools
from agno.tools.duckduckgo import DuckDuckGoTools
from agno.db.sqlite import SqliteDb

memory_db = SqliteDb(
    db_file="chat_memory.db"
)

farmer_agent = Agent(
    model=Groq(
        id="llama-3.3-70b-versatile",
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
print("Step 4: Flask app created")


def get_db_connection():

    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Raitha@123",  
        database="raitha_bandava"
    )



def test_database():

    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor()

        cursor.execute("SELECT DATABASE()")

        database = cursor.fetchone()

        
        print("✅ MYSQL CONNECTED SUCCESSFULLY")
        print("✅ DATABASE:", database[0])
        

    except mysql.connector.Error as error:

        
        print("❌ MYSQL CONNECTION ERROR")
        print(error)
        

    finally:

        if cursor:
            cursor.close()

        if connection and connection.is_connected():
            connection.close()

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


        # CHECK EMPTY FIELDS

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

        cursor = connection.cursor(dictionary=True)


        # CHECK EXISTING USER

        cursor.execute(
            """
            SELECT id
            FROM users
            WHERE name = %s
            """,
            (name,)
        )


        existing_user = cursor.fetchone()


        if existing_user:

            return jsonify({
                "success": False,
                "message": "Username already exists"
            }), 409


        # HASH PASSWORD

        hashed_password = generate_password_hash(
            password
        )


        # INSERT USER

        cursor.execute(
            """
            INSERT INTO users
            (
                name,
                password
            )
            VALUES
            (
                %s,
                %s
            )
            """,
            (
                name,
                hashed_password
            )
        )


        connection.commit()


        print(
            f"✅ NEW USER REGISTERED: {name}"
        )


        return jsonify({

            "success": True,

            "message":
                "Registration Successful"

        }), 201


    except mysql.connector.Error as error:

        print(
            "❌ REGISTER DATABASE ERROR:",
            error
        )


        if connection:

            connection.rollback()


        return jsonify({

            "success": False,

            "message":
                f"Database Error: {str(error)}"

        }), 500


    except Exception as error:

        print(
            "❌ REGISTER ERROR:",
            error
        )


        return jsonify({

            "success": False,

            "message":
                "Registration Failed"

        }), 500


    finally:

        if cursor:

            cursor.close()


        if (
            connection
            and connection.is_connected()
        ):

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
        cursor = connection.cursor(dictionary=True)

        cursor.execute("""
            SELECT id, name, password
            FROM users
            WHERE name=%s
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

    except mysql.connector.Error as error:

        print(error)

        return jsonify({
            "success": False,
            "message": str(error)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if connection and connection.is_connected():
            connection.close()

@app.route("/health")
def health():

    try:

        connection = get_db_connection()
        connection.close()

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

        # Username received from frontend
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
            return jsonify({"error":"No image uploaded"}),400

        file = request.files["image"]

        if file.filename == "":
            return jsonify({"error":"No file selected"}),400

        # Read image
        img = Image.open(file).convert("RGB")

        # Resize
        img = img.resize((256,256))

        # Convert to array
        img = img_to_array(img)

        img = np.expand_dims(img, axis=0)

        # EfficientNet preprocessing
        img = tf.keras.applications.efficientnet.preprocess_input(img)

        # Prediction
        prediction = model.predict(img, verbose=0)

        index = np.argmax(prediction)

        confidence = float(np.max(prediction))

        disease = CLASS_NAMES[index]

        rec = recommendations[disease]

        return jsonify({

            "success":True,

            "disease":disease,

            "disease_kn":rec["kn"],

            "confidence":round(confidence*100,2),

            "recommendation_en":rec["en"],

            "recommendation_kn":rec["kn_rec"]

        })

    except Exception as e:

        return jsonify({
            "success":False,
            "error":str(e)
        }),500
           
if __name__ == "__main__":
    print("Step 5: Starting Flask...")
    

    test_database()

    app.run(
        host="127.0.0.1",
        port=5001,
        debug=True
    )