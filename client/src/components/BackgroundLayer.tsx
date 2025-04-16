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
    } else if (domain === "quantum") {
      return (
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 1000"
        >
          {/* Quantum circuit grid */}
          {Array.from({ length: 10 }).map((_, i) => {
            const y = 100 + i * 80;
            return (
              <g key={`quantum-row-${i}`}>
                <line
                  x1="100"
                  y1={y}
                  x2="900"
                  y2={y}
                  stroke="#1e293b"
                  strokeWidth="2"
                  opacity="0.5"
                />
                {Array.from({ length: 10 }).map((_, j) => {
                  const x = 100 + j * 80;
                  return (
                    <circle
                      key={`quantum-node-${i}-${j}`}
                      cx={x}
                      cy={y}
                      r="6"
                      fill="#3b82f6"
                      opacity="0.6"
                    />
                  );
                })}
              </g>
            );
          })}
          
          {/* Quantum entanglement lines */}
          {Array.from({ length: 15 }).map((_, i) => {
            const x1 = 100 + Math.floor(Math.random() * 10) * 80;
            const y1 = 100 + Math.floor(Math.random() * 10) * 80;
            const x2 = 100 + Math.floor(Math.random() * 10) * 80;
            const y2 = 100 + Math.floor(Math.random() * 10) * 80;
            
            return (
              <path
                key={`entangle-${i}`}
                d={`M${x1},${y1} C${(x1+x2)/2},${y1} ${(x1+x2)/2},${y2} ${x2},${y2}`}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="1.5"
                opacity="0.3"
                strokeDasharray="5,5"
              />
            );
          })}
          
          {/* Bloch spheres */}
          {Array.from({ length: 3 }).map((_, i) => {
            const cx = 250 + i * 250;
            const cy = 500;
            return (
              <g key={`bloch-${i}`}>
                <circle
                  cx={cx}
                  cy={cy}
                  r="60"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <ellipse
                  cx={cx}
                  cy={cy}
                  rx="60"
                  ry="20"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <line
                  x1={cx}
                  y1={cy-60}
                  x2={cx}
                  y2={cy+60}
                  stroke="#1e293b"
                  strokeWidth="1"
                  opacity="0.4"
                />
              </g>
            );
          })}
          
          {/* Gradients */}
          <defs>
            <radialGradient id="quantumGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      );
    } else if (domain === "finance") {
      return (
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 1000"
        >
          {/* Stock chart pattern */}
          <polyline
            points="100,500 150,480 200,520 250,490 300,550 350,530 400,600 450,580 500,650 550,630 600,700 650,680 700,730 750,700 800,750 850,720 900,770"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="3"
            opacity="0.5"
          />
          
          <polyline
            points="100,600 150,620 200,590 250,610 300,580 350,600 400,570 450,590 500,560 550,580 600,550 650,570 700,540 750,560 800,530 850,550 900,520"
            fill="none"
            stroke="#22c55e"
            strokeWidth="3"
            opacity="0.5"
          />
          
          {/* Candlestick patterns */}
          {Array.from({ length: 20 }).map((_, i) => {
            const x = 100 + i * 40;
            const open = 300 + Math.random() * 100;
            const close = 300 + Math.random() * 100;
            const high = Math.min(open, close) - 10 - Math.random() * 30;
            const low = Math.max(open, close) + 10 + Math.random() * 30;
            const color = open > close ? "#ef4444" : "#22c55e";
            
            return (
              <g key={`candle-${i}`}>
                <line
                  x1={x}
                  y1={high}
                  x2={x}
                  y2={low}
                  stroke={color}
                  strokeWidth="1"
                  opacity="0.5"
                />
                <rect
                  x={x-5}
                  y={Math.min(open, close)}
                  width="10"
                  height={Math.abs(close - open)}
                  fill={color}
                  opacity="0.5"
                />
              </g>
            );
          })}
          
          {/* Currency symbols */}
          <text x="200" y="200" fontSize="40" fill="#60a5fa" opacity="0.3">$</text>
          <text x="300" y="250" fontSize="40" fill="#60a5fa" opacity="0.3">€</text>
          <text x="400" y="200" fontSize="40" fill="#60a5fa" opacity="0.3">£</text>
          <text x="500" y="250" fontSize="40" fill="#60a5fa" opacity="0.3">¥</text>
          <text x="600" y="200" fontSize="40" fill="#60a5fa" opacity="0.3">₿</text>
          
          {/* Gradients */}
          <defs>
            <linearGradient id="financeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      );
    } else if (domain === "kaggle") {
      return (
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 1000"
        >
          {/* Data points scatter plot */}
          {Array.from({ length: 200 }).map((_, i) => {
            const x = 100 + Math.random() * 800;
            const y = 100 + Math.random() * 800;
            const r = 2 + Math.random() * 5;
            const opacity = 0.3 + Math.random() * 0.4;
            const fill = ["#0ea5e9", "#0284c7", "#0369a1"][Math.floor(Math.random() * 3)];
            
            return (
              <circle
                key={`data-point-${i}`}
                cx={x}
                cy={y}
                r={r}
                fill={fill}
                opacity={opacity}
              />
            );
          })}
          
          {/* Clustering circles */}
          {Array.from({ length: 5 }).map((_, i) => {
            const cx = 150 + Math.random() * 700;
            const cy = 150 + Math.random() * 700;
            const r = 50 + Math.random() * 100;
            
            return (
              <circle
                key={`cluster-${i}`}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="1.5"
                strokeDasharray="5,5"
                opacity="0.4"
              />
            );
          })}
          
          {/* Axes */}
          <line x1="100" y1="900" x2="900" y2="900" stroke="#0ea5e9" strokeWidth="2" opacity="0.5" />
          <line x1="100" y1="100" x2="100" y2="900" stroke="#0ea5e9" strokeWidth="2" opacity="0.5" />
          
          {/* Kaggle K icon */}
          <path
            d="M500,300 L500,500 L600,600 M500,500 L600,400"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="8"
            opacity="0.4"
          />
          
          {/* Gradients */}
          <defs>
            <radialGradient id="kaggleGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
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
      <div className={`absolute inset-0 ${
        domain === "astrophysics" ? "bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950" : 
        domain === "biology" ? "bg-gradient-to-b from-emerald-950 via-teal-950 to-slate-950" : 
        domain === "humanities" ? "bg-gradient-to-b from-amber-950 via-orange-950 to-slate-950" : 
        domain === "quantum" ? "bg-gradient-to-b from-gray-50 via-slate-100 to-white" : 
        domain === "finance" ? "bg-gradient-to-b from-blue-950 via-blue-900 to-slate-950" : 
        domain === "kaggle" ? "bg-gradient-to-b from-sky-800 via-sky-700 to-slate-950" : 
        "bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950"
      }`}>
      </div>
      {getBackgroundSvg()}
    </motion.div>
  );
}
