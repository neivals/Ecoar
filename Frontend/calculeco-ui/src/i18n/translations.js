const translations = {
    ptbr: {
        navbar: {
            calculadora: "Calculadora",
            informacoes: "Informações",
            acessibilidade: "Acessibilidade",
        },
        formulario: {
            descricao:
                "A CalculECO tem como objetivo calcular e comparar os impactos ambientais gerados pelo uso de cartões de benefício físicos e digitais. Preencha os campos abaixo para iniciar o cálculo.",
            preencha: "Preencha:",
            recursos: "Recursos",
            co2: "Liberação de CO2",
            agua: "Consumo de água",
            energia: "Uso de energia elétrica",
            materiais: "Descarte de materiais",
            regiao: "Região",
            enderecoPlaceholder: "Digite o endereço...",
            periodo: "Período",
            selecionePeriodo: "Selecione o período",
            seisMeses: "Seis meses",
            umAno: "Um ano",
            tresAnos: "Três anos",
            cincoAnos: "Cinco anos",
            calcular: "Calcular",
        },
        resultado: {
            comparacaoModalidades: "Comparação dentre modalidades de cartões",
            totalCO2: "Total de CO2 emitido por cada cartão",
            quantidadeRecursosConsumidos: "Quantidade de recursos consumidos",
            quantidadeEnergiaUsada: "Quantidade de energia elétrica usada",
            fisico: "Físico",
            digital: "Digital",
            impactoAmbiental: (kg) =>
                `Ao usar o Cartão de Benefícios Digital, causa um impacto ambiental de ${kg}Kg a menos do que causaria usando o Cartão Físico.`,
            comparacaoTempo: "Comparação por tempo",
            cartaoDigitalEmite: (kg) =>
                `Dentro de 1 ano, o cartão digital emite ${kg}Kg de CO2 menos que o físico!`,
            cartaoDigitalEmitePorcentagem: (porcentagem) =>
                `Dentro de 1 ano, o cartão digital gasta ${porcentagem}% menos que o físico.`,
            recursos: "Recursos",
            energia: "Energia",
            energiaConsome: (kwh) =>
                `Dentro de 1 ano, o cartão físico e digital consomem ${kwh}KWh`,
            agua: "Água",
            aguaGasta: (litros) =>
                `Dentro de 1 ano, a produção dos cartões físicos gasta no total ${litros}L`,
            plastico: "Plástico",
            plasticoConsome: (kg) =>
                `Dentro de 1 ano, a produção dos cartões físicos consome no total ${kg}Kg de plástico`,
            arvoresSalvas: "Árvores salvas",
            arvoresSalvasTexto: (kg, arvores) =>
                `Com ${kg}Kg de CO2 economizados, ${arvores} árvores são salvas por mês.`,
        },
        conscientizacao: {
            titulo: "(Junção de informações)",
            texto: (porcentagem) =>
                `A partir do momento em que você começa a usar o nosso Cartão de Benefícios Digital, seu impacto ambiental diminui em ${porcentagem}% em comparação ao Cartão Físico.`,
            textosPorPeriodo: {
                SEISMESES: (porcentagem) =>
                    `Em seis meses usando o Cartão de Benefícios Digital, seu impacto ambiental pode diminuir em ${porcentagem}% em comparação ao Cartão Físico. Pequenas escolhas já começam a reduzir emissões rapidamente.`,
                UMANO: (porcentagem) =>
                    `Em um ano usando o Cartão de Benefícios Digital, seu impacto ambiental pode diminuir em ${porcentagem}% em comparação ao Cartão Físico. Esse período mostra como a troca de hábito gera uma economia ambiental consistente.`,
                TRESANOS: (porcentagem) =>
                    `Em três anos usando o Cartão de Benefícios Digital, seu impacto ambiental pode diminuir em ${porcentagem}% em comparação ao Cartão Físico. A continuidade da escolha amplia a redução de CO2, água e materiais.`,
                CINCOANOS: (porcentagem) =>
                    `Em cinco anos usando o Cartão de Benefícios Digital, seu impacto ambiental pode diminuir em ${porcentagem}% em comparação ao Cartão Físico. No longo prazo, a opção digital ajuda a evitar impactos acumulados na natureza.`,
            },
            saibaMais: "Saiba mais",
        },
        informacoes: {
            conscientizacaoTitulo: "CONSCIENTIZAÇÃO",
            conscientizacaoTexto: (kg, arvores) =>
                `Com ${kg}Kg de CO2 economizados, ${arvores} árvores são salvas por mês.`,
            semCalculo: "Preencha os campos da calculadora para ver nessa seção aplicações práticas resultantes da redução do seu impacto ambiental.",
            infoTitulo: "INFO SOBRE COMO É FEITO O CÁLCULO",
            infoTexto:
                "Para chegarmos aos resultados apresentados na calculadora, o calculo se baseia em diversas etapas, primeiramente calculamos a emissão de CO2 em Kg. Juntando a emissão na produção, emissão no transporte, emissão nas transações e a emissão no descarte, se houver no período selecionado, chegamos à emissão total de CO2 de um cartão físico, que será comparado com a emissão nas transações de um cartão digital. Na próxima etapa, calculamos mais recursos importantes a serem contabilizados no impacto ambiental, a energia total gasta em KWh pelo total de transações feitas por ambos os cartões, a água total gasta em litros na produção dos cartões físicos e o plástico total gasto em Kg também na produção dos cartões físicos. Por último, calculamos uma média de árvores que seriam salvas mensalmente por meio do CO2 que seria poupado caso os cartões físicos fossem trocados por cartões digitais." +
                "\nVALORES PADRÃO USADOS NA CALCULADORA - CARTÕES PRODUZIDOS POR MÊS: 10000; TRANSAÇÕES AO MÊS FEITAS POR CADA CARTÃO: 25",
            ctaTitulo: "Calcule os impactos do uso dos cartões!",
            ctaBotao: "Ir para a calculadora",
        },
        acessibilidade: {
            tamanho: "Tamanho:",
            filtroCores: "Filtro de cores",
            ativadoDesativado: "Ativado/desativado",
            grayscale: "Escala de cinza",
            deuteranopia: "Deuteranopia",
            protanopia: "Protanopia",
            tritanopia: "Tritanopia",
        },
    },
    eng: {
        navbar: {
            calculadora: "Calculator",
            informacoes: "Information",
            acessibilidade: "Accessibility",
        },
        formulario: {
            descricao:
                "CalculECO aims to calculate and compare the environmental impacts generated by the use of physical and digital benefit cards. Fill in the fields below to start the calculation.",
            preencha: "Fill in:",
            recursos: "Resources",
            co2: "CO2 Release",
            agua: "Water Consumption",
            energia: "Electricity Usage",
            materiais: "Material Disposal",
            regiao: "Region",
            enderecoPlaceholder: "Enter the address...",
            periodo: "Period",
            selecionePeriodo: "Select a period",
            seisMeses: "Six months",
            umAno: "One year",
            tresAnos: "Three years",
            cincoAnos: "Five years",
            calcular: "Calculate",
        },
        resultado: {
            comparacaoModalidades: "Comparison between card modalities",
            totalCO2: "Total CO2 emitted per card",
            quantidadeRecursosConsumidos: "Amount of resources consumed",
            quantidadeEnergiaUsada: "Amount of electricity used",
            fisico: "Physical",
            digital: "Digital",
            impactoAmbiental: (kg) =>
                `By using the Digital Benefit Card, it causes an environmental impact of ${kg}Kg less than using the Physical Card.`,
            comparacaoTempo: "Comparison over time",
            cartaoDigitalEmite: (kg) =>
                `Within 1 year, the digital card emits ${kg}Kg of CO2 less than the physical one!`,
            cartaoDigitalEmitePorcentagem: (porcentagem) =>
                `Within 1 year, the digital card uses ${porcentagem}% less than the physical one.`,
            recursos: "Resources",
            energia: "Energy",
            energiaConsome: (kwh) =>
                `Within 1 year, physical and digital cards consume ${kwh}KWh`,
            agua: "Water",
            aguaGasta: (litros) =>
                `Within 1 year, the production of physical cards spends a total of ${litros}L`,
            plastico: "Plastic",
            plasticoConsome: (kg) =>
                `Within 1 year, the production of physical cards consumes a total of ${kg}Kg of plastic`,
            arvoresSalvas: "Trees saved",
            arvoresSalvasTexto: (kg, arvores) =>
                `With ${kg}Kg of CO2 saved, ${arvores} trees are saved per month.`,
        },
        conscientizacao: {
            titulo: "(Joining of information)",
            texto: (porcentagem) =>
                `From the moment you start using our Digital Benefit Card, your environmental impact decreases by ${porcentagem}% compared to the Physical Card.`,
            textosPorPeriodo: {
                SEISMESES: (porcentagem) =>
                    `In six months using the Digital Benefit Card, your environmental impact can decrease by ${porcentagem}% compared to the Physical Card. Small choices already begin to reduce emissions quickly.`,
                UMANO: (porcentagem) =>
                    `In one year using the Digital Benefit Card, your environmental impact can decrease by ${porcentagem}% compared to the Physical Card. This period shows how changing habits creates consistent environmental savings.`,
                TRESANOS: (porcentagem) =>
                    `In three years using the Digital Benefit Card, your environmental impact can decrease by ${porcentagem}% compared to the Physical Card. Keeping this choice over time expands the reduction of CO2, water, and materials.`,
                CINCOANOS: (porcentagem) =>
                    `In five years using the Digital Benefit Card, your environmental impact can decrease by ${porcentagem}% compared to the Physical Card. Over the long term, the digital option helps avoid accumulated impacts on nature.`,
            },
            saibaMais: "Learn more",
        },
        informacoes: {
            conscientizacaoTitulo: "AWARENESS",
            conscientizacaoTexto: (kg, arvores) =>
                `With ${kg}Kg of CO2 saved, ${arvores} trees are saved per month.`,
            semCalculo: "Fill in the calculator fields to see practical applications resulting from the reduction of your environmental impact in this section.",
            infoTitulo: "INFO ON HOW THE CALCULATION IS DONE",
            infoTexto:
                "To arrive at the results shown in the calculator, the calculation is based on several steps. First, we calculate CO2 emissions in kg. By combining emissions from production, transportation, transactions, and disposal — if applicable during the selected period — we arrive at the total CO2 emissions of a physical card, which is then compared to the transaction emissions of a digital card. In the next step, we calculate additional resources relevant to the environmental impact: the total energy consumed in kWh across all transactions made by both card types, the total water used in liters during physical card production, and the total plastic used in kg, also during physical card production. Finally, we calculate an average of how many trees would be saved monthly through the CO2 that would be spared if physical cards were replaced by digital ones." +
                "\nDEFAULT VALUES USED IN THE CALCULATOR - CARDS PRODUCED PER MONTH: 10,000; TRANSACTIONS PER MONTH PER CARD: 25",
            ctaTitulo: "Calculate the impacts of card usage!",
            ctaBotao: "Go to calculator",
        },
        acessibilidade: {
            tamanho: "Size:",
            filtroCores: "Color filter",
            ativadoDesativado: "Enabled/disabled",
            grayscale: "Grayscale",
            deuteranopia: "Deuteranopia",
            protanopia: "Protanopia",
            tritanopia: "Tritanopia",
        },
    },
};

export default translations;
