// Arquivo: app/page.tsx

import { AnimatedParticles } from '@/components/animated-particles';
import { AssistantModel } from '@/components/assistant-model';
import { ChatInterface } from '@/components/chat-interface';

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gray-950 p-4 md:p-8">
      {/* Fundo de partículas animadas */}
    <div className="absolute inset-0 z-0">
  <AnimatedParticles />
</div>
      {/* Container principal que alinha o modelo e o chat */}
      <div className="z-10 flex w-full max-w-7xl flex-col items-center justify-center gap-8 md:flex-row">

        {/* Coluna para o modelo 3D */}
        <div className="flex h-64 w-full items-center justify-center md:h-[70vh] md:w-1/2">
          <AssistantModel />
        </div>

        {/* Coluna para a interface de chat */}
        <div className="flex w-full items-center justify-center md:w-1/2">
          <ChatInterface />
        </div>

      </div>
    </main>
  );
}