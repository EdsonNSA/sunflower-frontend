"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Clock, TrendingUp, Sun, PiggyBank, Zap } from "lucide-react";

export default function SimuladorDashboard() {
  // Estados interativos baseados em CAPTAÇÃO REAL
  const [geracaoMensalkWh, setGeracaoMensalkWh] = useState<number>(400); // kWh gerados por mês
  const [tarifaEnergia, setTarifaEnergia] = useState<number>(0.95); // Preço do kWh em R$
  const [custoSistema, setCustoSistema] = useState<number>(18000);
  const [inflacaoEnergia, setInflacaoEnergia] = useState<number>(8); // % ao ano

  // Cálculos da simulação: Economia baseada no que foi gerado x valor da tarifa
  const economiaMensal = geracaoMensalkWh * tarifaEnergia; 
  const economiaAnual = economiaMensal * 12;
  
  // Payback (em anos e meses)
  const paybackMeses = custoSistema / economiaMensal;
  const paybackAnos = Math.floor(paybackMeses / 12);
  const paybackMesesRestantes = Math.ceil(paybackMeses % 12);

  // Projeção de ROI em 20 anos (vida útil média das placas), considerando inflação na conta de luz
  let economiaAcumulada20Anos = 0;
  let valorContaComInflacao = economiaAnual;
  
  for (let i = 0; i < 20; i++) {
    economiaAcumulada20Anos += valorContaComInflacao;
    valorContaComInflacao += valorContaComInflacao * (inflacaoEnergia / 100);
  }
  
  const lucroLiquido20Anos = economiaAcumulada20Anos - custoSistema;

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-800">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Cabeçalho */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-200 shadow-sm">
            <Calculator size={26} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Simulador de Economia</h1>
            <p className="text-slate-500">Projete seu retorno sobre investimento (ROI) de energia solar</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Painel de Controles (Inputs) */}
          <Card className="col-span-1 border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-100/50 border-b border-slate-100">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sun className="text-amber-500" size={20} />
                Parâmetros do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-7">
              
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 flex justify-between">
                  <span>Captação Solar Mensal</span>
                  <span className="text-emerald-600 font-bold">{geracaoMensalkWh} kWh</span>
                </label>
                <input 
                  type="range" 
                  min="100" 
                  max="3000" 
                  step="50"
                  value={geracaoMensalkWh} 
                  onChange={(e) => setGeracaoMensalkWh(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 flex justify-between">
                  <span>Tarifa de Energia (Concessionária)</span>
                  <span className="text-yellow-600 font-bold">R$ {tarifaEnergia.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/kWh</span>
                </label>
                <input 
                  type="range" 
                  min="0.40" 
                  max="2.00" 
                  step="0.01"
                  value={tarifaEnergia} 
                  onChange={(e) => setTarifaEnergia(Number(e.target.value))}
                  className="w-full accent-yellow-500"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 flex justify-between">
                  <span>Custo Estimado do Sistema</span>
                  <span className="text-blue-600 font-bold">R$ {custoSistema.toLocaleString('pt-BR')}</span>
                </label>
                <input 
                  type="range" 
                  min="5000" 
                  max="100000" 
                  step="1000"
                  value={custoSistema} 
                  onChange={(e) => setCustoSistema(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 flex justify-between">
                  <span>Inflação da Energia (Anual)</span>
                  <span className="text-orange-500 font-bold">{inflacaoEnergia}%</span>
                </label>
                <input 
                  type="range" 
                  min="2" 
                  max="15" 
                  step="1"
                  value={inflacaoEnergia} 
                  onChange={(e) => setInflacaoEnergia(Number(e.target.value))}
                  className="w-full accent-orange-400"
                />
              </div>

            </CardContent>
          </Card>

          {/* Painel de Resultados */}
          <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Card Economia Anual */}
            <Card className="border-emerald-200 bg-emerald-50/30 shadow-sm">
              <CardContent className="p-6 flex flex-col justify-center h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full">
                    <PiggyBank size={24} />
                  </div>
                  <h3 className="font-semibold text-emerald-900">Economia no 1º Ano</h3>
                </div>
                <p className="text-4xl font-bold text-emerald-700">
                  R$ {economiaAnual.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                </p>
                <p className="text-sm text-emerald-600/80 mt-2 flex items-center gap-1">
                  <Zap size={14} />
                  Baseado na captação de {geracaoMensalkWh} kWh/mês.
                </p>
              </CardContent>
            </Card>

            {/* Card Tempo de Payback */}
            <Card className="border-blue-200 bg-blue-50/30 shadow-sm">
              <CardContent className="p-6 flex flex-col justify-center h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                    <Clock size={24} />
                  </div>
                  <h3 className="font-semibold text-blue-900">Tempo de Payback</h3>
                </div>
                <p className="text-4xl font-bold text-blue-700">
                  {paybackAnos} anos {paybackMesesRestantes > 0 && `e ${paybackMesesRestantes} meses`}
                </p>
                <p className="text-sm text-blue-600/80 mt-2">
                  Tempo para o sistema se pagar.
                </p>
              </CardContent>
            </Card>

            {/* Card ROI 20 anos (Ocupa 2 colunas) */}
            <Card className="col-span-1 md:col-span-2 border-indigo-200 bg-indigo-50/30 shadow-sm">
              <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full">
                      <TrendingUp size={24} />
                    </div>
                    <h3 className="font-semibold text-indigo-900">Lucro Líquido (20 Anos)</h3>
                  </div>
                  <p className="text-4xl font-bold text-indigo-700">
                    R$ {lucroLiquido20Anos.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-sm text-indigo-600/80 mt-2">
                    Economia total subtraída do custo inicial do sistema.
                  </p>
                </div>
                
                {/* Minigráfico estático ilustrativo */}
                <div className="w-full sm:w-1/3 h-24 bg-white/50 rounded-xl border border-indigo-100 flex items-end p-2 gap-1 justify-center">
                  {[20, 35, 45, 60, 75, 90, 100].map((h, i) => (
                    <div key={i} className="w-6 bg-indigo-400 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}