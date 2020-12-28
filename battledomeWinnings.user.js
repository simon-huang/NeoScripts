// ==UserScript==
// @author         smthngsaid
// @name           Neopets - Battledome Prize Counter
// @description    Keeps a count of the items and Neopoints you've won today
// @include        http://www.neopets.com/dome/arena.phtml
// ==/UserScript==
$('#arenacontainer').on('click', '.end_game', function () {
    displayTotals();
});
function displayTotals() {
    let rewardsBox = document.getElementById("bd_rewards");
    if (rewardsBox.children[1].hasChildNodes()) {
        return;
    }
    //Grab stored info. If it's a new day, reset everything.
    var d = new Date();
    var currentDate = d.getDate();
    var storedDate = window.localStorage.getItem('battledomeDate');
    var nPCount = window.localStorage.getItem('battledomeNPCount') == null ? 0 : parseInt(window.localStorage.getItem('battledomeNPCount'));
    var itemCount = window.localStorage.getItem('battledomeItemCount') == null ? 0 : parseInt(window.localStorage.getItem('battledomeItemCount'));
    if (storedDate != currentDate) {
        nPCount = 0;
        itemCount = 0;
        window.localStorage.setItem('battledomeNPCount', nPCount);
        window.localStorage.setItem('battledomeItemCount', itemCount);
        window.localStorage.setItem('battledomeDate', currentDate);
    }
    //Add any winnings and store the new totals
    let prizes = document.querySelectorAll("#bd_rewardsloot .prizname");
    if (prizes.length > 0) {
        for (let i = 0; i < prizes.length; i++) {
            if (/\d+ Neopoints/.test(prizes[i].textContent)) {
                let np = prizes[i].textContent.split(' ')[0];
                nPCount += parseInt(np);
            } else {
                itemCount += 1;
            }
        }
        window.localStorage.setItem('battledomeNPCount', nPCount);
        window.localStorage.setItem('battledomeItemCount', itemCount);
    }
    //Display the totals
    let counter = document.createElement("span");
    counter.setAttribute("nowrap", "nowrap");
    let items = document.createElement("strong");
    items.textContent = ' Items: ' + itemCount;
    let separator = document.createElement("span");
    separator.textContent = ' | ';
    separator.setAttribute("style", "font-weight: normal;");
    let np = document.createElement("strong");
    np.textContent = 'NP: ' + nPCount;
    rewardsBox.children[1].appendChild(counter).appendChild(items).appendChild(separator).appendChild(np);
}