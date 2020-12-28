// ==UserScript==
// @author         smthngsaid
// @name           Neopets - Stock tools
// @description    Sort your portfolio by price, and sell stocks without typing
// @include        http://www.neopets.com/stockmarket.phtml?type=portfolio
// ==/UserScript==
var table = document.querySelector('[cellpadding="3"][cellspacing="0"][border="1"][align="center"]').children[0];
var currentStock;
var sellCurrentStock;
for (var i = 4; i < table.children.length - 2; i = i + 2) {
    for (var j = 2; j < i; j = j + 2) {
        if (parseInt(table.children[i].children[3].innerText) > parseInt(table.children[j].children[3].innerText)) {
            currentStock = table.children[i];
            sellCurrentStock = table.children[i + 1];
            sellCurrentStock.remove();
            currentStock.remove();
            table.insertBefore(sellCurrentStock, table.children[j]);
            table.insertBefore(currentStock, sellCurrentStock);
            break;
        }
    }
}

for (var k = 2; k < table.children.length - 2; k = k + 2) {
    if (k % 4 == 0) {
        table.children[k].setAttribute("bgcolor", "#FFFFFF");
    } else {
        table.children[k].setAttribute("bgcolor", "#EEEEFF");
    }
}
//Ready to sell all of your shares of a stock? Click a button to auto-populate how many shares you want to sell
function sellAll(stock) {
    // Current price is only considered a column of the first row
    table.children[stock].children[0].children[0].children[0].children[1].children[6].children[0].value = table.children[stock].children[0].children[0].children[0].children[1].children[0].innerText.replace(/,/g, '');
    for (let t = 2; t < table.children[stock].children[0].children[0].children[0].children.length; t++) {
        table.children[stock].children[0].children[0].children[0].children[t].children[5].children[0].value = table.children[stock].children[0].children[0].children[0].children[t].children[0].innerText.replace(/,/g, '');
    }
}

for (let s = 3; s < table.children.length - 2; s = s + 2) {
    table.children[s].children[0].children[0].children[0].children[0].children[6].addEventListener("click", function () { sellAll(s) });
    table.children[s].children[0].children[0].children[0].children[0].children[6].children[0].innerText = 'Sell All';
}