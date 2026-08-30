from dotenv import load_dotenv
load_dotenv()

import os
from groq import Groq

api_key = os.getenv("GROQ_API_KEY")

print("API key exists:", bool(api_key))
print("Key starts with:", api_key[:8] if api_key else "None")

client = Groq(api_key=api_key)

models = client.models.list()

for model in models.data:
    print(model.id)