// src/dataIir.js

export const iirData = [
    {
      id: 'P8.12',
      cap: 8,
      title: 'P8.12 - Butterworth analógico passa-baixas (Forma Racional)',
      type: 'lowpass',
      enunciado: 'Projete um filtro analógico passa-baixas de Butterworth que tenha ondulação de 0.25 dB ou melhor em 500 rad/s e pelo menos 50 dB de atenuação em 2000 rad/s. Determine a função de sistema na forma de função racional. Trace a resposta em magnitude, a resposta em log-magnitude em dB, a resposta de fase e a resposta ao impulso do filtro.',
      enunciadoOriginal: 'Design an analog Butterworth lowpass filter that has a 0.25 dB or better ripple at 500 rad/sec and at least 50 dB of attenuation at 2000 rad/sec. Determine the system function in a rational function form. Plot the magnitude response, the log-magnitude response in dB, the phase response, and the impulse response of the filter.',
      dados: [
        { grandeza: 'Ωp', valor: '500 rad/s', obs: 'Borda da faixa de passagem' },
        { grandeza: 'Rp', valor: '0.25 dB', obs: 'Perda máxima até Ωp (|H| ≥ 0.9716)' },
        { grandeza: 'Ωs', valor: '2000 rad/s', obs: 'Borda da faixa de rejeição' },
        { grandeza: 'As', valor: '50 dB', obs: 'Atenuação mínima a partir de Ωs' },
        { grandeza: 'Forma pedida', valor: 'Racional Ha(s) = B(s)/A(s)', obs: 'Polinômio expandido' }
      ],
      specs: { as: -59.97, rp: -0.25, cuts: [0.2], limitAs: -50 },
      steps: [
        {
          title: 'Passo 1 - Equações de perda nas bordas do modelo Butterworth',
          math: '|Ha(jΩ)|² = 1 / [1 + (Ω / Ωc)^(2N)]   ⇒   L(Ω) = 10 · log10[1 + (Ω / Ωc)^(2N)]\nEm Ωp = 500:  (500 / Ωc)^(2N) = 10^(0.25 / 10) - 1 = 10^(0.025) - 1 = 0.059254\nEm Ωs = 2000: (2000 / Ωc)^(2N) = 10^(50 / 10) - 1 = 10^5 - 1 = 99999',
          desc: 'Partimos da equação de perda em dB do protótipo Butterworth com duas incógnitas: N e Ωc.'
        },
        {
          title: 'Passo 2 - Calcular a ordem mínima N',
          math: '(500 / 2000)^(2N) = 0.059254 / 99999 = 5.9254 × 10^-7\nN = log10(5.9254 × 10^-7) / [2 · log10(0.25)] = -6.22728 / -1.20412 = 5.1716\nArredondando para cima: N = 6',
          desc: 'Dividindo uma equação pela outra eliminamos Ωc. Com N = 5 a atenuação seria 47.93 dB < 50 dB.'
        },
        {
          title: 'Passo 3 - Calcular a frequência de corte Ωc (-3 dB)',
          math: '(500 / Ωc)^12 = 0.059254  ⇒  (0.059254)^(1/12) = 10^(-1.22728 / 12) = 10^(-0.10227) = 0.79018\nΩc = 500 / 0.79018 = 632.7668 rad/s',
          desc: 'Pela convenção do livro, impomos perda exata de 0.25 dB em Ωp = 500 rad/s, jogando a folga para Ωs.'
        },
        {
          title: 'Passo 4 - Localizar os 6 polos estáveis no semiplano esquerdo',
          math: 'φk = 90° + (2k + 1) · 180° / 12 = 105°, 135°, 165°, 195°, 225°, 255°\np0, p5 (φ = 105°, 255°): 632.7668 · (-0.25882 ± j0.96593) = -163.7721 ± j611.2058\np1, p4 (φ = 135°, 225°): 632.7668 · (-0.70711 ± j0.70711) = -447.4337 ± j447.4337\np2, p3 (φ = 165°, 195°): 632.7668 · (-0.96593 ± j0.25882) = -611.2058 ± j163.7721',
          desc: 'Polos distribuídos sobre o semicírculo esquerdo de raio Ωc = 632.7668 rad/s.'
        },
        {
          title: 'Passo 5 - Agrupar pares conjugados em fatores de 2ª ordem',
          math: 'Ωc² = (632.7668)² = 400393.9\nθ = 75°: s² + 2(632.7668)(0.25882)s + 400393.9 = s² + 327.54s + 400393.9\nθ = 45°: s² + 2(632.7668)(0.70711)s + 400393.9 = s² + 894.87s + 400393.9\nθ = 15°: s² + 2(632.7668)(0.96593)s + 400393.9 = s² + 1222.41s + 400393.9',
          desc: 'Ao multiplicar (s - p)(s - p*), as partes imaginárias se cancelam.'
        },
        {
          title: 'Passo 6 - Expandir polinômio para a Forma Racional Ha(s)',
          math: 'a5 = 327.54 + 894.87 + 1222.41 = 2444.823  |  a0 = (Ωc²)^3 = Ωc^6 = 6.418923 × 10^16\nA(s) = s^6 + 2444.823s^5 + 2.988580×10^6 s^4 + 2.316084×10^9 s^3 + 1.196609×10^12 s^2 + 3.919424×10^14 s + 6.418923×10^16\nHa(s) = 6.418923 × 10^16 / A(s)   (Ganho DC Ha(0) = 1)',
          desc: 'Multiplicação completa dos três trinômios quadráticos.'
        }
      ],
      verificacao: [
        { criterio: 'Perda em Ωp (500 rad/s)', obtido: '0.2500 dB', exigido: '≤ 0.25 dB', status: 'Atende ✓' },
        { criterio: 'Atenuação em Ωs (2000 rad/s)', obtido: '59.974 dB', exigido: '≥ 50 dB', status: 'Atende ✓' },
        { criterio: 'Teste com N = 5', obtido: '47.933 dB', exigido: '≥ 50 dB', status: 'Insuficiente (confirma N=6)' }
      ],
      code: `# Python 3.10 - P8.12: Butterworth Analógico na Forma Racional
  import numpy as np
  from scipy import signal
  
  Wp, Ws = 500.0, 2000.0
  Rp, As = 0.25, 50.0
  
  N = int(np.ceil(np.log10((10**(Rp/10) - 1) / (10**(As/10) - 1)) / (2 * np.log10(Wp / Ws))))
  Wc = Wp / ((10**(Rp/10) - 1)**(1 / (2 * N)))
  
  k = np.arange(N)
  poles = Wc * np.exp(1j * (np.pi / 2 + (2 * k + 1) * np.pi / (2 * N)))
  A_s = np.real(np.poly(poles))
  B_s = [Wc**N]`
    },
    {
      id: 'P8.13',
      cap: 8,
      title: 'P8.13 - Butterworth analógico passa-baixas (Forma em Cascata)',
      type: 'lowpass',
      enunciado: 'Projete um filtro analógico passa-baixas de Butterworth que tenha ondulação de 0.5 dB ou melhor em 10 kHz e pelo menos 45 dB de atenuação em 20 kHz. Determine a função de sistema na forma em cascata. Trace a resposta em magnitude, a resposta em log-magnitude em dB, o atraso de grupo e a resposta ao impulso do filtro.',
      enunciadoOriginal: 'Design an analog Butterworth lowpass filter that has a 0.5 dB or better ripple at 10 kHz and at least 45 dB of attenuation at 20 kHz. Determine the system function in a cascade form. Plot the magnitude response, the log-magnitude response in dB, the group-delay, and the impulse response of the filter.',
      dados: [
        { grandeza: 'Fp / Ωp', valor: '10 kHz (62831.85 rad/s)', obs: 'Borda da faixa de passagem' },
        { grandeza: 'Rp', valor: '0.5 dB', obs: 'Perda máxima até 10 kHz' },
        { grandeza: 'Fs / Ωs', valor: '20 kHz (125663.71 rad/s)', obs: 'Borda da faixa de rejeição' },
        { grandeza: 'As', valor: '45 dB', obs: 'Atenuação mínima a partir de 20 kHz' },
        { grandeza: 'Forma pedida', valor: 'Cascata (1ª ordem + Biquads)', obs: 'Com atraso de grupo τ(Ω)' }
      ],
      specs: { as: -45.05, rp: -0.5, cuts: [0.25], limitAs: -45 },
      steps: [
        {
          title: 'Passo 1 - Converter frequências de Hz para rad/s',
          math: 'Ωp = 2π · 10000 = 62831.85 rad/s\nΩs = 2π · 20000 = 125663.71 rad/s   (Razão Ωp / Ωs = 0.5)',
          desc: 'As equações do protótipo analógico operam em frequência angular Ω.'
        },
        {
          title: 'Passo 2 - Calcular a ordem mínima N',
          math: '10^(0.05) - 1 = 0.12202  |  10^(4.5) - 1 = 31621.78\nN = log10(0.12202 / 31621.78) / [2 · log10(0.5)] = -5.4136 / -0.60206 = 8.9917  ⇒  N = 9',
          desc: 'Como 8.9917 é quase 9, a folga na rejeição será mínima (0.05 dB).'
        },
        {
          title: 'Passo 3 - Frequência de corte Ωc',
          math: '(0.12202)^(1/18) = 10^(-0.05075) = 0.88970\nΩc = 62831.85 / 0.88970 = 70621.02 rad/s   (Fc = 11239.68 Hz)',
          desc: 'Frequência de -3 dB do filtro Butterworth.'
        },
        {
          title: 'Passo 4 - Localizar os 9 polos (1 polo real + 4 pares conjugados)',
          math: 'φk = 90° + (2k + 1) · 10° = 100°, 120°, 140°, 160°, 180°, 200°, 220°, 240°, 260°\nPolo real (180°): p4 = -70621.02 rad/s\nθ = 20° (160°/200°): -66362.05 ± j24153.81\nθ = 40° (140°/220°): -54098.84 ± j45394.32\nθ = 60° (120°/240°): -35310.51 ± j61159.60\nθ = 80° (100°/260°): -12263.21 ± j69548.13',
          desc: 'Com N ímpar, sempre há um polo puramente real em s = -Ωc.'
        },
        {
          title: 'Passo 5 - Montar as seções da forma em cascata (Ωc² = 4.987329 × 10^9)',
          math: '• Seção 1ª ordem (θ = 0°):  70621.02 / (s + 70621.02)\n• Biquad 1 (θ = 20°): 4.987329×10^9 / (s² + 132724.11s + 4.987329×10^9)\n• Biquad 2 (θ = 40°): 4.987329×10^9 / (s² + 108197.68s + 4.987329×10^9)\n• Biquad 3 (θ = 60°): 4.987329×10^9 / (s² + 70621.02s  + 4.987329×10^9)\n• Biquad 4 (θ = 80°): 4.987329×10^9 / (s² + 24526.42s  + 4.987329×10^9)\nGanho global G = 1 (cada seção tem ganho DC unitário)',
          desc: 'Ha(s) é o produto dessas 5 seções.'
        },
        {
          title: 'Passo 6 - Atraso de grupo τ(Ω) e verificação',
          math: 'τ(Ω) = -d∠Ha(jΩ)/dΩ = ∑ [ -σk / (σk² + (Ω - ωk)²) ]\nVale 81.5 µs em DC e atinge pico de 153 µs perto de 10.9 kHz.\nL(10 kHz) = 0.5000 dB (✓) | L(20 kHz) = 45.05 dB ≥ 45 dB (✓)',
          desc: 'Com N = 8 a atenuação em 20 kHz cairia para 39.03 dB < 45 dB.'
        }
      ],
      verificacao: [
        { criterio: 'Perda em 10 kHz', obtido: '0.5000 dB', exigido: '≤ 0.5 dB', status: 'Atende ✓' },
        { criterio: 'Atenuação em 20 kHz', obtido: '45.05 dB', exigido: '≥ 45 dB', status: 'Atende ✓' },
        { criterio: 'Teste com N = 8', obtido: '39.03 dB', exigido: '≥ 45 dB', status: 'Insuficiente (confirma N=9)' }
      ],
      code: `# Python 3.10 - P8.13: Butterworth Analógico em Cascata
  import numpy as np
  
  Wp = 2 * np.pi * 10000
  Ws = 2 * np.pi * 20000
  Rp, As = 0.5, 45.0
  
  N = 9
  Wc = Wp / ((10**(Rp/10) - 1)**(1 / (2 * N)))
  Wc2 = Wc**2
  
  thetas = np.deg2rad([20, 40, 60, 80])
  biquads_b1 = 2 * Wc * np.cos(thetas)  # Coeficientes de s em cada biquad`
    },
    {
      id: 'P8.14',
      cap: 8,
      title: 'P8.14 - Chebyshev-I analógico passa-baixas (Forma Racional)',
      type: 'lowpass',
      enunciado: 'Projete um filtro analógico passa-baixas Chebyshev tipo I com ondulação aceitável de 1 dB para |Ω| ≤ 10 e atenuação de 50 dB ou mais além de |Ω| = 15 rad/s. Determine a função de sistema na forma de função racional. Trace a resposta em magnitude, a resposta em log-magnitude em dB, o atraso de grupo e a resposta ao impulso do filtro.',
      enunciadoOriginal: 'Design a lowpass analog Chebyshev-I filter with an acceptable ripple of 1 dB for |Ω| ≤ 10 and an attenuation of 50 dB or greater beyond |Ω| = 15 rad/sec. Determine the system function in a rational function form. Plot the magnitude response, the log-magnitude response in dB, the group-delay, and the impulse response of the filter.',
      dados: [
        { grandeza: 'Ωp', valor: '10 rad/s', obs: 'Borda da faixa de passagem (Ωc = Ωp)' },
        { grandeza: 'Rp', valor: '1 dB', obs: 'Ondulação equiripple na passagem (entre 1 e 0.8913)' },
        { grandeza: 'Ωs', valor: '15 rad/s', obs: 'Borda da faixa de rejeição (Ωs/Ωp = 1.5)' },
        { grandeza: 'As', valor: '50 dB', obs: 'Atenuação mínima em Ωs' },
        { grandeza: 'Forma pedida', valor: 'Racional Ha(s) = K / A(s)', obs: 'Comparar ordem com Butterworth' }
      ],
      specs: { as: -54.99, rp: -1.0, cuts: [0.33], limitAs: -50 },
      steps: [
        {
          title: 'Passo 1 - Calcular os parâmetros ε, A e g',
          math: 'ε = √(10^(0.10) - 1) = √0.258925 = 0.508847\nA = 10^(50 / 20) = 10^(2.50) = 316.228\ng = √(A² - 1) / ε = 316.226 / 0.508847 = 621.456',
          desc: 'ε controla a altura da ondulação na passagem: |H| oscila entre 1 e 1/√(1+ε²) = 0.89125 (-1 dB).'
        },
        {
          title: 'Passo 2 - Calcular a ordem N via cosseno hiperbólico inverso',
          math: 'cosh⁻¹(x) = ln[x + √(x² - 1)]\ncosh⁻¹(621.456) = ln(1242.911) = 7.12521\ncosh⁻¹(Ωs / Ωp) = cosh⁻¹(1.5) = ln(1.5 + √1.25) = ln(2.61803) = 0.96242\nN = ⌈7.12521 / 0.96242⌉ = ⌈7.403⌉ = 8   (Um Butterworth precisaria de N = 16!)',
          desc: 'Aceitar 1 dB de ondulação na passagem reduz a ordem do filtro pela metade (de 16 para 8).'
        },
        {
          title: 'Passo 3 - Determinar a elipse dos polos (Ωc = Ωp = 10 rad/s)',
          math: 'α = 1/ε + √(1 + 1/ε²) = 1.96523 + 2.20502 = 4.17025\nα^(1/8) = 1.19542,   α^(-1/8) = 0.83653\na = 0.5 · (1.19542 - 0.83653) = 0.17945  ⇒  semieixo real aΩc = 1.7945 rad/s\nb = 0.5 · (1.19542 + 0.83653) = 1.01597  ⇒  semieixo imag bΩc = 10.1597 rad/s',
          desc: 'Os polos do Chebyshev-I ficam sobre uma elipse achatada no semiplano esquerdo.'
        },
        {
          title: 'Passo 4 - Calcular os 8 polos sobre a elipse',
          math: 'φk = 90° + (2k + 1) · 11.25°,   pk = (aΩc)cos(φk) + j(bΩc)sen(φk)\nφ = 101.25° (p0, p7): 1.7945(-0.19509) ± j10.1597(0.98079) = -0.35008 ± j9.96451\nφ = 123.75° (p1, p6): 1.7945(-0.55557) ± j10.1597(0.83147) = -0.99695 ± j8.44751\nφ = 146.25° (p2, p5): 1.7945(-0.83147) ± j10.1597(0.55557) = -1.49204 ± j5.64444\nφ = 168.75° (p3, p4): 1.7945(-0.98079) ± j10.1597(0.19509) = -1.75998 ± j1.98206',
          desc: 'O par mais próximo do eixo imaginário (-0.35 ± j9.96) cria o pico de atraso de grupo (3.28 s em 10 rad/s).'
        },
        {
          title: 'Passo 5 - Forma Racional A(s) e ajuste do ganho K para N par',
          math: 'A(s) = ∏(s - pk) = s^8 + 9.1981s^7 + 242.3026s^6 + 1655.156s^5 + 18369.02s^4 + 84682.43s^3 + 4.478257×10^5 s^2 + 1.073447×10^6 s + 1.722672×10^6\nComo N = 8 é par (começa num vale em Ω=0):\nK = a0 / √(1 + ε²) = 1.722672×10^6 / 1.12202 = 1.535333 × 10^6\nHa(s) = 1.535333 × 10^6 / A(s)   ⇒   Ha(0) = 0.89125 (-1.00 dB)',
          desc: 'Se N fosse ímpar, K seria igual a a0. Como N é par, divide-se por √(1+ε²).'
        }
      ],
      verificacao: [
        { criterio: 'Ondulação em [0, 10 rad/s]', obtido: '1.0000 dB (4 cristas)', exigido: '≤ 1 dB', status: 'Atende ✓' },
        { criterio: 'Atenuação em 15 rad/s', obtido: '54.987 dB', exigido: '≥ 50 dB', status: 'Atende ✓' },
        { criterio: 'Teste com N = 7', obtido: '46.628 dB', exigido: '≥ 50 dB', status: 'Insuficiente (confirma N=8)' }
      ],
      code: `# Python 3.10 - P8.14: Chebyshev-I Analógico na Forma Racional
  import numpy as np
  
  Wp, Ws = 10.0, 15.0
  Rp, As = 1.0, 50.0
  
  eps = np.sqrt(10**(Rp / 10) - 1)
  A = 10**(As / 20)
  g = np.sqrt(A**2 - 1) / eps
  N = int(np.ceil(np.arccosh(g) / np.arccosh(Ws / Wp)))  # N = 8
  
  alpha = 1 / eps + np.sqrt(1 + 1 / eps**2)
  a = 0.5 * (alpha**(1 / N) - alpha**(-1 / N))
  b = 0.5 * (alpha**(1 / N) + alpha**(-1 / N))
  
  k = np.arange(N)
  phi = np.pi / 2 + (2 * k + 1) * np.pi / (2 * N)
  poles = (a * Wp) * np.cos(phi) + 1j * (b * Wp) * np.sin(phi)
  A_s = np.real(np.poly(poles))
  K = A_s[-1] / np.sqrt(1 + eps**2)`
    },
    {
      id: 'P8.15',
      cap: 8,
      title: 'P8.15 - Chebyshev-I analógico passa-baixas (Forma em Cascata)',
      type: 'lowpass',
      enunciado: 'Projete um filtro analógico passa-baixas Chebyshev tipo I com as seguintes características: ondulação de 0.5 dB na faixa de passagem, frequência de corte da faixa de passagem de 4 kHz e atenuação na faixa de rejeição de 45 dB ou mais além de 20 kHz. Determine a função de sistema na forma em cascata. Trace a resposta em magnitude, a resposta em log-magnitude em dB, a resposta de fase e a resposta ao impulso do filtro.',
      enunciadoOriginal: 'Design a lowpass analog Chebyshev-I filter with the following characteristics: A passband ripple of 0.5 dB, passband cutoff frequency of 4 kHz, and stopband attenuation of 45 dB or greater beyond 20 kHz. Determine the system function in a cascade form. Plot the magnitude response, the log-magnitude response in dB, the phase response, and the impulse response of the filter.',
      dados: [
        { grandeza: 'Fp / Ωp', valor: '4 kHz (25132.74 rad/s)', obs: 'Borda da faixa de passagem' },
        { grandeza: 'Rp', valor: '0.5 dB', obs: 'Ondulação na passagem (|H| entre 1 e 0.9441)' },
        { grandeza: 'Fs / Ωs', valor: '20 kHz (125663.71 rad/s)', obs: 'Borda da rejeição (Ωs/Ωp = 5)' },
        { grandeza: 'As', valor: '45 dB', obs: 'Atenuação mínima além de 20 kHz' },
        { grandeza: 'Forma pedida', valor: 'Cascata de Biquads', obs: 'Produto de seções de 2ª ordem' }
      ],
      specs: { as: -64.49, rp: -0.5, cuts: [0.1], limitAs: -45 },
      steps: [
        {
          title: 'Passo 1 - Converter frequências para rad/s e calcular ε, A e g',
          math: 'Ωp = 2π · 4000 = 25132.74 rad/s  |  Ωs = 2π · 20000 = 125663.71 rad/s  (Ωs/Ωp = 5)\nε = √(10^(0.05) - 1) = √0.122018 = 0.349311\nA = 10^(45 / 20) = 10^(2.25) = 177.828\ng = √(A² - 1) / ε = 177.825 / 0.349311 = 509.073',
          desc: 'Parâmetros iniciais do protótipo Chebyshev-I.'
        },
        {
          title: 'Passo 2 - Calcular a ordem mínima N',
          math: 'cosh⁻¹(509.073) = ln(1018.146) = 6.92574\ncosh⁻¹(5.0) = ln(5 + √24) = ln(9.89898) = 2.29243\nN = ⌈6.92574 / 2.29243⌉ = ⌈3.021⌉ = 4',
          desc: 'Como 3.021 passou ligeiramente de 3, o arredondamento para N = 4 gerará quase 20 dB de folga em 20 kHz (com N = 3 daria 44.58 dB, faltando 0.42 dB).'
        },
        {
          title: 'Passo 3 - Semieixos da elipse dos polos',
          math: 'α = 1/ε + √(1 + 1/ε²) = 2.86278 + 3.03241 = 5.8952\nα^(1/4) = 1.55820,   α^(-1/4) = 0.64176\na = 0.5 · (1.55820 - 0.64176) = 0.45822  ⇒  aΩp = 11516.3160 rad/s\nb = 0.5 · (1.55820 + 0.64176) = 1.09998  ⇒  bΩp = 27645.6184 rad/s',
          desc: 'Semieixos real e imaginário escalonados por Ωp = 25132.74 rad/s.'
        },
        {
          title: 'Passo 4 - Calcular os 4 polos (2 pares conjugados)',
          math: 'φk = 90° + (2k + 1) · 22.50° = 112.5°, 157.5°, 202.5°, 247.5°\nPar 1 (φ = 112.5°): 11516.32(-0.38268) ± j27645.62(0.92388) = -4407.1033 ± j25541.2210\nPar 2 (φ = 157.5°): 11516.32(-0.92388) ± j27645.62(0.38268) = -10639.6886 ± j10579.5201',
          desc: 'Polos localizados no semiplano esquerdo.'
        },
        {
          title: 'Passo 5 - Montar os 2 Biquads e o ganho global G',
          math: 'Cada par p = -σ ± jωd forma: |p|² / (s² + 2σs + σ² + ωd²)\n• Biquad 1: 2σ = 8814.21,  |p|² = 6.7178×10^8  ⇒  6.7178×10^8 / (s² + 8814.21s + 6.7178×10^8)\n• Biquad 2: 2σ = 21279.38, |p|² = 2.2513×10^8  ⇒  2.2513×10^8 / (s² + 21279.38s + 2.2513×10^8)\nGanho global (N=4 par): G = 1 / √(1 + ε²) = 1 / √(1 + 0.122018) = 0.94406',
          desc: 'Ha(s) é o produto de G = 0.94406 pelos dois biquads.'
        }
      ],
      verificacao: [
        { criterio: 'Perda máx. até 4 kHz', obtido: '0.5000 dB', exigido: '≤ 0.5 dB', status: 'Atende ✓' },
        { criterio: 'Atenuação em 20 kHz', obtido: '64.491 dB', exigido: '≥ 45 dB', status: 'Atende (folga +19.5 dB) ✓' },
        { criterio: 'Teste com N = 3', obtido: '44.579 dB', exigido: '≥ 45 dB', status: 'Insuficiente (faltam 0.42 dB)' }
      ],
      code: `# Python 3.10 - P8.15: Chebyshev-I Analógico em Cascata (N = 4)
  import numpy as np
  
  Wp = 2 * np.pi * 4000
  Ws = 2 * np.pi * 20000
  Rp, As = 0.5, 45.0
  
  eps = np.sqrt(10**(Rp / 10) - 1)
  N = 4
  alpha = 1 / eps + np.sqrt(1 + 1 / eps**2)
  a = 0.5 * (alpha**(1 / N) - alpha**(-1 / N))
  b = 0.5 * (alpha**(1 / N) + alpha**(-1 / N))
  
  G = 1.0 / np.sqrt(1 + eps**2)  # 0.94406`
    }
  ];