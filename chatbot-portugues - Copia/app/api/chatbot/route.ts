// Arquivo: app/api/chatbot/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
try {
    const formData = await req.formData();

    // O endereço do seu backend Python que está rodando localmente
    const backendUrl = 'http://127.0.0.1:8000/api/chat';

    // Repassa a requisição para o backend
    const response = await fetch(backendUrl, {
    method: 'POST',
    body: formData,
    });

    if (!response.ok) {
    const errorData = await response.json();
    return NextResponse.json({ error: errorData.error || 'Erro no backend' }, { status: response.status });
    }

    // Devolve a resposta do backend para o nosso chat
    const data = await response.json();
    return NextResponse.json(data);

} catch (error) {
    console.error('Erro na rota de API do Next.js:', error);
    return NextResponse.json({ error: 'Erro interno no servidor Next.js' }, { status: 500 });
}
}