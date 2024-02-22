let minValue = parseInt(prompt('Минимальное знание числа для игры','0'));
let maxValue = parseInt(prompt('Максимальное знание числа для игры','100'));

if (isNaN(minValue))  {
    minValue = 0;
}
if (isNaN(maxValue))  {
    maxValue = 100;
}
minValue = minValue < (-999) ? (-999) : minValue;
maxValue = maxValue > 999 ? 999 : maxValue;

bootbox.alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
let answerNumber  = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${numToPr(answerNumber) }?`;

document.getElementById('btnRetry').addEventListener('click', function () {
    minValue = 0;
    maxValue = 100;
    orderNumber = 1;
    orderNumberField.innerText = orderNumber;
    minValue = parseInt(prompt('Минимальное знание числа для игры','0'));
    maxValue = parseInt(prompt('Максимальное знание числа для игры','100'));
    if (isNaN(minValue))  {
        minValue = 0;
    }
    if (isNaN(maxValue))  {
        maxValue = 100;
    }
    minValue = minValue < (-999) ? (-999) : minValue;
    maxValue = maxValue > 999 ? 999 : maxValue;
    bootbox.alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
    answerNumber  = Math.floor((minValue + maxValue) / 2);
    answerField.innerText = `Вы загадали число ${numToPr(answerNumber) }?`
    gameRun = true;
})

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            maxValue = answerNumber;
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = `Вы загадали число ${numToPr(answerNumber)}?`;
        }
    }
})

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = `Вы загадали число ${numToPr(answerNumber)}?`;
        }
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        const phraseRandom = Math.round( Math.random() * 2);
        let answerPhrase = '';
        if (phraseRandom === 0) {
            answerPhrase = `Да это легко! Ты загадал число ` + numToPr(answerNumber) ;
        } else if (phraseRandom === 1) {
            answerPhrase = `Наверное, это число ` + numToPr(answerNumber);
        } else {
            answerPhrase = `Я всегда угадываю\n\u{1F60E}` ;
        }
        answerField.innerText = answerPhrase;
        gameRun = false;
    }
})

function numToPr(number){

    positiveNumber = true;
    if (number < 0){
        positiveNumber = false;
        number = parseInt(number * (-1));
    }
    const
        h = ['сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'],
        t = ['', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'],
        o = ['один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'],
        p = ['одиннацать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    let str = number.toString(), out = '';

    if(str.length == 1) {
        if (str == '0') {
            return 'ноль';
        } else if (positiveNumber == false){
            return 'минус ' + o[number-1];
        } else{
            return o[number-1];
        }
        
    }
    else if(str.length == 2){
        if(str[0] == 1) out = p[parseInt(str[1])-1];
        else out = (t[parseInt(str[0])-1] + ((str[1]!='0')?(' ' + o[parseInt(str[1])-1]):''));
    }
    else if(str.length == 3){
        out = (h[parseInt(str[0])-1] + ((str[1]!='0')?(' ' + t[parseInt(str[1])-1]):'') + ((str[2]!='0')?(' ' + o[parseInt(str[2])-1]):''));
    }

    let arr = out.split('');
    arr[0] = arr[0].toUpperCase();
    out = arr.join('');
    if(out.length < 20){
        if (positiveNumber == false){
            return 'минус ' + out;
        } else {
            return out;
        }
    } else{
        return number;
    }
}