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
            fisico: "Físico",
            digital: "Digital",
            impactoAmbiental: (kg) =>
                `Ao usar o Cartão de Benefícios Digital, causa um impacto ambiental de ${kg}Kg a menos do que causaria usando o Cartão Físico.`,
            comparacaoTempo: "Comparação por tempo",
            cartaoDigitalEmite: (kg) =>
                `Dentro de 1 ano, o cartão digital emite ${kg}Kg de CO2 menos que o físico!`,
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
            conscientizacaoTexto:
                "X quantidade de recursos podia ser usada para ajudar Z famílias em situação de vulnerabilidade",
            infoTitulo: "INFO SOBRE COMO É FEITO O CÁLCULO",
            infoTexto:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet lorem eu velit faucibus auctor. Sed et suscipit nisi, molestie dictum urna.",
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
            fisico: "Physical",
            digital: "Digital",
            impactoAmbiental: (kg) =>
                `By using the Digital Benefit Card, it causes an environmental impact of ${kg}Kg less than using the Physical Card.`,
            comparacaoTempo: "Comparison over time",
            cartaoDigitalEmite: (kg) =>
                `Within 1 year, the digital card emits ${kg}Kg of CO2 less than the physical one!`,
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
            conscientizacaoTexto:
                "X amount of resources could be used to help Z families in vulnerable situations",
            infoTitulo: "INFO ON HOW THE CALCULATION IS DONE",
            infoTexto:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet lorem eu velit faucibus auctor. Sed et suscipit nisi, molestie dictum urna.",
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
