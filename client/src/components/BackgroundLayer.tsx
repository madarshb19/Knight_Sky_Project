import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Domain } from "@shared/schema";

interface BackgroundLayerProps {
  domain?: Domain;
}

export default function BackgroundLayer({ domain }: BackgroundLayerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const getBackgroundSvg = () => {
    if (domain === "astrophysics") {
      return (
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 1000"
        >
          {/* Generate random stars */}
          {Array.from({ length: 200 }).map((_, i) => {
            const x = Math.random() * 1000;
            const y = Math.random() * 1000;
            const radius = Math.random() * 2 + 1;
            const opacity = Math.random() * 0.7 + 0.3;
            
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={radius}
                fill="#fff"
                opacity={opacity}
              />
            );
          })}
          
          {/* Add some nebulae/galaxies */}
          <ellipse
            cx="300"
            cy="200"
            rx="200"
            ry="100"
            fill="url(#astrophysicsGradient1)"
            opacity="0.4"
          />
          <ellipse
            cx="700"
            cy="700"
            rx="150"
            ry="120"
            fill="url(#astrophysicsGradient2)"
            opacity="0.3"
          />
          <ellipse
            cx="850"
            cy="300"
            rx="100"
            ry="80"
            fill="url(#astrophysicsGradient3)"
            opacity="0.25"
          />
          
          {/* Gradients */}
          <defs>
            <radialGradient id="astrophysicsGradient1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="astrophysicsGradient2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#4338ca" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="astrophysicsGradient3" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      );
    } else if (domain === "biology") {
      return (
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 1000"
        >
          {/* DNA Helix */}
          <path
            d="M300,100 Q500,200 300,300 Q100,400 300,500 Q500,600 300,700 Q100,800 300,900"
            fill="none"
            stroke="#059669"
            strokeWidth="3"
            opacity="0.4"
          />
          <path
            d="M500,100 Q300,200 500,300 Q700,400 500,500 Q300,600 500,700 Q700,800 500,900"
            fill="none"
            stroke="#059669"
            strokeWidth="3"
            opacity="0.4"
          />
          
          {/* DNA Rungs */}
          {Array.from({ length: 12 }).map((_, i) => {
            const y = 100 + i * 70;
            return (
              <line
                key={i}
                x1="300"
                y1={y}
                x2="500"
                y2={y}
                stroke="#10b981"
                strokeWidth="2"
                opacity="0.4"
              />
            );
          })}
          
          {/* Cell Patterns */}
          {Array.from({ length: 15 }).map((_, i) => {
            const cx = 100 + Math.random() * 800;
            const cy = 100 + Math.random() * 800;
            const r = 20 + Math.random() * 40;
            
            return (
              <circle
                key={`cell-${i}`}
                cx={cx}
                cy={cy}
                r={r}
                fill="url(#biologyGradient)"
                opacity="0.2"
              />
            );
          })}
          
          {/* Gradients */}
          <defs>
            <radialGradient id="biologyGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      );
    } else if (domain === "humanities") {
      return (
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 1000"
        >
          {/* Ancient texts pattern */}
          {Array.from({ length: 20 }).map((_, i) => {
            const y = 50 + i * 50;
            return (
              <g key={i}>
                <line
                  x1="200"
                  y1={y}
                  x2="800"
                  y2={y}
                  stroke="#d97706"
                  strokeWidth="1"
                  opacity="0.3"
                />
                {Array.from({ length: 20 }).map((_, j) => {
                  const x = 220 + j * 30;
                  const height = 5 + Math.random() * 10;
                  return (
                    <rect
                      key={`text-${i}-${j}`}
                      x={x}
                      y={y - height / 2}
                      width="15"
                      height={height}
                      rx="2"
                      fill="#ea580c"
                      opacity="0.2"
                    />
                  );
                })}
              </g>
            );
          })}
          
          {/* Ancient artifacts/symbols */}
          <circle cx="200" cy="200" r="50" stroke="#ea580c" strokeWidth="2" fill="none" opacity="0.3" />
          <polygon points="700,200 730,270 770,270 740,310 750,380 700,340 650,380 660,310 630,270 670,270" 
            stroke="#ea580c" strokeWidth="2" fill="none" opacity="0.3" />
          <rect x="300" y="600" width="100" height="100" stroke="#ea580c" strokeWidth="2" fill="none" opacity="0.3" />
          <ellipse cx="600" cy="650" rx="60" ry="40" stroke="#ea580c" strokeWidth="2" fill="none" opacity="0.3" />
          
          {/* Gradients */}
          <defs>
            <radialGradient id="humanitiesGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      );
    } else {
      // Default background with mixed elements
      return (
        <svg
          className="absolute inset-0 w-full h-full opacity-15"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 1000"
        >
          {/* Stars for astrophysics */}
          {Array.from({ length: 100 }).map((_, i) => {
            const x = Math.random() * 1000;
            const y = Math.random() * 1000;
            const radius = Math.random() * 1.5 + 0.5;
            
            return (
              <circle
                key={`star-${i}`}
                cx={x}
                cy={y}
                r={radius}
                fill="#fff"
                opacity="0.5"
              />
            );
          })}
          
          {/* DNA pattern for biology */}
          <path
            d="M100,300 Q200,350 100,400 Q0,450 100,500"
            fill="none"
            stroke="#059669"
            strokeWidth="2"
            opacity="0.3"
          />
          <path
            d="M200,300 Q100,350 200,400 Q300,450 200,500"
            fill="none"
            stroke="#059669"
            strokeWidth="2"
            opacity="0.3"
          />
          
          {/* Ancient text for humanities */}
          {Array.from({ length: 5 }).map((_, i) => {
            const y = 700 + i * 20;
            return (
              <line
                key={`text-line-${i}`}
                x1="600"
                y1={y}
                x2="900"
                y2={y}
                stroke="#d97706"
                strokeWidth="1"
                opacity="0.3"
              />
            );
          })}
          
          {/* Shared gradients */}
          <defs>
            <linearGradient id="mixedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0.7" />
            </linearGradient>
          </defs>
        </svg>
      );
    }
  };

  return (
    <motion.div
      className="fixed inset-0 w-full h-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className={`absolute inset-0 ${domain === "astrophysics" ? "bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950" : 
        domain === "biology" ? "bg-gradient-to-b from-emerald-950 via-teal-950 to-slate-950" : 
        domain === "humanities" ? "bg-gradient-to-b from-amber-950 via-orange-950 to-slate-950" : 
        "bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950"}`}>
      </div>
      {getBackgroundSvg()}
    </motion.div>
  );
}
