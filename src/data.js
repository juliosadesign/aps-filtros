// src/data.js

export const apsData = [
    {
      id: 'P7.9', cap: 7, title: 'P7.9 - Passa-faixa (Hann)', type: 'bandpass',
      specs: { as: -44.05, rp: -0.103, cuts: [0.275, 0.65], limitAs: -40 },
      steps: [
        { title: 'Passo 1 a 3: Transição e Cortes', math: 'Δω = min(0.35π - 0.2π, 0.75π - 0.55π) = 0.15π\nωc1 = 0.275π, ωc2 = 0.65π', desc: 'Largura de transição é a menor entre as bordas. A janela de Hann atende a exigência de As = 40 dB.' },
        { title: 'Passo 4 a 6: Comprimento e Janela', math: 'M = ⌈6.2π / 0.15π⌉ + 1 = 43\nα = (M - 1) / 2 = 21', desc: 'Para a janela de Hann, a constante é 6.2π. O comprimento M é 43, definindo um filtro Tipo 1 (fase linear).' },
        { title: 'Passo 7 a 10: Medição', math: 'h(n) = hd(n) · w(n)\nRp = 0.103 dB, As = 44.05 dB', desc: 'Medição no pior lóbulo atesta As = 44.05 dB.' }
      ],
      code: `# Python 3.10 - Passa-faixa Hann
  import numpy as np
  from scipy.signal import freqz
  wc1, wc2 = 0.275 * np.pi, 0.65 * np.pi
  M = 43; alpha = (M - 1) / 2
  n = np.arange(M); m = n - alpha
  m[m == 0] = 1e-10 # Evita divisão por zero
  hd = (np.sin(wc2 * m) - np.sin(wc1 * m)) / (np.pi * m)
  hd[n == alpha] = (wc2 - wc1) / np.pi
  w = 0.5 * (1 - np.cos(2 * np.pi * n / (M - 1)))
  h = hd * w`
    },
    {
      id: 'P7.10', cap: 7, title: 'P7.10 - Rejeita-faixa (Hamming)', type: 'bandstop',
      specs: { as: -50.04, rp: -0.044, cuts: [0.35, 0.65], limitAs: -50 },
      steps: [
        { title: 'Transição e Janela', math: 'Δω = 0.4π - 0.3π = 0.1π\nAs_Hamming ≈ 53 dB ≥ 50 dB', desc: 'As duas transições têm a mesma largura. A Hamming atende aos 50 dB exigidos.' },
        { title: 'Comprimento', math: 'M = ⌈6.6π / 0.1π⌉ + 1 = 67\nα = 33', desc: 'Rejeita-faixa exige M ímpar (Tipo 1) para não zerar em π. O cálculo já resulta ímpar.' },
        { title: 'Resposta Ideal e Medição', math: 'hd(n) = δ(n-α) + (sen[ωc1(n-α)] - sen[ωc2(n-α)]) / π(n-α)\nRp = 0.044 dB, As = 50.04 dB', desc: 'O filtro rejeita-faixa é o complemento do passa-faixa.' }
      ],
      code: `# Python 3.10 - Rejeita-faixa Hamming
  import numpy as np
  wc1, wc2 = 0.35 * np.pi, 0.65 * np.pi
  M = 67; alpha = 33
  n = np.arange(M); m = n - alpha
  m[m == 0] = 1e-10
  hd = (np.sin(wc1 * m) - np.sin(wc2 * m)) / (np.pi * m)
  hd[n == alpha] = 1 + (wc1 - wc2) / np.pi # Impulso no centro
  w = 0.54 - 0.46 * np.cos(2 * np.pi * n / (M - 1))
  h = hd * w`
    },
    {
      id: 'P7.11', cap: 7, title: 'P7.11 - Passa-faixa (Hamming)', type: 'bandpass',
      specs: { as: -51.20, rp: -0.049, cuts: [0.35, 0.55], limitAs: -50 },
      steps: [
        { title: 'Largura e Janela', math: 'Δω = 0.4π - 0.3π = 0.1π', desc: 'A janela Hamming foi imposta e atende (53 dB).' },
        { title: 'Cortes', math: 'ωc1 = 0.35π\nωc2 = 0.55π', desc: 'Posicionados no meio da transição. M calculado = 67.' },
        { title: 'Resultado', math: 'Rp = 0.0489 dB\nAs = 51.20 dB', desc: 'Atende com folga de 1.20 dB no As. O pior ponto fica na borda de 0.6π.' }
      ],
      code: `# Python 3.10 - Passa-faixa Hamming
  import numpy as np
  wc1, wc2 = 0.35 * np.pi, 0.55 * np.pi
  M = 67; alpha = 33
  n = np.arange(M); m = n - alpha; m[m == 0] = 1e-10
  hd = (np.sin(wc2 * m) - np.sin(wc1 * m)) / (np.pi * m)
  hd[n == alpha] = (wc2 - wc1) / np.pi
  w = 0.54 - 0.46 * np.cos(2 * np.pi * n / (M - 1))
  h = hd * w`
    },
    {
      id: 'P7.12', cap: 7, title: 'P7.12 - Passa-altas (Blackman)', type: 'highpass',
      specs: { as: -75.25, rp: -0.003, cuts: [0.5], limitAs: -50 },
      steps: [
        { title: 'Tolerância e Escolha', math: 'δ1 = (10^(0.004/20)-1) / (10^(0.004/20)+1) ≈ 2.3e-4\n-20log10(δ1) ≈ 72.8 dB', desc: 'O Rp extremamente rigoroso (0.004dB) exige lóbulos de ~73dB, o que descarta Hann e Hamming. Resta Blackman (74dB).' },
        { title: 'Comprimento M', math: 'M = ⌈11π / 0.2π⌉ + 1 = 56 -> Ímpar: 57', desc: 'Passa-altas exige M ímpar (Tipo 1) para não ter zero em π.' },
        { title: 'Medição', math: 'Rp = 0.00296 dB\nAs = 75.25 dB', desc: 'A ondulação fica em -0.003 dB, dentro do limite de -0.004 dB.' }
      ],
      code: `# Python 3.10 - Passa-altas Blackman
  import numpy as np
  wc = 0.5 * np.pi
  M = 57; alpha = 28
  n = np.arange(M); m = n - alpha; m[m == 0] = 1e-10
  hd = -np.sin(wc * m) / (np.pi * m)
  hd[n == alpha] = 1 - (wc / np.pi)
  w = 0.42 - 0.5*np.cos(2*np.pi*n/(M-1)) + 0.08*np.cos(4*np.pi*n/(M-1))
  h = hd * w`
    },
    {
      id: 'P7.13', cap: 7, title: 'P7.13 - Rejeita-faixa (Kaiser)', type: 'bandstop',
      specs: { as: -46.02, rp: -0.043, cuts: [0.3, 0.7], limitAs: -46.02 },
      steps: [
        { title: 'Tolerância e Beta', math: 'δ = min(0.025, 0.005) = 0.005 -> As = 46.02 dB\nβ = 0.5842(25.02)^0.4 + 0.0788(25.02) = 4.0909', desc: 'O fator de forma β é derivado empiricamente da atenuação exigida.' },
        { title: 'Busca de Mínimo', math: 'M_estimado ≈ 55 (falha na rejeição: 0.00593)\nM_min = 57', desc: 'A fórmula é empírica. A busca interativa confirma que 57 é o menor comprimento ímpar que respeita a tolerância.' },
        { title: 'Cortes', math: 'ωc1 = 0.3π, ωc2 = 0.7π', desc: 'Amostras distantes um número ímpar do centro são nulas, simplificando o cálculo.' }
      ],
      code: `# Python 3.10 - Rejeita-faixa Kaiser
  import numpy as np
  from scipy.special import i0
  wc1, wc2 = 0.3 * np.pi, 0.7 * np.pi
  M = 57; alpha = 28; beta = 4.0909
  n = np.arange(M); m = n - alpha; m[m == 0] = 1e-10
  hd = (np.sin(wc1 * m) - np.sin(wc2 * m)) / (np.pi * m)
  hd[n == alpha] = 1 + (wc1 - wc2) / np.pi
  w = i0(beta * np.sqrt(1 - (2*n/(M-1) - 1)**2)) / i0(beta)
  h = hd * w`
    },
    {
      id: 'P7.14', cap: 7, title: 'P7.14 - Passa-faixa (Kaiser)', type: 'bandpass',
      specs: { as: -40.00, rp: -0.4, cuts: [0.3, 0.7], limitAs: -40 },
      steps: [
        { title: 'Parâmetros Kaiser', math: 'δ = 0.01 -> As = 40 dB\nβ = 3.3953', desc: 'Define-se a menor tolerância de projeto.' },
        { title: 'Aceitando M Par (Tipo 2)', math: 'M_min = 46\nα = 22.5', desc: 'O passa-faixa pode usar M par. A estimativa M=46 atende.' },
        { title: 'Faixa Crítica', math: 'Hr(π) = 0', desc: 'O Tipo 2 força zero em π, empurrando a rejeição superior ao limite de 0.00978 (vs 0.01 tolerado).' }
      ],
      code: `# Python 3.10 - Passa-faixa Kaiser (Tipo 2)
  import numpy as np
  from scipy.special import i0
  wc1, wc2 = 0.3 * np.pi, 0.7 * np.pi
  M = 46; alpha = 22.5; beta = 3.3953
  n = np.arange(M); m = n - alpha
  hd = (np.sin(wc2 * m) - np.sin(wc1 * m)) / (np.pi * m)
  # Sem m=0 pois alpha não é inteiro
  w = i0(beta * np.sqrt(1 - (2*n/(M-1) - 1)**2)) / i0(beta)
  h = hd * w`
    },
    {
      id: 'P7.15', cap: 7, title: 'P7.15 - Filtro em Escada', type: 'bandpass',
      specs: { as: -60.00, rp: -0.01, cuts: [0.35, 0.75], limitAs: -60 },
      steps: [
        { title: 'Parâmetros e Resposta', math: 'δ = 0.001 -> As = 60 dB -> β = 5.6533\nhd(n) = 0.5*h_LP(0.35π) + 0.5*h_LP(0.75π)', desc: 'Escada é a soma de dois passa-baixas (pesos 0.5).' },
        { title: 'Busca Mínima', math: 'M_Kaiser = 72', desc: 'Procura-se o menor M (incluindo pares).' },
        { title: 'Comparação Parks-McClellan', math: 'M_Kaiser / M_PM = 72 / 49 = 1.469', desc: 'A Kaiser iguala o erro nas três bandas, exigindo 47% mais coeficientes que o algoritmo minimax.' }
      ],
      code: `# Python 3.10 - Filtro Escada Kaiser
  import numpy as np
  from scipy.special import i0
  M = 72; alpha = 35.5; beta = 5.6533
  n = np.arange(M); m = n - alpha
  h_lp1 = np.sin(0.35 * np.pi * m) / (np.pi * m)
  h_lp2 = np.sin(0.75 * np.pi * m) / (np.pi * m)
  hd = 0.5 * h_lp1 + 0.5 * h_lp2
  w = i0(beta * np.sqrt(1 - (2*n/(M-1) - 1)**2)) / i0(beta)
  h = hd * w`
    },
    {
      id: 'P7.16', cap: 7, title: 'P7.16 - Janela Fixa Menor', type: 'bandpass',
      specs: { as: -40.64, rp: -0.098, cuts: [0.35, 0.55], limitAs: -40 },
      steps: [
        { title: 'Seleção', math: 'As = 40 dB', desc: 'Apenas Hann, Hamming e Blackman sobrevivem à restrição inicial.' },
        { title: 'Estimativa vs Prática', math: 'Hann_Tabela = 63\nHamming_Medido = 61', desc: 'Apesar da tabela apontar a Hann, a medição prova empíricamente que a Hamming resolve com menos coeficientes.' },
        { title: 'Projeto', math: 'M = 61, α = 30\nRp = 0.0982 dB, As = 40.64 dB', desc: 'O valor da rejeição beira o limite de 40 dB, confirmando a minimalidade do array.' }
      ],
      code: `# Python 3.10 - Menor Janela Fixa (Hamming)
  import numpy as np
  wc1, wc2 = 0.35 * np.pi, 0.55 * np.pi
  M = 61; alpha = 30
  n = np.arange(M); m = n - alpha; m[m == 0] = 1e-10
  hd = (np.sin(wc2 * m) - np.sin(wc1 * m)) / (np.pi * m)
  hd[n == alpha] = (wc2 - wc1) / np.pi
  w = 0.54 - 0.46 * np.cos(2 * np.pi * n / (M - 1))
  h = hd * w`
    },
    {
      id: 'P8.12', cap: 8, title: 'P8.12 - Butterworth (Racional)', type: 'lowpass',
      specs: { as: -59.97, rp: -0.25, cuts: [0.2], limitAs: -50 }, 
      steps: [
        { title: 'Passo 1 a 3: Ordem N e Corte', math: 'N = ⌈ log10(0.05925/99999) / (2·log10(500/2000)) ⌉ = 6\nΩc = 632.7668 rad/s', desc: 'As equações de perda determinam a ordem mínima. Com Rp=0.25 dB e As=50 dB, isolando N, obtém-se 6.' },
        { title: 'Passo 4 a 6: Polos e Conjugados', math: 'pk = Ωc · e^(j[π/2 + (2k+1)π/12])\nθ = 15º, 45º, 75º', desc: 'Como N=6 (par), não há polo no eixo real. Multiplicam-se os pares conjugados para formar 3 seções de 2ª ordem com coeficientes reais.' },
        { title: 'Passo 7 e 8: Forma Racional', math: 'Ha(s) = B / A(s)\nB = a0 = 6.418923 × 10^16', desc: 'O denominador expandido chega a s^6. Ajusta-se o ganho DC para 1. Medição alcança 59.97 dB.' }
      ],
      code: `# Python 3.10 - Butterworth Racional
  import numpy as np
  from scipy import signal
  
  Wp, Ws = 500, 2000
  Rp, As = 0.25, 50
  
  # Cálculo da Ordem e Corte
  N, Wc = signal.buttord(Wp, Ws, Rp, As, analog=True)
  
  # Criação do Filtro Analógico Racional (num, den)
  b, a = signal.butter(N, Wc, btype='low', analog=True)
  
  # Geração da Resposta em Frequência
  w, h = signal.freqs(b, a, worN=np.linspace(0, 3000, 2000))`
    },
    {
      id: 'P8.13', cap: 8, title: 'P8.13 - Butterworth (Cascata)', type: 'lowpass',
      specs: { as: -45.05, rp: -0.5, cuts: [0.25], limitAs: -45 },
      steps: [
        { title: 'Passo 1 a 3: Conversão e Ordem', math: 'Ωp = 2π·10k, Ωs = 2π·20k\nN = ⌈ -5.4136 / -0.60206 ⌉ = 9\nΩc = 70621.02 rad/s', desc: 'Converte-se de Hz para rad/s. A ordem calculada é 8.9917, arredondada para 9, o que deixa pouca folga.' },
        { title: 'Passo 4 e 5: Polos e Biquads', math: 'p_real = -70621.02\nθk = kπ/9 (20º, 40º, 60º, 80º)', desc: 'Como N é ímpar, existe uma seção de 1ª ordem. O resto divide-se em 4 biquads (s² + 2Ωc cosθ s + Ωc²).' },
        { title: 'Passo 6 e 7: Medição', math: 'A(20kHz) = 45.05 dB\nG_global = 1', desc: 'Cada seção tem ganho unitário. A atenuação passa de raspão na exigência, confirmando N=9 como ordem mínima.' }
      ],
      code: `# Python 3.10 - Butterworth Cascata
  import numpy as np
  from scipy import signal
  
  Wp = 2 * np.pi * 10000
  Ws = 2 * np.pi * 20000
  Rp, As = 0.5, 45
  
  # Ordem e frequências (ZPK para cascata)
  N, Wc = signal.buttord(Wp, Ws, Rp, As, analog=True)
  z, p, k = signal.butter(N, Wc, analog=True, output='zpk')
  
  # Converte ZPK para Seções de 2ª Ordem (SOS)
  sos = signal.zpk2sos(z, p, k, analog=True)
  w, h = signal.sosfreqs(sos, worN=np.linspace(0, Ws*2, 2000))`
    },
    {
      id: 'P8.14', cap: 8, title: 'P8.14 - Chebyshev-I (Racional)', type: 'lowpass',
      specs: { as: -54.99, rp: -1.0, cuts: [0.33], limitAs: -50 },
      steps: [
        { title: 'Passo 1 e 2: Parâmetros e Ordem', math: 'ε = √(10^(0.1) - 1) = 0.5088\nN = ⌈ cosh⁻¹(621.46)/cosh⁻¹(1.5) ⌉ = 8', desc: 'O fator ε regula a ondulação (1 dB). A ordem N=8 é metade do que um Butterworth (N=16) exigiria.' },
        { title: 'Passo 3 e 4: Elipse dos Polos', math: 'aΩp = 1.7945, bΩp = 10.1597\npk = (aΩp)cos(φk) + j(bΩp)sen(φk)', desc: 'No Chebyshev, os polos formam uma elipse achatada. N=8 gera 4 pares conjugados.' },
        { title: 'Passo 5 e 6: Ganho DC', math: 'Ha(0) = B / a0 = 1 / √(1+ε²) = 0.8913\nAs = 54.99 dB', desc: 'Com N par, a curva inicia num vale, logo o ganho DC é -1 dB. A atenuação atende perfeitamente.' }
      ],
      code: `# Python 3.10 - Chebyshev-I Racional
  import numpy as np
  from scipy import signal
  
  Wp, Ws = 10, 15
  Rp, As = 1.0, 50
  
  # Ordem Chebyshev Tipo I
  N, Wc = signal.cheb1ord(Wp, Ws, Rp, As, analog=True)
  
  # Gera polinômios (b, a)
  b, a = signal.cheby1(N, Rp, Wc, analog=True)
  
  # Resposta e Atraso de Grupo
  w, h = signal.freqs(b, a, worN=np.linspace(0, 30, 2000))
  mag_dB = 20 * np.log10(np.abs(h))`
    },
    {
      id: 'P8.15', cap: 8, title: 'P8.15 - Chebyshev-I (Cascata)', type: 'lowpass',
      specs: { as: -64.49, rp: -0.5, cuts: [0.1], limitAs: -45 },
      steps: [
        { title: 'Passo 1 e 2: Conversão e Ordem', math: 'Ωp = 2π(4k), Ωs = 2π(20k)\nε = 0.3493\nN = ⌈ 6.925 / 2.292 ⌉ = 4', desc: 'A ordem 3.02 foi arredondada para 4. Isso vai gerar uma grande folga na atenuação final.' },
        { title: 'Passo 3 e 4: Polos e Biquads', math: 'aΩp = 11516, bΩp = 27645\nBiquads = s² + 2σs + |p|²', desc: 'Polos na elipse viram dois biquads (N par não tem polos reais soltos).' },
        { title: 'Passo 5 e 6: Ganho e Medição', math: 'G = 1 / √(1+ε²) = 0.94406\nAs = 64.49 dB', desc: 'A folga de N empurrou a atenuação para ~64.5 dB. Um filtro com N=3 reprovaria por apenas 0.42 dB.' }
      ],
      code: `# Python 3.10 - Chebyshev-I Cascata
  import numpy as np
  from scipy import signal
  
  Wp = 2 * np.pi * 4000
  Ws = 2 * np.pi * 20000
  Rp, As = 0.5, 45
  
  # Ordem e forma ZPK
  N, Wc = signal.cheb1ord(Wp, Ws, Rp, As, analog=True)
  z, p, k = signal.cheby1(N, Rp, Wc, analog=True, output='zpk')
  
  # Converte para Cascata (SOS)
  sos = signal.zpk2sos(z, p, k, analog=True)
  w, h = signal.sosfreqs(sos, worN=np.linspace(0, Ws*2, 2000))`
    }
  ];
  