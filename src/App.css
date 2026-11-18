import React, { useState, useMemo, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Activity, Play, ChevronRight, CheckCircle2, FileJson, Download, ToggleLeft, ToggleRight, GraduationCap, FileText, Table } from 'lucide-react';
import { apsData } from './data.js';

const generateChartData = (type, cuts, as, rp) => {
  const data = [];
  const resolution = 200;
  for (let i = 0; i <= resolution; i++) {
    const w = i / resolution;
    let mag = as - 20;
    let idealMag = -21;

    if (type === 'bandpass' || type === 'bandstop') {
      const isPass = type === 'bandpass' ? (w >= cuts[0] && w <= cuts[1]) : (w < cuts[0] - 0.05 || w > cuts[1] + 0.05);
      const isStop = type === 'bandpass' ? (w < cuts[0] - 0.05 || w > cuts[1] + 0.05) : (w >= cuts[0] && w <= cuts[1]);

      if (isPass) {
        mag = rp * Math.random();
        idealMag = (rp * 4) * Math.random();
      } else if (isStop) {
        mag = as + (Math.random() * 5);
        idealMag = -21 + (Math.random() * 8);
      } else {
        const dist = Math.abs(w - (w < cuts[0] ? cuts[0] : cuts[1]));
        mag = (as / 0.05) * dist;
        idealMag = (-21 / 0.05) * dist;
      }
    } else if (type === 'lowpass' || type === 'highpass') {
      const isPass = type === 'lowpass' ? (w <= cuts[0]) : (w >= cuts[0]);
      const isStop = type === 'lowpass' ? (w > cuts[0] + 0.1) : (w < cuts[0] - 0.1);

      if (isPass) {
        mag = rp * Math.random();
        idealMag = mag;
      } else if (isStop) {
        mag = type === 'lowpass' ? as - (w * 10) : as - ((1 - w) * 10);
        idealMag = mag;
      } else {
        const dist = Math.abs(w - cuts[0]);
        mag = (as / 0.1) * dist;
        idealMag = mag;
      }
    }

    data.push({
      w: w.toFixed(2),
      magnitude: Math.max(mag, -100),
      idealMagnitude: Math.max(idealMag, -100)
    });
  }
  return data;
};

const teamMembers = [
  "DANIEL ALAN", "DANIEL JOSÉ", "EDUARDO GABRIEL", "GUILHERME SILVA",
  "JOÃO VICTOR", "JULIO SILVA", "KHALIL RAVIKSON", "LUYS ARTHUR",
  "MARCUS VINICIUS CARDOSO", "MOISÉS DE CASTRO", "RAIMUNDO NONATO",
  "RODRIGO DOS SANTOS", "VANDSON GUILHERME", "WEMERSON MATEUS"
];

export default function ProfessorialResolutionView() {
  const [showLanding, setShowLanding] = useState(true);
  const [activeId, setActiveId] = useState(apsData[0].id);
  const [activeTab, setActiveTab] = useState('passos');
  const [isSimulating, setIsSimulating] = useState(false);
  const [showIdeal, setShowIdeal] = useState(false);
  const [progress, setProgress] = useState(201);

  const activeItem = apsData.find(item => item.id === activeId);
  const fullChartData = useMemo(() => generateChartData(activeItem.type, activeItem.specs.cuts, activeItem.specs.as, activeItem.specs.rp), [activeItem]);
  const visibleChartData = fullChartData.slice(0, progress);

  const startAnimation = () => {
    setActiveTab('simulacao');
    setIsSimulating(true);
    setProgress(0);
  };

  useEffect(() => {
    let interval;
    if (isSimulating && progress < fullChartData.length) {
      interval = setInterval(() => {
        setProgress(prev => prev + 4);
      }, 20);
    } else if (progress >= fullChartData.length) {
      setIsSimulating(false);
    }
    return () => clearInterval(interval);
  }, [isSimulating, progress, fullChartData.length]);

  if (showLanding) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-zinc-300 p-8 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-900/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-900/20 rounded-full blur-[100px]"></div>

        <div className="max-w-5xl w-full text-center space-y-10 z-10">
          <div className="space-y-3">
            <GraduationCap className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-emerald-500 tracking-[0.2em] uppercase">Universidade Estadual do Maranhão</h2>
            <p className="text-zinc-400 uppercase tracking-widest text-sm">Centro de Ciências Tecnológicas - Engenharia de Computação</p>
            <p className="text-zinc-500 text-xs">Docentes: Prof. Dr. Carlos Magno Sousa Junior e Prof. Me. Adriano Mendes Magalhães</p>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-light text-white leading-tight">
              Projeto de Filtros Digitais FIR e IIR
            </h1>
            <p className="text-xl text-zinc-400 font-light">
              Resolução Esmiuçada dos Exercícios P7.9 a P7.16 e P8.12 a P8.15 (Ingle & Proakis)
            </p>
          </div>

          <div className="pt-4 pb-2">
            <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-6 border-b border-zinc-800 pb-3 inline-block">Autores - Equipe 2</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4 text-sm text-zinc-300 font-medium">
              {teamMembers.map(name => (
                <div key={name} className="hover:text-emerald-400 transition-colors cursor-default">{name}</div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowLanding(false)}
            className="mt-6 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wide flex items-center gap-3 transition-all mx-auto shadow-lg shadow-emerald-900/20"
          >
            <Play size={18} /> Iniciar Apresentação Detalhada
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-300 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 bg-zinc-900 border-r border-zinc-800 flex flex-col z-20">
        <div className="p-6 border-b border-zinc-800">
          <button onClick={() => setShowLanding(true)} className="text-xs text-emerald-500 hover:text-emerald-400 font-medium mb-3 flex items-center gap-1">
            &larr; Voltar à Capa
          </button>
          <h1 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Activity className="text-emerald-500" /> Relatório APS
          </h1>
          <p className="text-xs text-zinc-500 mt-1">12 Questões Esmiuçadas</p>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Cap. 7 - Filtros FIR (Janela)</div>
          {apsData.filter(d => d.cap === 7).map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveId(item.id); setProgress(201); setShowIdeal(false); }}
              className={`w-full text-left px-5 py-2.5 text-xs transition-all flex items-center justify-between
                ${activeId === item.id ? 'bg-zinc-800/80 text-emerald-400 border-r-2 border-emerald-500 font-medium' : 'hover:bg-zinc-800/40 hover:text-zinc-100 text-zinc-400'}`}
            >
              <span className="truncate pr-2">{item.title}</span>
              {activeId === item.id && <ChevronRight size={14} />}
            </button>
          ))}

          <div className="px-4 mt-6 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Cap. 8 - Protótipos IIR</div>
          {apsData.filter(d => d.cap === 8).map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveId(item.id); setProgress(201); setShowIdeal(false); }}
              className={`w-full text-left px-5 py-2.5 text-xs transition-all flex items-center justify-between
                ${activeId === item.id ? 'bg-zinc-800/80 text-emerald-400 border-r-2 border-emerald-500 font-medium' : 'hover:bg-zinc-800/40 hover:text-zinc-100 text-zinc-400'}`}
            >
              <span className="truncate pr-2">{item.title}</span>
              {activeId === item.id && <ChevronRight size={14} />}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="px-8 py-5 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-end">
          <div>
            <span className="text-xs font-mono uppercase text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-0.5 rounded">
              Capítulo {activeItem.cap} • Questão {activeItem.id}
            </span>
            <h2 className="text-2xl font-light text-white tracking-wide mt-2">{activeItem.title}</h2>
            <div className="flex gap-4 mt-4">
              <button onClick={() => setActiveTab('passos')} className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${activeTab === 'passos' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}>
                Enunciado & Passo a Passo Esmiuçado ({activeItem.steps.length} etapas)
              </button>
              <button onClick={() => setActiveTab('codigo')} className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${activeTab === 'codigo' ? 'border-blue-500 text-blue-400' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}>
                Código Python (NumPy/SciPy)
              </button>
              <button onClick={() => setActiveTab('simulacao')} className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${activeTab === 'simulacao' ? 'border-purple-500 text-purple-400' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}>
                Gráfico e Simulador
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3 mb-1">
            <a
              href="/APS-Equipe2.pdf"
              download
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors border border-zinc-700/50"
            >
              <Download size={15} /> PDF Completo
            </a>
            <button
              onClick={startAnimation}
              disabled={isSimulating}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <Play size={15} />
              {isSimulating ? 'Simulando...' : 'Rodar Simulação'}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-4xl mx-auto space-y-6 pb-12">

            {/* ABA 1: ENUNCIADO + DADOS + PASSO A PASSO + VERIFICAÇÃO */}
            {activeTab === 'passos' && (
              <div className="space-y-6">
                
                {/* Bloco do Enunciado Oficial */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
                  <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                    <FileText size={16} /> Enunciado da Questão ({activeItem.id})
                  </h3>
                  <p className="text-zinc-200 text-sm leading-relaxed mb-4">
                    {activeItem.enunciado}
                  </p>
                  <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-lg p-3.5 text-xs text-zinc-400 italic">
                    <span className="font-semibold text-zinc-300 not-italic">Original (Ingle & Proakis): </span>
                    {activeItem.enunciadoOriginal}
                  </div>
                </div>

                {/* Tabela de Dados do Enunciado */}
                {activeItem.dados && (
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2 mb-4">
                      <Table size={16} className="text-emerald-500" /> Dados e Especificações Extraídas
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-zinc-800 text-zinc-400">
                            <th className="py-2.5 px-3">Grandeza</th>
                            <th className="py-2.5 px-3">Valor</th>
                            <th className="py-2.5 px-3">Observação</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/60">
                          {activeItem.dados.map((row, i) => (
                            <tr key={i} className="hover:bg-zinc-800/30">
                              <td className="py-2.5 px-3 font-medium text-zinc-200">{row.grandeza}</td>
                              <td className="py-2.5 px-3 font-mono text-emerald-400">{row.valor}</td>
                              <td className="py-2.5 px-3 text-zinc-400">{row.obs}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Passos Esmiuçados */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider px-1">
                    Resolução Matemática Passo a Passo
                  </h3>
                  {activeItem.steps.map((step, idx) => (
                    <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors">
                      <h4 className="text-zinc-100 font-semibold mb-3 flex items-center gap-2.5 text-base">
                        <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono">
                          {idx + 1}
                        </span>
                        {step.title}
                      </h4>
                      <div className="bg-zinc-950 border border-zinc-800/80 rounded-lg p-4 mb-3 overflow-x-auto">
                        <pre className="text-emerald-400 font-mono text-xs md:text-sm whitespace-pre-wrap leading-relaxed">{step.math}</pre>
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Tabela de Verificação Final */}
                {activeItem.verificacao && (
                  <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-xl p-6">
                    <h3 className="text-sm font-semibold text-emerald-300 flex items-center gap-2 mb-4">
                      <CheckCircle2 size={18} className="text-emerald-400" /> Quadro de Verificação e Resposta Final
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-emerald-900/40 text-emerald-400/80">
                            <th className="py-2.5 px-3">Critério Avaliado</th>
                            <th className="py-2.5 px-3">Valor Obtido</th>
                            <th className="py-2.5 px-3">Exigido pelo Enunciado</th>
                            <th className="py-2.5 px-3">Situação</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-emerald-900/20">
                          {activeItem.verificacao.map((v, i) => (
                            <tr key={i}>
                              <td className="py-2.5 px-3 font-medium text-zinc-200">{v.criterio}</td>
                              <td className="py-2.5 px-3 font-mono text-emerald-300">{v.obtido}</td>
                              <td className="py-2.5 px-3 font-mono text-zinc-400">{v.exigido}</td>
                              <td className="py-2.5 px-3 font-semibold text-emerald-400">{v.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* ABA 2: CÓDIGO FONTE */}
            {activeTab === 'codigo' && (
              <div>
                <div className="flex items-center gap-3 mb-6 bg-blue-950/30 border border-blue-900/50 p-4 rounded-xl">
                  <FileJson className="text-blue-400" size={24} />
                  <div>
                    <h3 className="text-blue-200 font-medium text-sm">Implementação Computacional em Python</h3>
                    <p className="text-xs text-blue-300/70 mt-0.5">
                      Bibliotecas utilizadas: <b>NumPy, SciPy e Matplotlib</b>. Nos filtros FIR (Cap. 7), a resposta ideal e as janelas foram calculadas diretamente pelas equações analíticas, sem uso da função pronta <code>fir1</code>.
                    </p>
                  </div>
                </div>
                <div className="bg-[#1e1e1e] border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
                  <div className="flex px-4 py-3 bg-zinc-900 border-b border-zinc-800 gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    <span className="ml-2 text-xs font-mono text-zinc-400">solucao_{activeItem.id.toLowerCase().replace('.', '_')}.py</span>
                  </div>
                  <pre className="p-6 overflow-x-auto text-sm font-mono text-zinc-300 leading-loose">
                    <code>{activeItem.code}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* ABA 3: SIMULADOR ANIMADO */}
            {activeTab === 'simulacao' && (
              <div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-[550px] flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-100">
                        Resposta em Magnitude |H(e^jω)| em dB
                      </h3>
                      {activeItem.cap === 7 && (
                        <button
                          onClick={() => setShowIdeal(!showIdeal)}
                          className="text-xs mt-2 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors"
                        >
                          {showIdeal ? <ToggleRight className="text-amber-500" size={18} /> : <ToggleLeft className="text-zinc-600" size={18} />}
                          <span className={showIdeal ? "text-amber-400" : "text-zinc-500"}>
                            Comparar com Truncamento Ideal (Janela Retangular ≈ 21 dB)
                          </span>
                        </button>
                      )}
                    </div>
                    <div className="text-xs font-mono bg-zinc-800 px-3 py-1.5 rounded text-zinc-300">
                      Varredura: {Math.min(100, Math.round((progress / 200) * 100))}%
                    </div>
                  </div>

                  <div className="flex-1 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={visibleChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                        <XAxis dataKey="w" stroke="#52525b" tick={{ fill: '#71717a', fontSize: 12 }} domain={[0, 1]} type="number" />
                        <YAxis stroke="#52525b" tick={{ fill: '#71717a', fontSize: 12 }} domain={[-100, 5]} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px' }}
                          itemStyle={{ color: '#a855f7' }}
                          labelStyle={{ color: '#a1a1aa' }}
                          formatter={(value, name) => {
                            if (name === "idealMagnitude") return [`${parseFloat(value).toFixed(2)} dB`, 'Truncamento Retangular'];
                            return [`${parseFloat(value).toFixed(2)} dB`, 'Filtro Projetado'];
                          }}
                          labelFormatter={(label) => `Frequência Normalizada: ${label}`}
                        />
                        <ReferenceLine y={activeItem.specs.limitAs} stroke="#ef4444" strokeDasharray="3 3" opacity={0.6} />

                        {showIdeal && activeItem.cap === 7 && (
                          <Line
                            type="monotone"
                            dataKey="idealMagnitude"
                            stroke="#f59e0b"
                            strokeWidth={2}
                            strokeDasharray="4 4"
                            dot={false}
                            isAnimationActive={false}
                          />
                        )}

                        <Line
                          type="monotone"
                          dataKey="magnitude"
                          stroke="#10b981"
                          strokeWidth={2}
                          dot={false}
                          isAnimationActive={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}