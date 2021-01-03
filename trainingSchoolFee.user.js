// ==UserScript==
// @author         smthngsaid
// @name           Neopets - Quick-select training school fee
// @description    Selects the appropriate codestones for removal from your shop
// @include        http://www.neopets.com/island/training.phtml?type=status
// @include        http://www.neopets.com/island/fight_training.phtml?type=status
// @include        http://www.neopets.com/market.phtml?type=your
// ==/UserScript==

if (/training.phtml?type=status/.test(window.location.href)) {
    let codestones = {};
    let cost = document.body.innerHTML.match(/\w+(?=\s+Codestone)/gm);
    if (cost != null) {
        for (var i = 0; i < cost.length; i++) {
            let current = cost[i] == "Kai" ? "Tai-Kai Codestone" : cost[i] + " Codestone";
            codestones[current] = codestones[current] ? codestones[current] + 1 : 1;
        }
    }
    window.localStorage.setItem('codestones', JSON.stringify(codestones));
} else {
    let codestones = JSON.parse(window.localStorage.getItem('codestones'));
    let shopItems = document.querySelector('[action="process_market.phtml"]').lastChild.children[0];
    for (let k = 1; k < shopItems.children.length; k++) {
        let itemName = shopItems.childNodes[k].childNodes[0].innerText.trim();
        if (codestones[itemName]) {
            if (codestones[itemName] > parseInt(shopItems.childNodes[k].childNodes[2].innerText)) {
                shopItems.childNodes[k].lastChild.firstChild.value = parseInt(shopItems.childNodes[k].childNodes[2].innerText)
            } else {
                shopItems.childNodes[k].lastChild.firstChild.value = codestones[itemName];
            }
        }
    }
}

