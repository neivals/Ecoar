# Como contribuir ou rodar o Calculeco

---

## Pré-requisitos 🛠

Antes de começar a nos ajudar no aprimoramento do nosso projeto, certifique-se de ter as seguintes ferramentas instaladas:

- **Algum interpretador de Java como o IntelliJ ou Eclipse**
- **Git**
- Java

---

## Primeiros passos 

### 1. Faça um fork deste repositório.

### 2. Clone o repositório do projeto em seu computador:

Abra seu terminal e navegue até o diretório onde deseja clonar o repositório.
Em seguida, execute o comando:

```bash
git clone https://github.com/AnzinFelipe/Lumen.git
```

Abra essa pasta com o seu interpretador


### 3. Instale as Dependências 

Faça questão de ter o Maven instalado para conseguir instalar as dependências do projeto que estão no package-lock.json

### 4. Como testar localmente a aplicação

Crie uma pasta chamada .env.local e coloque isso dentro dela:

```bash
VITE_API_URL=http://localhost:8080
```

Visite a classe Java CalculecoApplication e rode ela, após isso o backend está pronto para ser utilizado

Navegue até a pasta calculeco-ui que está localizada no Frontend e rode o comando 

```bash
npm run dev
```

Depois copie o link do localhost e colar no seu navegador

Após isso quaisquer mudanças aplicadas poderão ser observadas em tempo real

## Contribuindo com Código

Recomenda-se o uso do IntelliJ para essa parte, pois todo nosso projeto e esse guia foi escrito com base nas ferramentas dele
    
1. Abra o IntelliJ.  
2. Abra a pasta em que o projeto está clonado (Refira-se a primeiros passos).
3. Tenha certeza de que todas as dependências estão instaladas

---

## Abra um Pull Request

Após abrir seu pull request, os desenvolvedores irão analisar cada mudança e decidirão se vão aceitar ou não seus commits e mudanças no código
---

## 🧾 Dúvidas?

Se ouver alguma duvida, abra uma **issue** e nossa equipe ficará feliz em ajudar.

---



