// ==UserScript==
// @name           Neopets - Auto-fill lottery numbers
// @include        http://www.neopets.com/games/lottery.phtml
// ==/UserScript==
var numbers = [];
var current;
while (numbers.length < 6) {
    current = Math.round(Math.random()*31);
    if (current != 0 && current != 31 && !numbers.includes(current)) {
        numbers.push(current);
    }
}
document.getElementsByName('one')[0].value = numbers[0];
document.getElementsByName('two')[0].value = numbers[1];
document.getElementsByName('three')[0].value = numbers[2];
document.getElementsByName('four')[0].value = numbers[3];
document.getElementsByName('five')[0].value = numbers[4];
document.getElementsByName('six')[0].value = numbers[5];
