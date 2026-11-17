# Euterpe-Aqua 

Ecossistema tecnológico voltado ao reaproveitamento sustentável do caroço de açaí (*Euterpe oleracea*) para extração de taninos condensados, aplicados como coagulantes naturais no tratamento de águas e efluentes de mineração.

> Projeto submetido às competições **Solve For Tomorrow Brasil** e **FECITIS-PARÁ**, integrando hardware de baixo custo e economia solidária.

---

## UsiTan — Usina Piloto Automatizada de Extração de Tanino

Código-fonte em **C++** responsável pela automação, controle térmico de precisão e segurança operacional da usina.

### Demonstração Interativa
* **Simulação Virtual (Wokwi):** [Clique aqui para acessar o circuito e rodar o código no navegador](https://wokwi.com/projects/473982949493117953)

### Arquitetura de Hardware e Componentes
* **Microcontrolador:** Arduino Uno.
* **Monitoramento Térmico:** Sensor à prova d'água DS18B20 (protocolo One-Wire) com leitura assíncrona a cada 1 segundo.
* **Controle de Aquecimento:** Módulo Relé para acionamento controlado da resistência térmica.
* **Agitação Mecânica:** Misturador automatizado (simulado via Servo Motor no Wokwi) para acelerar a lixiviação dos taninos.
* **Interface e Segurança:** Display LCD I2C 16x2, LEDs indicadores de operação normal e alerta, e botões físicos dedicados de ligar e desligar (instantâneo).

### Funcionalidades Implementadas no Código
* **Controle Térmico e Ciclo Automatizado:** Aquece a solução até a faixa ideal de 70 °C a 80 °C, estabilizando a temperatura e iniciando o ciclo cronometrado de agitação (30 minutos).
* **Leitura Não-Bloqueante (`millis`):** Uso de temporizadores assíncronos e conversão sem espera no sensor, garantindo resposta imediata dos botões sem travar o microcontrolador.
* **Proteção Contra Superaquecimento:** Se a temperatura ultrapassar 80 °C, o sistema corta imediatamente o relé de aquecimento, para o misturador e exibe `ALERTA: SUPERAQ.` no visor.

---

## Gira Açaí — Aplicativo de Economia Solidária

Aplicativo mobile prototipado no Figma cujo desenvolvimento de código inicia em 18/11, com atualizações hospedadas neste repositório.

### Objetivo
Conectar batedores de açaí (fornecedores de caroços), cooperativas extratoras de tanino, agricultores familiares (que aproveitam o composto orgânico residual) e comércios locais, incentivando a logística reversa por meio de um sistema de pontos.

### Funcionalidades Planejadas (MVP)
* **Gestão Multi-Perfil:** Interfaces dedicadas para Batedores, Extratores, Agricultores e Lojas Parceiras.
* **Rastreabilidade e Coleta:** Registro de entregas via QR Code, controle de lotes de extração e mapa interativo de ecopontos.
* **Sistema de Pontos:** Acúmulo e resgate de pontos por benefícios e descontos em comércios parceiros, além de recursos de acessibilidade nativa.

### Stack Tecnológica Definida
* **Front-end:** TypeScript com React Native e Expo.
* **Back-end:** SQL com banco de dados relacional PostgreSQL via Supabase.

---

## Mais sobre o projeto

### Principais Referências Bibliográficas
* **VELASCO, M. F.; BRASIL, D. S. B.** *Obtenção de Floculante Vegetal Catiônico a partir de Taninos Extraídos dos Resíduos Sólidos da Produção de Açaí no Estado do Pará.* Congresso Internacional de Tecnologias para o Meio Ambiente, 2018.
* **DA SILVA, L. C. et al.** *Natural coagulant for water treatment based on cationized tannins from Terminalia catappa bark.* Ambiente & Água, v. 20, 2025.
* **LUCAS, K. et al.** *Utilização de agitação mecânica na extração de taninos do resíduo oriundo da indústria de beneficiamento de Cocos nucifera.* Agropecuária Científica no Semiárido, v. 20, n. 2, 2024.
* **DE FREITAS MAIA, C. M. B. et al.** *Biochar as a sustainable alternative to açaí waste disposal in Amazon, Brazil.* Process Safety and Environmental Protection, v. 139, 2020.

---

###  Autoria Técnica
Desenvolvimento de código e prototipação UI/UX 
*Equipe Euterpe-Aqua — Parauapebas-PA.*
