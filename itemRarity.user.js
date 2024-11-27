// ==UserScript==
// @name           Neopets - Item Details in Quick Stock
// @author         smthngsaid
// @version        2024-11-27
// @include        https://www.neopets.com/inventory.phtml
// @include        https://www.neopets.com/quickstock.phtml*
// ==/UserScript==
if (window.location.href == "http://www.neopets.com/inventory.phtml") {
    $(document).ajaxSuccess(
        function () {
            let rarities = {};
            let names = $('#tableRowsId .item-name');
            let details = $('#tableRowsId .item-subname');
            for (let i = 0; i < details.length; i++) {
                if (details[i].innerText == '' || /trading/.test(details[i].innerText) || /auctioned/.test(details[i].innerText)) {
                    continue;
                } else {
                    let d = details[i].innerText.split('\n');
                    let color = details[i].lastElementChild.lastElementChild.getAttribute("style");
                    rarities[names[i].innerText] = d.length > 1 ? [d[d.length - 1], color] : [d[0], color];
                }
            }
            window.localStorage.setItem('rarities', JSON.stringify(rarities));
        }
    );
}

if (window.location.href == "http://www.neopets.com/quickstock.phtml") {
    let items = $('[name="quickstock"] tr td[align="left"]');
    let itemRarities = JSON.parse(window.localStorage.getItem('rarities'));
    var indexOfCurrentRarity = itemRarities.length - 1;
    for (let i = 0; i < items.length; i++) {
        let name = items[i].innerText;
        if (itemRarities[name]) {
            let parentheses = document.createElement("SPAN");
            parentheses.setAttribute("style", "display: inline-block;");
            parentheses.setAttribute("style", itemRarities[name][1]);
            parentheses.innerText = " " + itemRarities[name][0];
            items[i].appendChild(parentheses);
        }
    }
}
