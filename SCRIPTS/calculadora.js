const numBotoes = document.querySelectorAll('[data-num]'); 
const operacoesBotoes = document.querySelectorAll( '[data-operacao]');
const equalsBotao = document.querySelector('[data-equals]');
const deletarBotao = document.querySelector('[data-delete]');
const clearBotao = document.querySelector('[data-clear]');
const resulAtualTexto = document.querySelector('[data-resultadoAtual]'); 
const resultadoPrevioTexto = document.querySelector('[data-resultadoPrevio]');


class Calculator{
    constructor(resulAtual, resulPrevio){
        this.resulAtual = resulAtual;
        this.resulPrevio = resulPrevio;
        this.clear(); 
    }

    calculate(){
        let result; 
        const resulPrevioOperacaoFloat = parseFloat(this.resulPrevioOperacao);  
        const resulAtualOperacaoFloat = parseFloat(this.resulAtualOperacao);

        //Não Executa Função
        if(isNaN(resulAtualOperacaoFloat) || isNaN(resulPrevioOperacaoFloat)) return; 

        switch(this.operation){
            case '+': 
                result =  resulPrevioOperacaoFloat + resulAtualOperacaoFloat;
                break; 
            case '-': 
                result = resulPrevioOperacaoFloat - resulAtualOperacaoFloat;
                break;  
            case '*':
                result = resulPrevioOperacaoFloat * resulAtualOperacaoFloat; 
                break;
            case '÷':  
                result = resulAtualOperacaoFloat / resulPrevioOperacaoFloat;
            default: 
                return;                
        }   

        this.resulAtualOperacao = result; 
        this.operation = undefined; 
        this.resulPrevioOperacao = "";
        
    }

    escolherOperacao(operacao){
        if(this.operation != ""){
            this.calculate();
        }

        this.operation = operacao; 
        this.resulPrevioOperacao = this.resulAtualOperacao; 
        this.resulAtualOperacao = "";
    }



    //Método da classe
    clear(){
        this.resulAtualOperacao = ''; 
        this.resulPrevioOperacao = ''; 
        this.operation= undefined;
    }

    colocarNum(number){
        //  TEMPLATE STRING
        //Se o numero já tiver um pontinho e número que estamos recebendo ser um ponto a gente (saí dessa função)
        if(this.resulAtualOperacao.includes('.') && number === "." ) return;

        this.resulAtualOperacao = `${this.resulAtualOperacao}${number.toString()}`;
    }
    
    updateTela(){
        this.resulAtual.innerText = this.resulAtualOperacao;
        this.resulPrevio.innerText = `${this.resulPrevioOperacao} ${this.operation || ""}`;
    }
}

// INSTANCIA

const calculator = new Calculator(resulAtualTexto, resultadoPrevioTexto);

clearBotao.addEventListener('click', () => {
    calculator.clear();
    calculator.updateTela();
})

equalsBotao.addEventListener('click', () => {
    calculator.calculate(); 
    calculator.updateTela();
})

//FOR - OF
for(const numberButton of numBotoes){
    numberButton.addEventListener("click", () => {
        calculator.colocarNum(numberButton.innerHTML);
        calculator.updateTela();
    })
}

for(const operacaoButton of operacoesBotoes){
    operacaoButton.addEventListener("click", () => {
        calculator.escolherOperacao(operacaoButton.innerText); 
        calculator.updateTela;
    })

}

