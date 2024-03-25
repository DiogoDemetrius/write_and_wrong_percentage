const buttonsAdd = document.querySelectorAll(".button_add"); // Seletor dos botões
const countersElement = document.querySelectorAll(".counter"); // Seletor dos contadores
const buttonClear = document.querySelector(".clear"); // Seletor do botão Clear
const percentageScream = document.querySelector(".percentage"); // Seletor do elemento de porcentagem
const footerFeedbackLight = document.querySelector(".feedback_light"); // Seletor do elemento de feedback

let counters = []; // Array para armazenar os contadores individuais

// Inicializando os contadores
countersElement.forEach(counter => {
    counters.push(0); // Inicializa cada contador com 0
});

// Função que incrementa o contador e atualiza o elemento HTML
function plusButton(index) {
    counters[index]++; // Incrementa o contador correspondente ao índice
    countersElement[index].textContent = counters[index]; // Atualiza o elemento HTML correspondente
    updatePercentage(); // Atualiza a porcentagem
}

// Função clear
function clear() {
    counters.forEach((_, index) => {
        counters[index] = 0;
        countersElement[index].textContent = counters[index];
    });
    updatePercentage(); // Atualiza a porcentagem
}

// Função para calcular a porcentagem e atualizar o elemento HTML
function updatePercentage() {
    const total = counters.reduce((acc, currentValue) => acc + currentValue, 0);
    const percentageValue = total === 0 ? 0 : (counters[0] / total) * 100;
    percentageScream.textContent = `${percentageValue.toFixed(2)}%`;
    updateBackgroundColor(); // Atualiza a cor de fundo
}

// Função para verificar e atualizar a cor de fundo
function updateBackgroundColor() {
    const percentageValue = parseFloat(percentageScream.textContent); // Obtém o valor da porcentagem como número
    const colorRed = getComputedStyle(document.documentElement).getPropertyValue('--color-red1');
    const colorYellow = getComputedStyle(document.documentElement).getPropertyValue('--color-yellow');
    const colorGreen = getComputedStyle(document.documentElement).getPropertyValue('--color-green1');

    if (percentageValue < 70) {
        footerFeedbackLight.style.backgroundColor = colorRed; // Altera para vermelho se a porcentagem for menor que 70
    } else if (percentageValue < 80) {
        footerFeedbackLight.style.backgroundColor = colorYellow; // Altera para amarelo se a porcentagem for menor que 80
    } else {
        footerFeedbackLight.style.backgroundColor = colorGreen; // Mantém verde para porcentagens maiores ou iguais a 80
    }
}

// Adicionar evento de clique a todos os botões
buttonsAdd.forEach((button, index) => {
    button.addEventListener('click', () => plusButton(index));
});

// Adicionar evento de clique ao botão Clear
buttonClear.addEventListener('click', clear);