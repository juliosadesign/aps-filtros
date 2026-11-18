// src/data.js

export const apsData = [
    {
      id: 'P7.9', cap: 7, title: 'P7.9 - Passa-faixa (Hann)', type: 'bandpass',
      specs: { as: -44.05, rp: -0.103, cuts: [0.275, 0.65], limitAs: -40 },
      steps: [
        { title: 'Passo 1: Entender o método da janela', math: 'h(n) = hd(n) · w(n)\nhd(α) = (ωc2 - ωc1) / π', desc: 'O filtro ideal tem resposta ao impulso infinita. O método trunca essa resposta em M amostras e a multiplica por uma janela suave, reduzindo a ondulação do fenómeno de Gibbs.' },
        { title: 'Passo 2 e 3: Transição e Janela', math: 'Δω1 = 0.35π - 0.2π = 0.15π\nΔω2 = 0.75π - 0.55π = 0.2π\nΔω = min(0.15π, 0.2π) = 0.15π', desc: 'A janela gera a mesma transição em todas as bordas, logo dita a regra a mais restrita. O enunciado impõe a Hann, que atinge ~44 dB (≥ 40 dB exigidos).' },
        { title: 'Passo 4 e 5: Comprimento e Cortes', math: 'M = ⌈6.2π / 0.15π⌉ + 1 = 43\nα = 21\nωc1 = 0.275π, ωc2 = 0.65π', desc: 'O atraso (α) garante a fase linear. Os cortes ideais (ωc) são posicionados exatamente no meio de cada faixa de transição.' },
        { title: 'Passo 6: Medição Final', math: 'h(21) = 0.375\nRp = 0.1031 dB ≤ 0.25 dB\nAs = 44.05 dB ≥ 40 dB', desc: 'A medição computacional do pior lóbulo lateral (em ω = 0.18π) comprova a eficácia do comprimento 43.' }
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
        { title: 'Passo 1 e 2: Largura e Validação', math: 'Δω = 0.4π - 0.3π = 0.7π - 0.6π = 0.1π\nAs_Hamming ≈ 53 dB ≥ 50 dB', desc: 'As duas transições possuem larguras idênticas. A janela de Hamming foi estipulada e suporta a atenuação.' },
        { title: 'Passo 3: Comprimento e Paridade', math: 'M = ⌈6.6π / 0.1π⌉ + 1 = 67\nα = 33', desc: 'Um rejeita-faixa passa em ω=π, logo um filtro Tipo 2 (M par) falharia obrigatoriamente. O cálculo de M resulta felizmente num ímpar (Tipo 1).' },
        { title: 'Passo 4: Resposta Ideal', math: 'ωc1 = 0.35π, ωc2 = 0.65π\nhd(n) = δ(n-α) + (sen[ωc1(n-α)] - sen[ωc2(n-α)]) / π(n-α)', desc: 'Matematicamente, o rejeita-faixa é construído como o complemento direto do passa-faixa (o "1" torna-se no impulso de Dirac).' },
        { title: 'Passo 5: Medição e Minimalidade', math: 'Rp = 0.0436 dB\nAs = 50.044 dB', desc: 'Atenção ao limite: a folga em As é de meros 0.04 dB. Se M fosse reduzido para 65, a atenuação cairia para 44.95 dB (reprovando o projeto).' }
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
        { title: 'Passo 1 e 2: Transição e M', math: 'Δω = 0.4π - 0.3π = 0.1π\nM = ⌈6.6π / 0.1π⌉ + 1 = 67', desc: 'As transições simétricas dispensam o uso da função min(). O comprimento estimado pela tabela sugere 67 amostras.' },
        { title: 'Passo 3: Posicionamento dos Cortes', math: 'ωc1 = (0.3π + 0.4π) / 2 = 0.35π\nωc2 = (0.5π + 0.6π) / 2 = 0.55π\nhd(33) = 0.2', desc: 'Ao contrário da janela de Hann, a equação de Hamming não zera as extremidades da resposta finita (permanece em 0.08).' },
        { title: 'Passo 4: Verificação Empírica', math: 'Rp = 0.0489 dB ≤ 0.5 dB\nAs = 51.20 dB ≥ 50 dB', desc: 'A Tabela 7.1 fornece apenas uma estimativa. Na prática, um filtro M=66 (Tipo 2) também aprovaria o projeto com As = 52.02 dB.' }
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
        { title: 'Passo 1: Tolerância Extrema', math: 'δ1 = (10^(0.004/20) - 1) / (10^(0.004/20) + 1) ≈ 2.303×10^-4\n-20log10(δ1) ≈ 72.8 dB', desc: 'A exigência brutal de Rp = 0.004 dB obriga a que a janela possua lóbulos laterais inferiores a ~73 dB.' },
        { title: 'Passo 2 e 3: Triagem de Janelas', math: 'Hann: 44 dB (Falha As)\nHamming: 53 dB (Falha Rp)\nBlackman: 74 dB (Aprovada)', desc: 'Testes iterativos revelam que o aumento de M não salva a Hamming (Rp bloqueia em 0.027 dB). Apenas a Blackman sobrevive.' },
        { title: 'Passo 4 e 5: Ajuste de Paridade', math: 'M_eq = ⌈11π / 0.2π⌉ + 1 = 56\nM_final = 57 (Ímpar obrigatório)', desc: 'O passa-altas exige que a resposta em ω=π não seja nula. O cálculo resultou em 56, logo forçamos M=57 (Tipo 1, α=28).' },
        { title: 'Passo 6: Medição Zoom', math: 'Rp = 0.00296 dB ≤ 0.004 dB\nAs = 75.25 dB ≥ 50 dB', desc: 'Com M=55 teríamos uma folga perigosa de apenas 7×10^-5 dB, pelo que a adoção de M=57 é a mais robusta.' }
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
        { title: 'Passo 1 a 3: Beta de Kaiser', math: 'δ = min(0.025, 0.005) = 0.005\nAs = -20log10(0.005) = 46.0206 dB\nβ = 0.5842(25.02)^0.4 + 0.0788(25.02) = 4.0909', desc: 'Diferente das janelas fixas, a Kaiser permite modelar a atenuação e a largura de forma independente através do fator empírico β.' },
        { title: 'Passo 4 a 6: Teste da Estimativa', math: 'Δω = 0.1π\nM ≈ ⌈(46.02 - 7.95) / (2.285 · 0.1π)⌉ + 1 = 55\nFalha: max_rejeição = 0.00593 > 0.005', desc: 'A equação de M é apenas uma aproximação. A simulação direta do filtro com M=55 reprova no limite superior da rejeição.' },
        { title: 'Passo 7 e 8: Busca do Mínimo Real', math: 'M = 57\nα = 28', desc: 'Subindo em passos ímpares, M=57 é o primeiro comprimento que estabiliza a ondulação máxima dentro do critério de projeto rigoroso.' }
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
        { title: 'Passo 1 e 2: Formulação de Tolerância', math: 'δ = min(0.05, 0.01) = 0.01\nAs = -20log10(0.01) = 40 dB\nβ = 3.3953', desc: 'Regra de projeto: a janela afeta o espetro globalmente. A faixa que impõe o requisito mais restritivo (δ=0.01) domina o projeto inteiro.' },
        { title: 'Passo 3 a 5: Flexibilidade de Paridade', math: 'M ≈ ⌈(40 - 7.95) / (2.285 · 0.1π)⌉ + 1 = 46\nFiltro Tipo 2: Hr(π) = 0', desc: 'Por ser passa-faixa, a rejeição em ω=π é bem-vinda. Portanto, iteramos por valores pares e ímpares. O valor da estimativa M=46 atende.' },
        { title: 'Passo 6 e 7: Consequência Assimétrica', math: 'Rej_inf: 0.00765\nRej_sup: 0.00978 ≤ 0.01', desc: 'Como o Tipo 2 obriga o zero matemático em π, as ondulações tornam-se assimétricas, empurrando a faixa crítica para a borda superior.' }
      ],
      code: `# Python 3.10 - Passa-faixa Kaiser (Tipo 2)
  import numpy as np
  from scipy.special import i0
  wc1, wc2 = 0.3 * np.pi, 0.7 * np.pi
  M = 46; alpha = 22.5; beta = 3.3953
  n = np.arange(M); m = n - alpha
  hd = (np.sin(wc2 * m) - np.sin(wc1 * m)) / (np.pi * m)
  w = i0(beta * np.sqrt(1 - (2*n/(M-1) - 1)**2)) / i0(beta)
  h = hd * w`
    },
    {
      id: 'P7.15', cap: 7, title: 'P7.15 - Filtro em Escada', type: 'bandpass',
      specs: { as: -60.00, rp: -0.01, cuts: [0.35, 0.75], limitAs: -60 },
      steps: [
        { title: 'Passo 1 e 2: Equacionamento em Degrau', math: 'δ = min(0.01, 0.005, 0.001) = 0.001\nAs = 60 dB, β = 5.6533\nhd(n) = 0.5*h_LP(0.35π) + 0.5*h_LP(0.75π)', desc: 'Para criar patamares G=1, G=0.5 e G=0, a resposta ideal é fragmentada numa soma linear de filtros passa-baixas com peso 0.5.' },
        { title: 'Passo 3 e 4: Busca Rigorosa', math: 'M_estimado = 74\nM_min = 72 (Tipo 2, α = 35.5)', desc: 'Novamente a estimativa é conservadora. Testando iterativamente M decrescente, o M=72 estabiliza desvios em 0.00095, 0.00094 e 0.00090.' },
        { title: 'Passo 5 e 6: Minimax (Parks-McClellan)', math: 'M_PM = 49\nEficiência Kaiser: M_K / M_PM = 1.469', desc: 'A janela de Kaiser é rígida e desperdiça coeficientes ao aplicar tolerâncias idênticas em toda a resposta. O algoritmo equiripple (Parks-McClellan) resolve a escada sendo 47% mais curto.' }
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
        { title: 'Passo 1 e 2: Triagem Inicial', math: 'Δω = 0.1π\nAs = 40 dB', desc: 'Retangular (21 dB) e Bartlett (25 dB) são automaticamente vetadas. Sobrevivem Hann, Hamming e Blackman.' },
        { title: 'Passo 3 e 4: Tabela Empírica vs Realidade', math: 'M_tabela(Hann) = 63\nM_medido(Hamming) = 61', desc: 'A Tabela 7.1 aponta a Hann como mais eficiente. Porém, simulações diretas provam que a sobreatenuação nominal da Hamming a torna mais curta na realidade.' },
        { title: 'Passo 5 e 6: Medição de Precisão', math: 'Rp = 0.0982 dB ≤ 0.5 dB\nAs = 40.64 dB ≥ 40 dB', desc: 'A Hamming (M=61) margeia perfeitamente a barreira de corte sem violá-la, provando ser o array minimizado definitivo.' }
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
          { title: 'Passo 1 e 2: Formulação da Ordem N', math: 'N = ⌈ log10((10^(0.025)-1) / (10^5-1)) / 2·log10(500/2000) ⌉\nN = ⌈ -6.2273 / -1.2041 ⌉ = 6', desc: 'As equações de perda são igualadas ao Rp e As exigidos. Dividindo ambas as equações, isolamos a ordem N, que deve ser sempre arredondada para o inteiro superior.' },
          { title: 'Passo 3 e 4: Frequência de Corte e Polos', math: 'Ωc = 500 / (0.05925)^(1/12) = 632.7668 rad/s\npk = Ωc · e^(j[π/2 + (2k+1)π/12])', desc: 'A convenção força o atendimento exato em Rp. Sendo N=6 (par), os polos distribuem-se a cada 30º no semiplano esquerdo (15º, 45º e 75º), sem cair no eixo real.' },
          { title: 'Passo 5 a 8: Forma Racional e Verificação', math: 'A(s) = ∏ (s - pk) -> s^6 + 2444.82s^5 + ...\nB = a0 = 6.418923 × 10^16\nHa(0) = 1', desc: 'Multiplicando os pares conjugados, as partes imaginárias anulam-se. O ganho contínuo em DC (s=0) é ajustado para 1. A medição em 2000 rad/s crava 59.97 dB (se fosse N=5, ficaria apenas em 47.93 dB).' }
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
          { title: 'Passo 1 e 2: Conversão e Ordem Limite', math: 'Ωp = 2π·10k = 62831.85 rad/s\nΩs = 2π·20k = 125663.71 rad/s\nN = ⌈ -5.4136 / -0.60206 ⌉ = 8.9917 -> 9', desc: 'Convertendo para rad/s, o cálculo da ordem resulta num valor criticamente próximo do inteiro (8.99). O arredondamento para 9 deixará pouca folga de atenuação.' },
          { title: 'Passo 3 e 4: Distribuição Ímpar dos Polos', math: 'Ωc = 62831.85 / 0.88970 = 70621.02 rad/s\np_real = -70621.02\nθk = kπ/9 (20º, 40º, 60º, 80º)', desc: 'Diferente da ordem par, N=9 garante um polo exatamente no eixo real negativo. O restante agrupa-se em 4 pares conjugados.' },
          { title: 'Passo 5 a 7: Formação da Cascata', math: 'Ha(s) = [Ωc / (s+Ωc)] · ∏ [Ωc² / (s² + 2Ωc cosθk s + Ωc²)]\nAs_medido = 45.05 dB', desc: 'A cascata é construída por 1 seção de 1ª ordem e 4 biquadráticas. O ganho DC de cada estágio é unitário. A medição passa raspando pelo limite (45.05 dB).' }
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
          { title: 'Passo 1 e 2: Equiripple e Ordem', math: 'ε = √(10^(0.1) - 1) = 0.5088\ng = √(10^5 - 1) / ε = 621.46\nN = ⌈ cosh⁻¹(621.46)/cosh⁻¹(1.5) ⌉ = 8', desc: 'O fator de ondulação (ε) define a amplitude das oscilações na passagem. A resposta cai tão agressivamente que N=8 atende, enquanto um Butterworth precisaria de N=16.' },
          { title: 'Passo 3 e 4: A Elipse de Chebyshev', math: 'α = 1/ε + √(1 + 1/ε²) = 4.1702\naΩp = 1.7945, bΩp = 10.1597', desc: 'Os polos deixam de formar um círculo perfeito e posicionam-se numa elipse de semieixos a (real) e b (imaginário), mais próximos do eixo jω gerando as ondulações.' },
          { title: 'Passo 5 e 6: Sintonia Fina do Ganho', math: 'Ha(0) = B / a0 = 1 / √(1+ε²) = 0.8913 (-1 dB)\nAs_medido = 54.99 dB', desc: 'Como N é par, o valor em frequência zero cai obrigatoriamente num vale da ondulação. O numerador deve ser corrigido dividindo-se o termo independente (a0) pela variação ε.' }
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
    w, h = signal.freqs(b, a, worN=np.linspace(0, 30, 2000))`
      },
      {
        id: 'P8.15', cap: 8, title: 'P8.15 - Chebyshev-I (Cascata)', type: 'lowpass',
        specs: { as: -64.49, rp: -0.5, cuts: [0.1], limitAs: -45 },
        steps: [
          { title: 'Passo 1 e 2: Folga Acumulada no Arredondamento', math: 'Ωp = 25132.74, Ωs = 125663.71 rad/s\nε = √(10^(0.05)-1) = 0.3493\nN = ⌈ 6.9257 / 2.2924 ⌉ = ⌈ 3.021 ⌉ = 4', desc: 'O cálculo matemático aponta N = 3.021. Se usássemos N=3, a atenuação ficaria reprovada por apenas 0.42 dB. Ao forçar N=4, ganhamos uma folga colossal na banda de rejeição.' },
          { title: 'Passo 3 e 4: Biquads e Raízes', math: 'aΩp = 11516.32, bΩp = 27645.62\nBiquad = s² + 2σ s + |p|²', desc: 'Os quatro polos são agrupados em dois fatores quadráticos (SOS), evitando a instabilidade numérica de processar um denominador polinomial de grau superior.' },
          { title: 'Passo 5 e 6: Validação Final', math: 'G_global = 1 / √(1+0.3493²) = 0.94406\nAs = 64.49 dB', desc: 'A atenuação salta quase 20 dB acima do exigido (45 dB) devido ao teto (ceiling) na função de ordem de Chebyshev, confirmando a robustez suprema do filtro em altas frequências.' }
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