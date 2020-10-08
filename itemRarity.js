// ==UserScript==
// @author         smthngsaid
// @name           Neopets - Item Rarity in Quick Stock
// @include        http://www.neopets.com/inventory.phtml
// @include        http://www.neopets.com/quickstock.phtml
// @include        http://www.neopets.com/quickstock.phtml?r=
// ==/UserScript==

if (window.location.href == "http://www.neopets.com/inventory.phtml") {
    var rarities = [];
    var inventory = document.querySelector('[class = "inventory"]').children[0];
    for (var row = 0; row < inventory.children.length; row++) {
        for (var item = 0; item < inventory.children[row].children.length; item++) {
            if (inventory.children[row].children[item].lastElementChild.tagName == "SPAN") {
                rarities.push([inventory.children[row].children[item].lastElementChild.lastElementChild.innerText, inventory.children[row].children[item].lastElementChild.lastElementChild.getAttribute("style")]);
            } else {
                rarities.push([]);
            }
        }
    }
    window.localStorage.setItem('rarities', JSON.stringify(rarities));
}

if (window.location.href == "http://www.neopets.com/quickstock.phtml" || window.location.href == "http://www.neopets.com/quickstock.phtml?r=") {
    var items = document.getElementsByName("quickstock")[0].childNodes[1].childNodes[1];
    var itemRarities = JSON.parse(window.localStorage.getItem('rarities'));
    var parentheses;
    var indexOfCurrentRarity = itemRarities.length - 1;
    for (var i = 0; i < items.children.length; i++) {
        if (items.children[i].firstElementChild.innerText != "Object Name" && items.children[i].firstElementChild.innerText != "Check All" && items.children[i].firstElementChild.innerText != "    ") {
            if (itemRarities[indexOfCurrentRarity].length > 0) {
                parentheses = document.createElement("SPAN");
                parentheses.setAttribute("style", "display: inline-block;");
                parentheses.setAttribute("style", itemRarities[indexOfCurrentRarity][1]);
                parentheses.innerText = " " + itemRarities[indexOfCurrentRarity][0];
                items.children[i].firstElementChild.appendChild(parentheses);
            }
            indexOfCurrentRarity--;
        }
    }
}
