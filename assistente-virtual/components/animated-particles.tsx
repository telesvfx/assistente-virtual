"use client"

export function AnimatedParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className={`particle absolute rounded-full ${
            i % 3 === 0 ? "w-1 h-1 bg-primary/30" : i % 3 === 1 ? "w-2 h-2 bg-accent/25" : "w-1.5 h-1.5 bg-primary/20"
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 6}s`,
          }}
        />
      ))}

      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={`orb-${i}`}
          className={`particle absolute rounded-full glow-pulse ${
            i % 2 === 0 ? "w-6 h-6 bg-accent/15" : "w-4 h-4 bg-primary/20"
          }`}
          style={{
            left: `${15 + Math.random() * 70}%`,
            top: `${15 + Math.random() * 70}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${8 + Math.random() * 4}s`,
            filter: "blur(0.5px)",
            boxShadow: i % 2 === 0 ? "0 0 20px rgba(179, 102, 247, 0.4)" : "0 0 15px rgba(168, 85, 247, 0.3)",
          }}
        />
      ))}

      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={`geo-${i}`}
          className="particle absolute geometric-spin"
          style={{
            left: `${25 + Math.random() * 50}%`,
            top: `${25 + Math.random() * 50}%`,
            width: "8px",
            height: "8px",
            background: "linear-gradient(45deg, rgba(168, 85, 247, 0.3), rgba(179, 102, 247, 0.2))",
            clipPath:
              i % 2 === 0
                ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                : "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
          }}
        />
      ))}

      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 30% 70%, rgba(168, 85, 247, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(179, 102, 247, 0.08) 0%, transparent 50%)",
        }}
      />
    </div>
  )
}
