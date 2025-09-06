# Arquivo: backend/main.py

import os
from dotenv import load_dotenv
import google.generativeai as genai
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

# Carrega as variáveis de ambiente (sua chave da API do Google)
load_dotenv()

# Configura a API do Google
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

app = FastAPI()

# Configura o CORS
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


from fastapi.responses import JSONResponse
import base64

@app.post("/api/chat")
async def chat_handler(
    text_input: str = Form(None),
    audio_file: UploadFile = File(None)
):
    try:
        if not text_input and not audio_file:
            return JSONResponse(content={"error": "Nenhum texto ou áudio foi enviado"}, status_code=400)

        ai_response_text = None
        ai_audio_base64 = None

        # Se recebeu texto, processa normalmente
        if text_input:
            model = genai.GenerativeModel('gemini-2.5-pro')
            response = await model.generate_content_async(text_input)
            ai_response_text = response.text

        # Se recebeu áudio, salva e converte para base64 (exemplo simples)
        if audio_file:
            audio_bytes = await audio_file.read()
            ai_audio_base64 = base64.b64encode(audio_bytes).decode("utf-8")
            # Aqui você pode adicionar processamento de áudio, como transcrição ou resposta da IA

        print(f"Texto do usuário: {text_input}")
        print(f"Resposta da IA: {ai_response_text}")
        print(f"Áudio recebido: {bool(audio_file)}")

        return {
            "user_text": text_input,
            "ai_text": ai_response_text,
            "ai_audio_base64": ai_audio_base64
        }

    except Exception as e:
        print(f"Ocorreu um erro: {e}")
        return JSONResponse(content={"error": str(e)}, status_code=500)