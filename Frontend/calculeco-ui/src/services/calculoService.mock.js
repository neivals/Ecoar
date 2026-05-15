// Este é um arquivo de teste separado - não mexe no seu código original
export const calcularEmissao = async (dados) => {
    console.log("🔵 MOCK: Dados recebidos:", dados);

    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Retorna dados fictícios
    const respostaMock = {
        emissaoTotalFisico: (dados.quantidadeCartoes * 0.75) + (dados.quantidadeTransacoes * 0.03),
        emissaoTotalDigital: (dados.quantidadeTransacoes * 0.01)
    };

    console.log("🟢 MOCK: Resposta enviada:", respostaMock);
    return { data: respostaMock };
};