// src/dataFir.js

export const firData = [
    {
      id: 'P7.9',
      cap: 7,
      title: 'P7.9 - Passa-faixa FIR com janela de Hann',
      type: 'bandpass',
      enunciado: 'Projete um filtro passa-faixa de fase linear usando a técnica de projeto com a janela de Hann. As especificações são: borda inferior da faixa de rejeição: 0.2π, As = 40 dB; borda superior da faixa de rejeição: 0.75π; borda inferior da faixa de passagem: 0.35π, Rp = 0.25 dB; borda superior da faixa de passagem: 0.55π. Trace a resposta ao impulso e a resposta em magnitude (em dB) do filtro projetado. Não use a função fir1.',
      enunciadoOriginal: 'Design a linear-phase bandpass filter using the Hann window design technique. The specifications are: lower stopband edge: 0.2π, As = 40 dB; upper stopband edge: 0.75π; lower passband edge: 0.35π, Rp = 0.25 dB; upper passband edge: 0.55π. Plot the impulse response and the magnitude response (in dB) of the designed filter. Do not use the fir1 function.',
      dados: [
        { grandeza: 'Rejeição inferior', valor: '0 ≤ ω ≤ 0.2π', obs: 'Faixa a ser atenuada (|H| ≤ 0.01)' },
        { grandeza: 'Passagem', valor: '0.35π ≤ ω ≤ 0.55π', obs: 'Faixa a ser preservada (0.9716 ≤ |H| ≤ 1)' },
        { grandeza: 'Rejeição superior', valor: '0.75π ≤ ω ≤ π', obs: 'Faixa a ser atenuada (|H| ≤ 0.01)' },
        { grandeza: 'Rp', valor: '0.25 dB', obs: 'Ondulação máxima na passagem' },
        { grandeza: 'As', valor: '40 dB', obs: 'Atenuação mínima nas rejeições' },
        { grandeza: 'Método', valor: 'Janela de Hann, sem fir1', obs: 'Imposto pelo enunciado' }
      ],
      specs: { as: -44.05, rp: -0.103, cuts: [0.275, 0.65], limitAs: -40 },
      steps: [
        {
          title: 'Passo 1 - Traduzir especificações e entender o método',
          math: 'Passagem (0.35π a 0.55π): Rp = 0.25 dB ⇒ |H| entre 1 e 10^(-0.25/20) = 0.9716\nRejeição (0 a 0.2π e 0.75π a π): As = 40 dB ⇒ |H| ≤ 10^(-40/20) = 0.01\nh(n) = hd(n) · w(n)   com   α = (M - 1) / 2',
          desc: 'O filtro ideal tem resposta ao impulso infinita. O método trunca essa resposta em M amostras e a multiplica por uma janela suave para reduzir o fenômeno de Gibbs. Com h(n) simétrico em torno de α, garante-se fase linear.'
        },
        {
          title: 'Passo 2 - Determinar a largura de transição (Δω)',
          math: 'Δω1 = ωp1 - ωs1 = 0.35π - 0.20π = 0.15π\nΔω2 = ωs2 - ωp2 = 0.75π - 0.55π = 0.20π\nΔω = min(0.15π, 0.20π) = 0.15π',
          desc: 'A especificação possui duas transições de larguras diferentes. Como a janela produz a mesma largura de transição nas duas bordas, adota-se a mais estreita (0.15π).'
        },
        {
          title: 'Passo 3 - Posicionar as frequências de corte (ωc1 e ωc2)',
          math: 'ωc1 = (0.20π + 0.35π) / 2 = 0.55π / 2 = 0.275π\nωc2 = (0.55π + 0.75π) / 2 = 1.30π / 2 = 0.65π',
          desc: 'Cada frequência de corte do filtro ideal é posicionada exatamente no ponto médio aritmético da sua respectiva faixa de transição.'
        },
        {
          title: 'Passo 4 - Conferir a janela imposta na Tabela 7.1',
          math: 'As exigido = 40 dB\nRetangular: 21 dB (✗) | Bartlett: 25 dB (✗)\nHann: 44 dB (✓) | Hamming: 53 dB (✓) | Blackman: 74 dB (✓)',
          desc: 'A atenuação depende apenas do formato da janela e não de M. O enunciado impõe a janela de Hann, que fornece 44 dB ≥ 40 dB.'
        },
        {
          title: 'Passo 5 - Calcular o comprimento M e atraso α',
          math: 'Δω = 6.2π / M  ⇒  M = ⌈6.2π / 0.15π⌉ + 1 = ⌈41.33⌉ + 1 = 42 + 1 = 43\nParidade: M = 43 é ímpar ⇒ Filtro Tipo 1\nα = (43 - 1) / 2 = 21 amostras',
          desc: 'Arredonda-se para cima e soma-se 1 conforme a convenção do livro para garantir transição menor ou igual à exigida.'
        },
        {
          title: 'Passo 6 - Calcular a resposta ideal hd(n)',
          math: 'hd(n) = { sen[0.65π(n - 21)] - sen[0.275π(n - 21)] } / [π(n - 21)]\nPara n = 21 (m = 0, limite 0/0): hd(21) = 0.65 - 0.275 = 0.37500\nPara n = 20 (m = -1): [sen(-0.65π) - sen(-0.275π)] / (-π) = (-0.8910 + 0.7604) / (-3.1416) = 0.04157\nPara n = 19 (m = -2): [sen(-1.30π) - sen(-0.55π)] / (-2π) = (0.8090 + 0.9877) / (-6.2832) = -0.28595',
          desc: 'O passa-faixa ideal é a diferença entre dois filtros passa-baixas ideais. Por simetria, hd(42 - n) = hd(n).'
        },
        {
          title: 'Passo 7 - Aplicar a janela de Hann w(n) e obter h(n)',
          math: 'w(n) = 0.5 · [1 - cos(2πn / 42)],   h(n) = hd(n) · w(n)\nn = 21 (m = 0):  hd = 0.37500,  w = 1.00000  ⇒  h(21) = 0.37500\nn = 20 (m = -1): hd = 0.04157,  w = 0.99442  ⇒  h(20) = 0.04134\nn = 19 (m = -2): hd = -0.28595, w = 0.97779  ⇒  h(19) = -0.27960\nn = 0  (m = -21): hd = -0.00366, w = 0.00000  ⇒  h(0)  = 0.00000',
          desc: 'A janela de Hann zera exatamente as duas amostras das extremidades (n = 0 e n = 42).'
        },
        {
          title: 'Passo 8 - Medição na resposta em frequência',
          math: 'máx |H| = 1.00657 (em 0.555π) | mín |H| na passagem = 0.99469 (em 0.35π)\nmáx |H| na rejeição = 0.006312 (lóbulo lateral em ω = 0.18π)\nRp = 20 · log10(1.00657 / 0.99469) = 0.1031 dB ≤ 0.25 dB (✓)\nAs = -20 · log10(0.006312 / 1.00657) = 44.054 dB ≥ 40 dB (✓)',
          desc: 'Avaliado numa grade densa de 20001 frequências incluindo as bordas exatas.'
        }
      ],
      verificacao: [
        { criterio: 'Rp [dB]', obtido: '0.1031 dB', exigido: '≤ 0.25 dB', status: 'Atende ✓' },
        { criterio: 'As [dB]', obtido: '44.054 dB', exigido: '≥ 40 dB', status: 'Atende ✓' },
        { criterio: 'Comprimento / Tipo', obtido: 'M = 43 (Tipo 1, α = 21)', exigido: 'Fase linear', status: 'Atende ✓' }
      ],
      code: `# Python 3.10 - P7.9: Passa-faixa com Janela de Hann (Sem fir1)
  import numpy as np
  from scipy.signal import freqz
  
  wc1, wc2 = 0.275 * np.pi, 0.65 * np.pi
  M = 43
  alpha = (M - 1) // 2
  n = np.arange(M)
  m = n - alpha
  
  # Resposta ao impulso ideal hd(n)
  hd = np.zeros(M)
  mask = m != 0
  hd[mask] = (np.sin(wc2 * m[mask]) - np.sin(wc1 * m[mask])) / (np.pi * m[mask])
  hd[alpha] = (wc2 - wc1) / np.pi
  
  # Janela de Hann manual e filtro h(n)
  w = 0.5 * (1 - np.cos(2 * np.pi * n / (M - 1)))
  h = hd * w
  
  # Medição em 20001 pontos
  w_grid, H = freqz(h, worN=20001)
  mag = np.abs(H)
  H_dB = 20 * np.log10(np.maximum(mag, 1e-12) / np.max(mag))`
    },
    {
      id: 'P7.10',
      cap: 7,
      title: 'P7.10 - Rejeita-faixa FIR com janela de Hamming',
      type: 'bandstop',
      enunciado: 'Projete um filtro rejeita-faixa usando a técnica de projeto com a janela de Hamming. As especificações são: borda inferior da faixa de rejeição: 0.4π, As = 50 dB; borda superior da faixa de rejeição: 0.6π; borda inferior da faixa de passagem: 0.3π, Rp = 0.2 dB; borda superior da faixa de passagem: 0.7π. Trace a resposta ao impulso e a resposta em magnitude (em dB) do filtro projetado. Não use a função fir1.',
      enunciadoOriginal: 'Design a bandstop filter using the Hamming window design technique. The specifications are: lower stopband edge: 0.4π, As = 50 dB; upper stopband edge: 0.6π; lower passband edge: 0.3π, Rp = 0.2 dB; upper passband edge: 0.7π. Plot the impulse response and the magnitude response (in dB) of the designed filter. Do not use the fir1 function.',
      dados: [
        { grandeza: 'Passagem inferior', valor: '0 ≤ ω ≤ 0.3π', obs: 'Faixa a ser preservada' },
        { grandeza: 'Rejeição', valor: '0.4π ≤ ω ≤ 0.6π', obs: 'Faixa a ser eliminada' },
        { grandeza: 'Passagem superior', valor: '0.7π ≤ ω ≤ π', obs: 'Faixa a ser preservada' },
        { grandeza: 'Rp', valor: '0.2 dB', obs: 'Ondulação máxima nas passagens' },
        { grandeza: 'As', valor: '50 dB', obs: 'Atenuação mínima na rejeição' },
        { grandeza: 'Método', valor: 'Janela de Hamming, sem fir1', obs: 'Imposto pelo enunciado' }
      ],
      specs: { as: -50.04, rp: -0.044, cuts: [0.35, 0.65], limitAs: -50 },
      steps: [
        {
          title: 'Passo 1 - Determinar a largura de transição (Δω)',
          math: 'Δω1 = 0.4π - 0.3π = 0.1π\nΔω2 = 0.7π - 0.6π = 0.1π  ⇒  Δω = 0.1π',
          desc: 'As duas faixas de transição possuem exatamente a mesma largura.'
        },
        {
          title: 'Passo 2 - Calcular as frequências de corte (ωc1 e ωc2)',
          math: 'ωc1 = (0.3π + 0.4π) / 2 = 0.35π\nωc2 = (0.6π + 0.7π) / 2 = 0.65π',
          desc: 'Cortes posicionados no centro de cada transição. Note que ωc1 + ωc2 = π (simetria espectral).'
        },
        {
          title: 'Passo 3 - Conferir a janela de Hamming',
          math: 'As exigido = 50 dB\nAs_Hamming (Tabela 7.1) = 53 dB ≥ 50 dB (✓)',
          desc: 'A janela de Hamming possui lóbulos laterais em -53 dB, suficientes para atender aos 50 dB pedidos.'
        },
        {
          title: 'Passo 4 - Calcular o comprimento M e verificar a paridade',
          math: 'M = ⌈6.6π / 0.1π⌉ + 1 = 66 + 1 = 67 (ímpar, Tipo 1)\nα = (67 - 1) / 2 = 33',
          desc: 'O filtro rejeita-faixa precisa ter ganho unitário em ω = π. Filtros Tipo 2 (M par) possuem zero obrigatório em Hr(π) = 0, portanto M tem de ser obrigatoriamente ímpar (Tipo 1).'
        },
        {
          title: 'Passo 5 - Calcular a resposta ao impulso ideal hd(n)',
          math: 'hd(n) = δ(n - 33) + { sen[0.35π(n - 33)] - sen[0.65π(n - 33)] } / [π(n - 33)]\nn = 33 (m = 0):  hd(33) = 1 + 0.35 - 0.65 = 0.70000\nn = 32 (m = -1): [sen(-0.35π) - sen(-0.65π)] / (-π) = (-0.89101 + 0.89101) / (-π) = 0\nn = 31 (m = -2): [sen(-0.70π) - sen(-1.30π)] / (-2π) = (-0.80902 - 0.80902) / (-6.28319) = 0.25752',
          desc: 'Como 0.35π + 0.65π = π, todas as amostras afastadas um número ímpar de posições do centro são identicamente nulas.'
        },
        {
          title: 'Passo 6 - Aplicar a janela de Hamming w(n) e calcular h(n)',
          math: 'w(n) = 0.54 - 0.46 · cos(2πn / 66),   h(n) = hd(n) · w(n)\nn = 33 (m = 0):   hd = 0.70000, w = 1.00000 ⇒ h(33) = 0.70000\nn = 31 (m = -2):  hd = 0.25752, w = 0.99169 ⇒ h(31) = 0.25538\nn = 0  (m = -33): hd = 0.00000, w = 0.08000 ⇒ h(0)  = 0.00000',
          desc: 'Diferente da Hann, a janela de Hamming vale 0.08 nas pontas, mas hd(0) = 0 por ser deslocamento ímpar (m = -33).'
        },
        {
          title: 'Passo 7 - Medição e teste de comprimento mínimo',
          math: 'Medido com M = 67: Rp = 0.0436 dB ≤ 0.2 dB (✓) | As = 50.044 dB ≥ 50 dB (✓)\nTeste com M = 65: As = 44.95 dB < 50 dB (✗)\nConclusão: M = 67 é o menor ímpar que atende (folga de 0.044 dB na borda ω = 0.4π).',
          desc: 'O pior ponto da rejeição ocorre exatamente nas bordas 0.4π e 0.6π.'
        }
      ],
      verificacao: [
        { criterio: 'Rp [dB]', obtido: '0.0436 dB', exigido: '≤ 0.2 dB', status: 'Atende ✓' },
        { criterio: 'As [dB]', obtido: '50.044 dB', exigido: '≥ 50 dB', status: 'Atende (folga 0.044 dB) ✓' },
        { criterio: 'Teste M = 65', obtido: 'As = 44.95 dB', exigido: '≥ 50 dB', status: 'Falha (confirma M=67 mín)' }
      ],
      code: `# Python 3.10 - P7.10: Rejeita-faixa com Janela de Hamming
  import numpy as np
  from scipy.signal import freqz
  
  wc1, wc2 = 0.35 * np.pi, 0.65 * np.pi
  M = 67
  alpha = (M - 1) // 2
  n = np.arange(M)
  m = n - alpha
  
  hd = np.zeros(M)
  mask = m != 0
  hd[mask] = (np.sin(wc1 * m[mask]) - np.sin(wc2 * m[mask])) / (np.pi * m[mask])
  hd[alpha] = 1.0 + (wc1 - wc2) / np.pi
  
  w = 0.54 - 0.46 * np.cos(2 * np.pi * n / (M - 1))
  h = hd * w`
    },
    {
      id: 'P7.11',
      cap: 7,
      title: 'P7.11 - Passa-faixa FIR com janela de Hamming',
      type: 'bandpass',
      enunciado: 'Projete um filtro passa-faixa usando a técnica de projeto com a janela de Hamming. As especificações são: borda inferior da faixa de rejeição: 0.3π, As = 50 dB; borda superior da faixa de rejeição: 0.6π; borda inferior da faixa de passagem: 0.4π, Rp = 0.5 dB; borda superior da faixa de passagem: 0.5π. Trace a resposta ao impulso e a resposta em magnitude (em dB) do filtro projetado. Não use a função fir1.',
      enunciadoOriginal: 'Design a bandpass filter using the Hamming window design technique. The specifications are: lower stopband edge: 0.3π, As = 50 dB; upper stopband edge: 0.6π; lower passband edge: 0.4π, Rp = 0.5 dB; upper passband edge: 0.5π. Plot the impulse response and the magnitude response (in dB) of the designed filter. Do not use the fir1 function.',
      dados: [
        { grandeza: 'Rejeição inferior', valor: '0 ≤ ω ≤ 0.3π', obs: 'Faixa a ser atenuada' },
        { grandeza: 'Passagem', valor: '0.4π ≤ ω ≤ 0.5π', obs: 'Faixa a ser preservada' },
        { grandeza: 'Rejeição superior', valor: '0.6π ≤ ω ≤ π', obs: 'Faixa a ser atenuada' },
        { grandeza: 'Rp', valor: '0.5 dB', obs: 'Ondulação máxima na passagem' },
        { grandeza: 'As', valor: '50 dB', obs: 'Atenuação mínima nas rejeições' },
        { grandeza: 'Método', valor: 'Janela de Hamming, sem fir1', obs: 'Imposto pelo enunciado' }
      ],
      specs: { as: -51.20, rp: -0.049, cuts: [0.35, 0.55], limitAs: -50 },
      steps: [
        {
          title: 'Passo 1 - Largura de transição (Δω)',
          math: 'Δω = 0.4π - 0.3π = 0.6π - 0.5π = 0.1π',
          desc: 'Ambas as transições têm largura idêntica igual a 0.1π.'
        },
        {
          title: 'Passo 2 - Frequências de corte (ωc1 e ωc2)',
          math: 'ωc1 = (0.3π + 0.4π) / 2 = 0.35π\nωc2 = (0.5π + 0.6π) / 2 = 0.55π',
          desc: 'Cortes posicionados na média aritmética de cada transição.'
        },
        {
          title: 'Passo 3 - Janela e comprimento M',
          math: 'Hamming: As_nominal = 53 dB ≥ 50 dB (✓)\nM = ⌈6.6π / 0.1π⌉ + 1 = 67 (Tipo 1),   α = 33',
          desc: 'Mantém-se M = 67 dado pela Tabela 7.1 (observação: M = 66 Tipo 2 também atenderia com As = 52.02 dB).'
        },
        {
          title: 'Passo 4 - Resposta ao impulso ideal hd(n)',
          math: 'hd(n) = { sen[0.55π(n - 33)] - sen[0.35π(n - 33)] } / [π(n - 33)]\nn = 33 (m = 0):  hd(33) = 0.55 - 0.35 = 0.20000\nn = 32 (m = -1): [sen(-0.55π) - sen(-0.35π)] / (-π) = (-0.98769 + 0.89101) / (-3.14159) = 0.03077',
          desc: 'Amostra central vale 0.2 e decai simetricamente para as extremidades.'
        },
        {
          title: 'Passo 5 - Janela de Hamming e coeficientes h(n)',
          math: 'w(n) = 0.54 - 0.46 · cos(2πn / 66),   h(n) = hd(n) · w(n)\nn = 33 (m = 0):   hd = 0.20000, w = 1.00000 ⇒ h(33) = 0.20000\nn = 32 (m = -1):  hd = 0.03077, w = 0.99792 ⇒ h(32) = 0.03071\nn = 0  (m = -33): hd = 0.01391, w = 0.08000 ⇒ h(0)  = 0.00111',
          desc: 'Nas extremidades n = 0 e n = 66 a janela de Hamming vale 0.08, resultando em h(0) = h(66) = 0.00111.'
        },
        {
          title: 'Passo 6 - Medição final',
          math: 'Rp = 0.0489 dB ≤ 0.5 dB (✓)\nAs = 51.202 dB ≥ 50 dB (✓)   (pior ponto na borda ω = 0.6π)',
          desc: 'O filtro atende às especificações com folga de 1.20 dB na rejeição.'
        }
      ],
      verificacao: [
        { criterio: 'Rp [dB]', obtido: '0.0489 dB', exigido: '≤ 0.5 dB', status: 'Atende ✓' },
        { criterio: 'As [dB]', obtido: '51.202 dB', exigido: '≥ 50 dB', status: 'Atende ✓' },
        { criterio: 'Pior ponto rejeição', obtido: 'ω = 0.6π (-51.20 dB)', exigido: '≤ -50 dB', status: 'Atende ✓' }
      ],
      code: `# Python 3.10 - P7.11: Passa-faixa com Janela de Hamming
  import numpy as np
  
  wc1, wc2 = 0.35 * np.pi, 0.55 * np.pi
  M = 67
  alpha = 33
  n = np.arange(M)
  m = n - alpha
  
  hd = np.zeros(M)
  mask = m != 0
  hd[mask] = (np.sin(wc2 * m[mask]) - np.sin(wc1 * m[mask])) / (np.pi * m[mask])
  hd[alpha] = (wc2 - wc1) / np.pi
  
  w = 0.54 - 0.46 * np.cos(2 * np.pi * n / (M - 1))
  h = hd * w`
    },
    {
      id: 'P7.12',
      cap: 7,
      title: 'P7.12 - Passa-altas FIR com janela fixa escolhida (Blackman)',
      type: 'highpass',
      enunciado: 'Projete um filtro passa-altas usando uma das funções de janela fixa. As especificações são: borda da faixa de rejeição: 0.4π, As = 50 dB; borda da faixa de passagem: 0.6π, Rp = 0.004 dB. Trace a resposta em magnitude (em dB) do filtro projetado, ampliada na faixa de passagem, para verificar a ondulação Rp na passagem. Não use a função fir1.',
      enunciadoOriginal: 'Design a highpass filter using one of the fixed window functions. The specifications are: stopband edge: 0.4π, As = 50 dB; passband edge: 0.6π, Rp = 0.004 dB. Plot the zoomed magnitude response (in dB) of the designed filter in the passband to verify the passband ripple Rp. Do not use the fir1 function.',
      dados: [
        { grandeza: 'Rejeição', valor: '0 ≤ ω ≤ 0.4π', obs: 'Faixa a ser atenuada' },
        { grandeza: 'Passagem', valor: '0.6π ≤ ω ≤ π', obs: 'Faixa a ser preservada' },
        { grandeza: 'As', valor: '50 dB', obs: 'Atenuação mínima na rejeição' },
        { grandeza: 'Rp', valor: '0.004 dB', obs: 'Ondulação máxima na passagem (extremamente exigente)' },
        { grandeza: 'Método', valor: 'Janela fixa à escolha, sem fir1', obs: 'Escolhida: Blackman' }
      ],
      specs: { as: -75.25, rp: -0.003, cuts: [0.5], limitAs: -50 },
      steps: [
        {
          title: 'Passo 1 - Converter Rp = 0.004 dB em tolerância linear δ1',
          math: '10^(0.004 / 20) = 10^(0.0002) = 1.000461\nδ1 = (1.000461 - 1) / (1.000461 + 1) = 2.3026 × 10^-4\nAtenuação equivalente = -20 · log10(δ1) = 72.8 dB ≈ 73 dB',
          desc: 'Como a janela produz desvios quase iguais na passagem e na rejeição, o Rp = 0.004 dB exige uma janela com lóbulos laterais de pelo menos 73 dB (muito acima dos 50 dB pedidos em As).'
        },
        {
          title: 'Passo 2 - Transição, frequência de corte e paridade',
          math: 'Δω = 0.6π - 0.4π = 0.2π\nωc = (0.4π + 0.6π) / 2 = 0.5π\nParidade: Passa-altas exige M ímpar (Tipo 1), pois Tipo 2 tem Hr(π) = 0.',
          desc: 'Um filtro passa-altas não pode ter zero em ω = π.'
        },
        {
          title: 'Passo 3 - Avaliar janelas candidatas e provar falha da Hamming',
          math: '• Hann: As = 44 dB < 50 dB (✗ descartada)\n• Hamming (M = 35): As = 51.98 dB (✓), mas Rp = 0.04013 dB > 0.004 dB (✗)\n  Varrendo Hamming de M = 35 até 95: Rp fica estacionado em [0.027, 0.040] dB > 0.004 dB!\n• Blackman: As_nominal = 74 dB ≥ 72.8 dB (✓ única que atende)',
          desc: 'Aumentar M apenas estreita a transição, não reduz a ondulação intrínseca da janela.'
        },
        {
          title: 'Passo 4 - Calcular o comprimento M para Blackman',
          math: 'M = ⌈11π / 0.2π⌉ + 1 = 55 + 1 = 56 (par)  ⇒  forçado ímpar: M = 57\nα = (57 - 1) / 2 = 28',
          desc: 'A fórmula da Tabela 7.1 dá 56, que é incrementado para 57 para garantir Tipo 1.'
        },
        {
          title: 'Passo 5 - Resposta ideal hd(n) do passa-altas',
          math: 'hd(n) = δ(n - 28) - { sen[0.5π(n - 28)] / [π(n - 28)] }\nn = 28 (m = 0):  hd(28) = 1 - 0.5 = 0.50000\nn = 27 (m = -1): -sen(-0.5π) / (-π) = -(-1) / (-3.14159) = -0.31831',
          desc: 'Resposta ideal do passa-altas com corte em 0.5π.'
        },
        {
          title: 'Passo 6 - Aplicar janela de Blackman w(n) e medir',
          math: 'w(n) = 0.42 - 0.5 · cos(2πn / 56) + 0.08 · cos(4πn / 56)\nn = 28 (m = 0):   hd = 0.50000,  w = 1.00000 ⇒ h(28) = 0.50000\nn = 27 (m = -1):  hd = -0.31831, w = 0.99485 ⇒ h(27) = -0.31667\nn = 0  (m = -28): hd = 0.00000,  w = 0.00000 ⇒ h(0)  = 0.00000\nMedição: Rp = 0.00296 dB ≤ 0.004 dB (✓) | As = 75.253 dB ≥ 50 dB (✓)',
          desc: 'No gráfico com zoom na passagem, a curva varia suavemente entre -0.00296 dB e 0 dB.'
        }
      ],
      verificacao: [
        { criterio: 'Janela escolhida', obtido: 'Blackman (M = 57)', exigido: 'Atender Rp e As', status: 'Única capaz ✓' },
        { criterio: 'Rp [dB] (Zoom)', obtido: '0.00296 dB', exigido: '≤ 0.004 dB', status: 'Atende ✓' },
        { criterio: 'As [dB]', obtido: '75.253 dB', exigido: '≥ 50 dB', status: 'Atende ✓' }
      ],
      code: `# Python 3.10 - P7.12: Passa-altas com Janela de Blackman
  import numpy as np
  
  wc = 0.5 * np.pi
  M = 57
  alpha = 28
  n = np.arange(M)
  m = n - alpha
  
  hd = np.zeros(M)
  mask = m != 0
  hd[mask] = -np.sin(wc * m[mask]) / (np.pi * m[mask])
  hd[alpha] = 1.0 - (wc / np.pi)
  
  w = 0.42 - 0.5 * np.cos(2 * np.pi * n / (M - 1)) + 0.08 * np.cos(4 * np.pi * n / (M - 1))
  h = hd * w`
    },
    {
      id: 'P7.13',
      cap: 7,
      title: 'P7.13 - Rejeita-faixa de comprimento mínimo com Kaiser',
      type: 'bandstop',
      enunciado: 'Usando o método da janela de Kaiser, projete um filtro digital FIR de fase linear que atenda às seguintes especificações: 0.975 ≤ |H| ≤ 1.025 para 0 ≤ ω ≤ 0.25π; 0 ≤ |H| ≤ 0.005 para 0.35π ≤ ω ≤ 0.65π; 0.975 ≤ |H| ≤ 1.025 para 0.75π ≤ ω ≤ π. Determine a resposta ao impulso h(n) de comprimento mínimo desse filtro. Apresente um gráfico com subgráficos da resposta de amplitude e da resposta em magnitude em dB. Não use a função fir1.',
      enunciadoOriginal: 'Using the Kaiser window method, design a linear-phase FIR digital filter that meets the following specifications: 0.975 ≤ |H| ≤ 1.025, 0 ≤ ω ≤ 0.25π; 0 ≤ |H| ≤ 0.005, 0.35π ≤ ω ≤ 0.65π; 0.975 ≤ |H| ≤ 1.025, 0.75π ≤ ω ≤ π. Determine the minimum length impulse response h(n) of such a filter. Provide a plot containing subplots of the amplitude response and the magnitude response in dB. Do not use the fir1 function.',
      dados: [
        { grandeza: 'Passagem inferior', valor: '0 ≤ ω ≤ 0.25π', obs: '0.975 ≤ |H| ≤ 1.025 (δ1 = 0.025)' },
        { grandeza: 'Rejeição', valor: '0.35π ≤ ω ≤ 0.65π', obs: '0 ≤ |H| ≤ 0.005 (δ2 = 0.005)' },
        { grandeza: 'Passagem superior', valor: '0.75π ≤ ω ≤ π', obs: '0.975 ≤ |H| ≤ 1.025 (δ1 = 0.025)' },
        { grandeza: 'Método', valor: 'Kaiser, comprimento mínimo, sem fir1', obs: 'Imposto pelo enunciado' }
      ],
      specs: { as: -46.02, rp: -0.043, cuts: [0.3, 0.7], limitAs: -46.02 },
      steps: [
        {
          title: 'Passo 1 - Tolerância de projeto δ e atenuação As',
          math: 'δ1 = 0.025 (passagem),   δ2 = 0.005 (rejeição)\nδ = min(δ1, δ2) = 0.005\nAs = -20 · log10(0.005) = 46.0206 dB',
          desc: 'A janela de Kaiser é projetada pela faixa mais exigente (menor tolerância δ).'
        },
        {
          title: 'Passo 2 - Calcular o parâmetro de forma β (21 < As < 50)',
          math: 'As - 21 = 25.0206\n(25.0206)^0.4 = e^(0.4 · ln 25.0206) = e^(1.28788) = 3.62509\nβ = 0.5842 · (3.62509) + 0.07886 · (25.0206) = 2.11778 + 1.97312 = 4.0909',
          desc: 'Fórmula empírica de Kaiser para o ramo intermediário de atenuação.'
        },
        {
          title: 'Passo 3 - Transição, cortes e estimativa inicial de M',
          math: 'Δω = 0.35π - 0.25π = 0.1π | ωc1 = 0.3π, ωc2 = 0.7π\nM_est ≈ ⌈(46.0206 - 7.95) / (2.285 · 0.1π)⌉ + 1 = ⌈38.0706 / 0.71785⌉ + 1 = ⌈53.03⌉ + 1 = 55',
          desc: 'Como é rejeita-faixa, M deve ser obrigatoriamente ímpar (Tipo 1).'
        },
        {
          title: 'Passo 4 - Busca iterativa do comprimento mínimo M_min',
          math: 'M = 49 (Tipo 1): desvio pass. = 0.01823 | máx rej. = 0.01734 > 0.005 (✗)\nM = 51 (Tipo 1): desvio pass. = 0.01237 | máx rej. = 0.01098 > 0.005 (✗)\nM = 53 (Tipo 1): desvio pass. = 0.00714 | máx rej. = 0.00747 > 0.005 (✗)\nM = 55 (Tipo 1): desvio pass. = 0.00515 | máx rej. = 0.00593 > 0.005 (✗ Estimativa falha!)\nM = 57 (Tipo 1): desvio pass. = 0.00390 ≤ 0.025 (✓) | máx rej. = 0.00367 ≤ 0.005 (✓)',
          desc: 'A estimativa M = 55 falha por 0.00093 na rejeição. O comprimento mínimo real é M_min = 57 (α = 28).'
        },
        {
          title: 'Passo 5 - Coeficientes de h(n) para M = 57 (simetria h(n) = h(56-n))',
          math: 'hd(28) = 1 + 0.3 - 0.7 = 0.600000 (ímpares do centro são nulos pois 0.3π + 0.7π = π)\nh(0) = +0.001769 | h(2) = -0.001960 | h(4) = -0.003135 | h(6) = +0.007581 | h(8) = 0\nh(10)= -0.014971 | h(12)= +0.012523 | h(14)= +0.016721 | h(16)= -0.035943 | h(18)= 0\nh(20)= +0.065318 | h(22)= -0.057444 | h(24)= -0.090210 | h(26)= +0.300001 | h(28)= +0.600000',
          desc: 'Todas as amostras ímpares h(1), h(3), ..., h(27) valem +0.000000.'
        }
      ],
      verificacao: [
        { criterio: '||H| - 1| em [0, 0.25π]', obtido: '0.00390', exigido: '≤ 0.025', status: 'Atende ✓' },
        { criterio: '||H| - 0| em [0.35π, 0.65π]', obtido: '0.00367', exigido: '≤ 0.005', status: 'Atende ✓' },
        { criterio: '||H| - 1| em [0.75π, π]', obtido: '0.00390', exigido: '≤ 0.025', status: 'Atende ✓' }
      ],
      code: `# Python 3.10 - P7.13: Rejeita-faixa Kaiser de Comprimento Mínimo
  import numpy as np
  from scipy.special import i0
  
  wc1, wc2 = 0.3 * np.pi, 0.7 * np.pi
  beta = 4.0909
  M = 57  # Confirmado por busca iterativa (estimativa 55 falha)
  alpha = (M - 1) // 2
  n = np.arange(M)
  m = n - alpha
  
  hd = np.zeros(M)
  mask = m != 0
  hd[mask] = (np.sin(wc1 * m[mask]) - np.sin(wc2 * m[mask])) / (np.pi * m[mask])
  hd[alpha] = 1.0 + (wc1 - wc2) / np.pi
  
  w = i0(beta * np.sqrt(1 - (1 - 2 * n / (M - 1))**2)) / i0(beta)
  h = hd * w`
    },
    {
      id: 'P7.14',
      cap: 7,
      title: 'P7.14 - Passa-faixa de comprimento mínimo com Kaiser (Tipo 2)',
      type: 'bandpass',
      enunciado: 'Deseja-se usar o método da janela de Kaiser para projetar um filtro digital FIR de fase linear que atenda às seguintes especificações: 0 ≤ |H| ≤ 0.01 para 0 ≤ ω ≤ 0.25π; 0.95 ≤ |H| ≤ 1.05 para 0.35π ≤ ω ≤ 0.65π; 0 ≤ |H| ≤ 0.01 para 0.75π ≤ ω ≤ π. Determine a resposta ao impulso h(n) de comprimento mínimo desse filtro. Apresente um gráfico com subgráficos da resposta de amplitude e da resposta em magnitude em dB. Não use a função fir1.',
      enunciadoOriginal: 'We wish to use the Kaiser window method to design a linear-phase FIR digital filter that meets the following specifications: 0 ≤ |H| ≤ 0.01, 0 ≤ ω ≤ 0.25π; 0.95 ≤ |H| ≤ 1.05, 0.35π ≤ ω ≤ 0.65π; 0 ≤ |H| ≤ 0.01, 0.75π ≤ ω ≤ π. Determine the minimum length impulse response h(n) of such a filter. Provide a plot containing subplots of the amplitude response and the magnitude response in dB. Do not use the fir1 function.',
      dados: [
        { grandeza: 'Rejeição inferior', valor: '0 ≤ ω ≤ 0.25π', obs: '|H| ≤ 0.01 (δ2 = 0.01)' },
        { grandeza: 'Passagem', valor: '0.35π ≤ ω ≤ 0.65π', obs: '0.95 ≤ |H| ≤ 1.05 (δ1 = 0.05)' },
        { grandeza: 'Rejeição superior', valor: '0.75π ≤ ω ≤ π', obs: '|H| ≤ 0.01 (δ2 = 0.01)' },
        { grandeza: 'Método', valor: 'Kaiser, comprimento mínimo, sem fir1', obs: 'Admite M par (Tipo 2)' }
      ],
      specs: { as: -40.00, rp: -0.4, cuts: [0.3, 0.7], limitAs: -40 },
      steps: [
        {
          title: 'Passo 1 - Tolerância e atenuação de projeto',
          math: 'δ = min(0.05, 0.01) = 0.01\nAs = -20 · log10(0.01) = 40.00 dB',
          desc: 'A tolerância das faixas de rejeição (0.01) governa o projeto.'
        },
        {
          title: 'Passo 2 - Cálculo do parâmetro β',
          math: 'As - 21 = 19  ⇒  19^0.4 = e^(0.4 · ln 19) = e^(1.17778) = 3.24714\nβ = 0.5842 · (3.24714) + 0.07886 · (19) = 1.89698 + 1.49834 = 3.3953',
          desc: 'Parâmetro de forma para As = 40 dB.'
        },
        {
          title: 'Passo 3 - Cortes, transição e admissão do Tipo 2 (M par)',
          math: 'Δω = 0.1π | ωc1 = 0.3π, ωc2 = 0.7π\nM_est ≈ ⌈(40 - 7.95) / (2.285 · 0.1π)⌉ + 1 = ⌈32.05 / 0.71785⌉ + 1 = ⌈44.65⌉ + 1 = 46',
          desc: 'Como o filtro é passa-faixa (rejeita em ω = π), o Tipo 2 (M par, que força Hr(π) = 0) é perfeitamente válido.'
        },
        {
          title: 'Passo 4 - Busca do comprimento mínimo (testando pares e ímpares)',
          math: 'M = 43 (Tipo 1): rej. inf = 0.02031 (✗) | pass = 0.01839 | rej. sup = 0.02031 (✗)\nM = 44 (Tipo 2): rej. inf = 0.01705 (✗) | pass = 0.01842 | rej. sup = 0.01290 (✗)\nM = 45 (Tipo 1): rej. inf = 0.01227 (✗) | pass = 0.01470 | rej. sup = 0.01227 (✗)\nM = 46 (Tipo 2): rej. inf = 0.00765 (✓) | pass = 0.01294 (✓) | rej. sup = 0.00978 ≤ 0.01 (✓)',
          desc: 'A estimativa M_min = 46 (Tipo 2, α = 22.5) é confirmada como o mínimo exato.'
        },
        {
          title: 'Passo 5 - Coeficientes h(n) para M = 46 (h(n) = h(45-n), sem amostra central)',
          math: 'n = 22 (m = -0.5): hd(22) = [sen(-0.35π) - sen(-0.15π)] / (-0.5π) = 0.27821, w = 0.99930 ⇒ h(22) = +0.278018\nh(0) = -0.002960 | h(1) = -0.003175 | h(2) = +0.001559 | h(3) = -0.001960 | h(4) = +0.006337\nh(5) = +0.009541 | h(6) = -0.009299 | h(7) = -0.004241 | h(8) = -0.005029 | h(9) = -0.015532\nh(10)= +0.022564 | h(11)= +0.021412 | h(12)= -0.009590 | h(13)= +0.011265 | h(14)= -0.034788\nh(15)= -0.051089 | h(16)= +0.049676 | h(17)= +0.023214 | h(18)= +0.029195 | h(19)= +0.100526\nh(20)= -0.176930 | h(21)= -0.241263 | h(22)= +0.278018',
          desc: 'Por causa do zero obrigatório em ω = π do Tipo 2, os desvios das rejeições ficam assimétricos (0.00765 vs 0.00978).'
        }
      ],
      verificacao: [
        { criterio: '||H| - 0| em [0, 0.25π]', obtido: '0.00765', exigido: '≤ 0.01', status: 'Atende ✓' },
        { criterio: '||H| - 1| em [0.35π, 0.65π]', obtido: '0.01294', exigido: '≤ 0.05', status: 'Atende ✓' },
        { criterio: '||H| - 0| em [0.75π, π]', obtido: '0.00978', exigido: '≤ 0.01', status: 'Atende (Faixa crítica) ✓' }
      ],
      code: `# Python 3.10 - P7.14: Passa-faixa Kaiser Tipo 2 (M = 46)
  import numpy as np
  from scipy.special import i0
  
  wc1, wc2 = 0.3 * np.pi, 0.7 * np.pi
  M = 46
  alpha = (M - 1) / 2.0  # 22.5 (semi-inteiro, sem divisão por zero)
  beta = 3.3953
  n = np.arange(M)
  m = n - alpha
  
  hd = (np.sin(wc2 * m) - np.sin(wc1 * m)) / (np.pi * m)
  w = i0(beta * np.sqrt(1 - (1 - 2 * n / (M - 1))**2)) / i0(beta)
  h = hd * w`
    },
    {
      id: 'P7.15',
      cap: 7,
      title: 'P7.15 - Filtro em escada: Kaiser vs Parks-McClellan',
      type: 'bandpass',
      enunciado: 'Projete o filtro em escada do Exemplo 7.26 usando a abordagem da janela de Kaiser. As especificações são: Banda 1: 0 ≤ ω ≤ 0.3π, ganho ideal = 1, δ1 = 0.01; Banda 2: 0.4π ≤ ω ≤ 0.7π, ganho ideal = 0.5, δ2 = 0.005; Banda 3: 0.8π ≤ ω ≤ π, ganho ideal = 0, δ3 = 0.001. Compare o comprimento do filtro deste projeto com o do Exemplo 7.26. Apresente um gráfico da resposta em magnitude em dB. Não use a função fir1.',
      enunciadoOriginal: 'Design the staircase filter of Example 7.26 using the Kaiser window approach. The specifications are: Band-1: 0 ≤ ω ≤ 0.3π, Ideal gain = 1, δ1 = 0.01; Band-2: 0.4π ≤ ω ≤ 0.7π, Ideal gain = 0.5, δ2 = 0.005; Band-3: 0.8π ≤ ω ≤ π, Ideal gain = 0, δ3 = 0.001. Compare the filter length of this design with that of Example 7.26. Provide a plot of the magnitude response in dB. Do not use the fir1 function.',
      dados: [
        { grandeza: 'Banda 1', valor: '0 ≤ ω ≤ 0.3π, G = 1.0', obs: 'Tolerância δ1 = 0.01' },
        { grandeza: 'Banda 2', valor: '0.4π ≤ ω ≤ 0.7π, G = 0.5', obs: 'Tolerância δ2 = 0.005 (-6.02 dB)' },
        { grandeza: 'Banda 3', valor: '0.8π ≤ ω ≤ π, G = 0.0', obs: 'Tolerância δ3 = 0.001 (-60 dB)' },
        { grandeza: 'Referência Ex. 7.26', valor: 'M_PM = 49', obs: 'Algoritmo de Parks-McClellan (Equiripple)' }
      ],
      specs: { as: -60.00, rp: -0.01, cuts: [0.35, 0.75], limitAs: -60 },
      steps: [
        {
          title: 'Passo 1 - Tolerância dominante, atenuação As e parâmetro β (As ≥ 50)',
          math: 'δ = min(0.01, 0.005, 0.001) = 0.001\nAs = -20 · log10(0.001) = 60.00 dB\nβ = 0.1102 · (60 - 8.7) = 0.1102 · 51.3 = 5.6533',
          desc: 'Como As ≥ 50 dB, utiliza-se o primeiro ramo linear da fórmula de Kaiser.'
        },
        {
          title: 'Passo 2 - Cortes e decomposição da resposta ideal em degraus',
          math: 'ωc1 = (0.3π + 0.4π)/2 = 0.35π | ωc2 = (0.7π + 0.8π)/2 = 0.75π\nhd(n) = 0.5 · h_LP(n; 0.35π) + 0.5 · h_LP(n; 0.75π)\nConferência dos ganhos: [0, 0.3π]: 0.5+0.5 = 1 | [0.4π, 0.7π]: 0+0.5 = 0.5 | [0.8π, π]: 0+0 = 0',
          desc: 'O filtro em escada de dois degraus de 0.5 é a superposição linear de dois passa-baixas ideais.'
        },
        {
          title: 'Passo 3 - Estimativa de M e busca do mínimo para Kaiser',
          math: 'M_est ≈ ⌈(60 - 7.95) / (2.285 · 0.1π)⌉ + 1 = ⌈72.51⌉ + 1 = 74\nBusca iterativa:\nM = 68: B1=0.00245, B2=0.00242, B3=0.00247 (✗)\nM = 70: B1=0.00154, B2=0.00145, B3=0.00155 (✗)\nM = 71: B1=0.00120, B2=0.00121, B3=0.00134 > 0.001 (✗)\nM = 72: B1=0.00095 (✓), B2=0.00094 (✓), B3=0.00090 ≤ 0.001 (✓) ⇒ M_Kaiser = 72 (Tipo 2)',
          desc: 'Com M = 72 (α = 35.5), todas as três bandas ficam com erro máximo abaixo de 0.001.'
        },
        {
          title: 'Passo 4 - Reprodução do Exemplo 7.26 (Parks-McClellan) e comparação',
          math: 'Pesos Parks-McClellan: W = (δ3/δ1, δ3/δ2, 1) = (0.1, 0.2, 1)\nM = 48 (PM): B3 = 0.00111 (✗) | M = 49 (PM): B1 = 0.00945, B2 = 0.00471, B3 = 0.00095 (✓)\nRazão: M_Kaiser / M_PM = 72 / 49 = 1.469  (Kaiser é 46.9% mais longo!)',
          desc: 'A janela de Kaiser força o mesmo erro (~0.0009) nas 3 bandas, desperdiçando folga nas bandas 1 e 2. O Parks-McClellan distribui o erro conforme o peso de cada banda.'
        }
      ],
      verificacao: [
        { criterio: '||H| - 1.0| na Banda 1', obtido: '0.00095', exigido: '≤ 0.01', status: 'Atende ✓' },
        { criterio: '||H| - 0.5| na Banda 2', obtido: '0.00094', exigido: '≤ 0.005', status: 'Atende ✓' },
        { criterio: '||H| - 0.0| na Banda 3', obtido: '0.00090', exigido: '≤ 0.001', status: 'Atende ✓' },
        { criterio: 'Comparação M_K vs M_PM', obtido: '72 vs 49 (+47%)', exigido: 'Comparar com Ex 7.26', status: 'Concluído ✓' }
      ],
      code: `# Python 3.10 - P7.15: Filtro em Escada (Kaiser M=72 vs Parks-McClellan M=49)
  import numpy as np
  from scipy.special import i0
  from scipy.signal import remez
  
  M = 72
  alpha = (M - 1) / 2.0  # 35.5
  beta = 5.6533
  n = np.arange(M)
  m = n - alpha
  
  h_lp1 = np.sin(0.35 * np.pi * m) / (np.pi * m)
  h_lp2 = np.sin(0.75 * np.pi * m) / (np.pi * m)
  hd = 0.5 * h_lp1 + 0.5 * h_lp2
  
  w = i0(beta * np.sqrt(1 - (1 - 2 * n / (M - 1))**2)) / i0(beta)
  h_kaiser = hd * w
  
  # Parks-McClellan (Ex. 7.26) para comparação
  h_pm = remez(49, [0, 0.3, 0.4, 0.7, 0.8, 1.0], [1, 0.5, 0], weight=[0.1, 0.2, 1], fs=2)`
    },
    {
      id: 'P7.16',
      cap: 7,
      title: 'P7.16 - Passa-faixa com janela fixa de menor comprimento',
      type: 'bandpass',
      enunciado: 'Projete um filtro passa-faixa usando uma técnica de projeto com janela fixa que tenha o comprimento mínimo e que satisfaça as seguintes especificações: borda inferior da faixa de rejeição = 0.3π, As = 40 dB, borda superior da faixa de rejeição = 0.6π; borda inferior da faixa de passagem = 0.4π, Rp = 0.5 dB, borda superior da faixa de passagem = 0.5π. Apresente um gráfico da resposta em log-magnitude em dB e um gráfico de hastes (stem) da resposta ao impulso.',
      enunciadoOriginal: 'Design a bandpass filter using a fixed window design technique that has the minimum length and that satisfies the following specifications: lower stopband edge = 0.3π, As = 40 dB, upper stopband edge = 0.6π; lower passband edge = 0.4π, Rp = 0.5 dB, upper passband edge = 0.5π. Provide a plot of the log-magnitude response in dB and stem plot of the impulse response.',
      dados: [
        { grandeza: 'Rejeição inferior', valor: '0 ≤ ω ≤ 0.3π', obs: 'Faixa a ser atenuada' },
        { grandeza: 'Passagem', valor: '0.4π ≤ ω ≤ 0.5π', obs: 'Faixa a ser preservada' },
        { grandeza: 'Rejeição superior', valor: '0.6π ≤ ω ≤ π', obs: 'Faixa a ser atenuada' },
        { grandeza: 'Rp / As', valor: 'Rp = 0.5 dB / As = 40 dB', obs: 'Limites de projeto' },
        { grandeza: 'Objetivo', valor: 'Janela fixa de menor M', obs: 'Comparar Tabela 7.1 vs Medição real' }
      ],
      specs: { as: -40.64, rp: -0.098, cuts: [0.35, 0.55], limitAs: -40 },
      steps: [
        {
          title: 'Passo 1 e 2 - Transição, cortes e janelas admissíveis',
          math: 'Δω = 0.1π | ωc1 = 0.35π, ωc2 = 0.55π\nAs exigido = 40 dB:\nRetangular (21 dB ✗) | Bartlett (25 dB ✗) | Hann (44 dB ✓) | Hamming (53 dB ✓) | Blackman (74 dB ✓)',
          desc: 'Apenas Hann, Hamming e Blackman possuem atenuação suficiente.'
        },
        {
          title: 'Passo 3 - Comparar comprimento da Tabela 7.1 vs Mínimo Medido',
          math: '• Hann (6.2π/M):     M_tabela = ⌈6.2/0.1⌉ + 1 = 63  |  M_mín_medido = 62\n• Hamming (6.6π/M):  M_tabela = ⌈6.6/0.1⌉ + 1 = 67  |  M_mín_medido = 61 (Vencedora!)\n• Blackman (11π/M):  M_tabela = ⌈11/0.1⌉ + 1 = 111  |  M_mín_medido = 82',
          desc: 'Pela Tabela 7.1 escolheríamos Hann (63), mas na medição direta a Hamming atinge 40 dB com apenas M = 61!'
        },
        {
          title: 'Passo 4 - Tabela de varredura fina entre Hann e Hamming',
          math: 'M = 59: Hann As = 36.20 dB (✗) | Hamming As = 37.45 dB (✗)\nM = 60: Hann As = 37.60 dB (✗) | Hamming As = 38.96 dB (✗)\nM = 61: Hann As = 39.14 dB (✗) | Hamming As = 40.64 dB, Rp = 0.0982 dB (✓ Atende!)\nM = 62: Hann As = 40.86 dB (✓) | Hamming As = 42.20 dB (✓)',
          desc: 'Como a Hamming tem lóbulos muito mais baixos (-53 dB), sua transição invade menos a barreira de -40 dB na borda.'
        },
        {
          title: 'Passo 5 - Equações finais para Hamming com M = 61 (α = 30)',
          math: 'hd(n) = { sen[0.55π(n - 30)] - sen[0.35π(n - 30)] } / [π(n - 30)]\nw(n) = 0.54 - 0.46 · cos(2πn / 60)\nn = 30 (m = 0):  hd = 0.20000, w = 1.00000 ⇒ h(30) = 0.20000\nn = 29 (m = -1): hd = 0.03077, w = 0.99748 ⇒ h(29) = 0.03070',
          desc: 'Filtro final Tipo 1 com 61 coeficientes.'
        }
      ],
      verificacao: [
        { criterio: 'Menor comprimento M', obtido: 'Hamming, M = 61', exigido: 'Menor M possível', status: 'Supera Tabela 7.1 (63) ✓' },
        { criterio: 'Rp [dB]', obtido: '0.0982 dB', exigido: '≤ 0.5 dB', status: 'Atende ✓' },
        { criterio: 'As [dB]', obtido: '40.636 dB', exigido: '≥ 40 dB', status: 'Atende ✓' }
      ],
      code: `# Python 3.10 - P7.16: Passa-faixa de Menor Comprimento (Hamming M=61)
  import numpy as np
  
  wc1, wc2 = 0.35 * np.pi, 0.55 * np.pi
  M = 61
  alpha = 30
  n = np.arange(M)
  m = n - alpha
  
  hd = np.zeros(M)
  mask = m != 0
  hd[mask] = (np.sin(wc2 * m[mask]) - np.sin(wc1 * m[mask])) / (np.pi * m[mask])
  hd[alpha] = (wc2 - wc1) / np.pi
  
  w = 0.54 - 0.46 * np.cos(2 * np.pi * n / (M - 1))
  h = hd * w`
    }
  ];