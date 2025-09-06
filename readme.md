# Assistente Virtual com IA e Reconhecimento de Voz

![Next.js](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white)

---

### Índice
- [🎬 Demonstração](#-demonstração)
- [📖 Sobre o Projeto](#-sobre-o-projeto)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [🚀 Como Executar o Projeto](#-como-executar-o-projeto)
- [🎥 Como Adicionar seu Vídeo](#-como-adicionar-seu-vídeo)

---

## 🎬 Demonstração

(Aqui você pode colocar um GIF animado de alta qualidade mostrando o chatbot em funcionamento).

![Demonstração do Chatbot](chatbot-portugues - Copia/assets/2025-09-05 20-47-52.mp4)

---

## 📖 Sobre o Projeto

Este é um protótipo de um site com uma interface de chatbot futurista, projetado para interagir com uma Inteligência Artificial através de texto e voz. O projeto combina um frontend moderno e reativo com um backend robusto em Python para processar as requisições de IA.

O objetivo é criar uma experiência de usuário imersiva e intuitiva, onde a conversa com a IA é complementada por elementos visuais, como um assistente 3D e um fundo com partículas animadas.

### ✨ Funcionalidades
- **Interface Interativa:** Construída com Next.js e Tailwind CSS para um visual moderno e responsivo.
- **Assistente 3D:** Um modelo de esfera renderizado com React Three Fiber que reage sutilmente.
- **Comunicação Multimodal:** Suporte para entrada de texto via teclado. A base para entrada de voz está implementada.
- **Respostas Inteligentes:** O backend utiliza a API do Google Gemini para processar as entradas e gerar respostas coesas.

---

## 🛠️ Tecnologias Utilizadas

As principais tecnologias usadas neste projeto foram:

| Frontend | Backend |
| --- | --- |
| Next.js | Python 3.8+ |
| React 18 | FastAPI |
| TypeScript | Google Generative AI |
| Tailwind CSS | Uvicorn |
| shadcn/ui | |
| React Three Fiber | |

---

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e rodar o projeto em sua máquina local.

### Pré-requisitos
Antes de começar, garanta que você tenha o seguinte instalado:
- **Node.js:** (versão 18.17 ou superior)
- **Python:** (versão 3.8 ou superior)
- **Chave de API do Google AI:** Essencial para o funcionamento da IA. Obtenha a sua no [Google AI Studio](https://aistudio.google.com/app/apikey).

### Passo a Passo

**1. Clone o Repositório (se aplicável)**
Se o projeto estiver no GitHub, o primeiro passo é clonar o repositório.
```bash
git clone [https://github.com/telesvfx/assistente_virtual.git](https://github.com/telesvfx/assistente_virtual.git)
cd assistente_virtual

# 1. Navegue até a pasta do backend
cd backend

# 2. Crie um ambiente virtual para isolar as dependências
python -m venv venv

# 3. Ative o ambiente virtual (no Windows PowerShell)
.\venv\Scripts\Activate.ps1

# 4. Instale as bibliotecas Python necessárias
pip install -r requirements.txt

# 5. Crie e configure sua chave de API
# Crie um arquivo chamado ".env" e cole a linha abaixo, substituindo pelo seu valor.
GOOGLE_API_KEY="SUA_CHAVE_DO_GOOGLE_AI_AQUI"

# Na pasta raiz do projeto, instale todos os pacotes do Node.js
npm install

