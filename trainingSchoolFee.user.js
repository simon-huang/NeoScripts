// ==UserScript==
// @author         me
// @name           Neopets - Add Codestone Fee to localStorage
// @description    Saves the codestone fee for the training school
// @include        http://www.neopets.com/island/training.phtml?type=status
// ==/UserScript==

var codestones = {};
var cost = document.body.innerHTML.match(/\w+(?=\s+Codestone)/gm);
if (cost != null) {
    for (var i = 0; i < cost.length; i++) {
        codestones[cost[i]] = codestones[cost[i]] ? codestones[cost[i]] + 1 : 1;
    }
}
window.localStorage.setItem('codestones', JSON.stringify(codestones));