// Arquivo: components/chat-interface.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Send, Trash2, Volume2, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import MicRecorder from "mic-recorder-to-mp3";

type Message = {
  id: number;
  text: string;
  sender: "user" | "ai";
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const recorder = useRef<MicRecorder | null>(null);
  const audioPlayer = useRef<HTMLAudioElement | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // A inicialização do gravador é mantida para o futuro
    recorder.current = new MicRecorder({ bitRate: 128 });
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSendText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage = { id: Date.now(), text: inputText, sender: "user" as const };
    setMessages((prev) => [...prev, userMessage]);

    const formData = new FormData();
    formData.append("text_input", inputText);

    setInputText("");
    setIsLoading(true);

    await fetchAndProcessResponse(formData);
  };

  // Função para iniciar/parar gravação e enviar áudio
  // Web Speech API para transcrição
  const recognitionRef = useRef<any>(null);
  const [transcript, setTranscript] = useState("");

  const handleMicClick = async () => {
    if (isRecording) {
      // Parar gravação e enviar texto transcrito
      setIsRecording(false);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (transcript.trim()) {
        const userMessage = { id: Date.now(), text: transcript, sender: "user" as const };
        setMessages((prev) => [...prev, userMessage]);
        const formData = new FormData();
        formData.append("text_input", transcript);
        setTranscript("");
        setInputText("");
        setIsLoading(true);
        await fetchAndProcessResponse(formData);
      }
    } else {
      // Iniciar gravação e transcrição
      setIsRecording(true);
      if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        alert('Seu navegador não suporta reconhecimento de voz. Use Chrome ou Edge.');
        setIsRecording(false);
        return;
      }
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'pt-BR';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.onresult = (event: any) => {
        let texto = "";
        let final = false;
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          texto += event.results[i][0].transcript;
          if (event.results[i].isFinal) final = true;
        }
        setTranscript(texto);
        setInputText(texto); // Atualiza o campo de input em tempo real
        // Se o resultado for final, envia automaticamente
        if (final && texto.trim()) {
          setIsRecording(false);
          const userMessage = { id: Date.now(), text: texto, sender: "user" as const };
          setMessages((prev) => [...prev, userMessage]);
          const formData = new FormData();
          formData.append("text_input", texto);
          setTranscript("");
          setInputText("");
          setIsLoading(true);
          fetchAndProcessResponse(formData);
        }
      };
      recognition.onerror = (event: any) => {
        console.error('Erro no reconhecimento de voz:', event.error);
        setIsRecording(false);
      };
      recognition.onend = () => {
        setIsRecording(false);
      };
      recognitionRef.current = recognition;
      recognition.start();
    }
  };

  const fetchAndProcessResponse = async (formData: FormData) => {
    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Falha na resposta da rede.");

      const data = await response.json();

      // Adiciona a resposta da IA somente se ela não for nula
      if (data.ai_text) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, text: data.ai_text, sender: "ai" },
        ]);
      } else {
         throw new Error("A IA não retornou uma resposta de texto.");
      }

      // ✅ AJUSTE PRINCIPAL: Só tenta tocar o áudio se ele for recebido
      if (data.ai_audio_base64 && audioPlayer.current) {
        const audioUrl = `data:audio/mpeg;base64,${data.ai_audio_base64}`;
        audioPlayer.current.src = audioUrl;
        audioPlayer.current.play();
      }

    } catch (error) {
      console.error("Erro ao se comunicar com o chatbot:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Desculpe, ocorreu um erro. Tente novamente.",
          sender: "ai",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="flex flex-col w-full max-w-2xl h-[70vh] bg-gray-900/50 backdrop-blur-sm border border-purple-700/50 rounded-lg shadow-2xl shadow-purple-500/20 text-white">
      <div className="p-4 border-b border-purple-700/50 flex justify-between items-center">
  <h2 className="text-xl font-bold text-purple-300">Assistente Virtual, Alice</h2>
        <div className="flex gap-2">
          <Button
            aria-label="Reproduzir 🔊"
            variant="ghost"
            size="icon"
            onClick={() => audioPlayer.current?.play()}
            disabled={!audioPlayer.current?.src || isPlaying}
          >
            <Volume2 className="h-5 w-5" />
          </Button>
          <Button
            aria-label="Limpar conversa"
            variant="ghost"
            size="icon"
            onClick={() => setMessages([])}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4 overflow-y-auto" ref={scrollAreaRef}>
        <div className="flex flex-col gap-4" style={{ minHeight: 0 }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-xl p-3 max-w-[80%] ${
                  msg.sender === "user" ? "bg-purple-600" : "bg-gray-800"
                }`}
                style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
              >
                <p className="text-sm" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-xl p-3 bg-gray-800 flex items-center gap-2">
                <LoaderCircle className="h-5 w-5 animate-spin" />
                <p className="text-sm">Pensando...</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-purple-700/50">
        <form onSubmit={handleSendText} className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Digite sua mensagem..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="bg-gray-800 border-purple-600 focus:ring-purple-500"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            disabled={!inputText.trim() || isLoading}
          >
            <Send className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Button
              aria-label={isRecording ? "Parar gravação" : "Microfone 🎙️"}
              type="button"
              size="icon"
              variant={isRecording ? "default" : "ghost"}
              onClick={handleMicClick}
              disabled={isLoading}
              className={isRecording ? "animate-pulse bg-purple-600 text-white" : ""}
            >
              <Mic className="h-5 w-5" />
            </Button>
            {isRecording && (
              <span className="text-purple-500 font-semibold animate-pulse">Gravando...</span>
            )}
          </div>
        </form>
      </div>

      <audio
        ref={audioPlayer}
        onPlay={() => setIsPlaying(true)}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
    </div>
  );
}