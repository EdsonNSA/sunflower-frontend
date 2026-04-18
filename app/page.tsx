import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Sun, 
  MapPin, 
  Zap, 
  BarChart3, 
  Clock, 
  ArrowUpRight,
  Wind,
  Thermometer,
  CloudSun
} from "lucide-react"; // Usaremos Lucide para ícones modernos

export default function SunflowerDashboard() {
  return (
    <main className="max-w-7xl mx-auto p-6 md:p-8 space-y-6 bg-sun-bg min-h-screen">
      
      {/* ── Topbar ── */}
      <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-black/10 pb-5 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-sun-green-600 rounded-full flex items-center justify-center text-sun-amber-400">
            <Sun size={32} fill="currentColor" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight font-nunito text-sun-text">Sunflower</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Análise de Viabilidade Solar</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-black/10 px-3 py-1.5 rounded-full text-xs text-muted-foreground">
            <div className="w-1.5 h-1.5 bg-sun-green-400 rounded-full animate-pulse" />
            Coletando dados
          </div>
          <div className="bg-white border border-black/10 px-3 py-1.5 rounded-full text-xs text-muted-foreground">
            17 abr 2026 · 11:42
          </div>
        </div>
      </header>

      {/* ── Location Bar ── */}
      <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-black/10 text-xs text-muted-foreground">
        <MapPin size={14} className="text-sun-green-400" />
        <span className="font-semibold text-sun-text">Belo Jardim, PE, Brasil</span>
        <span className="opacity-40">|</span> lat -8.33° <span className="opacity-40">|</span> lon -36.42°
        <span className="ml-auto bg-sun-green-50 text-sun-green-600 px-2 py-0.5 rounded-full font-medium">
          Semiárido nordestino
        </span>
      </div>

      {/* ── Verdict Card ── */}
      <Card className="border-black/10 shadow-sm overflow-hidden">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-sun-green-600 rounded-full flex items-center justify-center text-sun-green-50">
             <Zap size={32} fill="currentColor" />
          </div>
          <div className="flex-1 space-y-1 text-center md:text-left">
            <h2 className="text-xl font-extrabold font-nunito text-sun-text">Ótimo para instalação solar!</h2>
            <p className="text-sm text-muted-foreground max-w-md">
              Esta região apresenta alta irradiação e ângulos favoráveis. O Sunflower garante o aproveitamento máximo desse potencial.
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-5xl font-extrabold font-nunito text-sun-green-600">84</span>
            <span className="text-[10px] uppercase tracking-tighter text-muted-foreground">viabilidade / 100</span>
            <div className="w-32 h-1.5 bg-black/5 rounded-full overflow-hidden">
              <div className="bg-sun-green-400 h-full w-[84%]" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── KPI Grid ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Energia hoje", val: "6.4", unit: "kWh/m²", delta: "+12%", warn: false },
          { label: "Irradiação Pico", val: "891", unit: "W/m²", delta: "Alta", warn: false },
          { label: "Sol Pleno", val: "9.1", unit: "Horas", delta: "Acima da média", warn: false },
          { label: "Eficiência", val: "94%", unit: "Rastreio Ativo", delta: "Biaxial", warn: false },
        ].map((kpi, i) => (
          <div key={i} className="bg-white/50 border border-black/5 p-4 rounded-xl space-y-1">
            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{kpi.label}</p>
            <h3 className="text-2xl font-bold text-sun-text">{kpi.val}</h3>
            <p className="text-[10px] text-muted-foreground">{kpi.unit}</p>
            <p className="text-[10px] font-bold text-sun-green-600 mt-2">{kpi.delta}</p>
          </div>
        ))}
      </div>

    </main>
  );
}