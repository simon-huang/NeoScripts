// ==UserScript==
// @author         smthngsaid
// @name           Neopets - Battledome Prizes Counter
// @description    Keeps a count of the items and Neopoints you've won today
// @include        http://www.neopets.com/dome/arena.phtml
// ==/UserScript==

//For some reason I can't add a click handler to the "COLLECT REWARDS" button
//Even though I can do other things, like modify its appearanace
//I settled for adding a click handler to the "FIGHT!" button
//It hears the click to process the first turn
document.querySelector("button#fight").addEventListener("click", function () {
    setTimeout(function () {
        displayTotals();
    }, 2000);
});

function displayTotals() {
    //If there's lag and the turn doesn't process right away
    //Or the fight didn't end in one turn, call the function again after a short delay
    let lootAndLimits = document.getElementById("bd_rewardsloot").children[0].children;
    if (lootAndLimits.length == 1 && lootAndLimits[0].textContent == '') {
        console.log('Call it again after 3 seconds');
        setTimeout(function () {
            displayTotals();
        }, 3000);
        return;
    }
    //Make sure a prior call hasn't already succeeded
    let rewardsBox = document.getElementById("bd_rewards");
    if (rewardsBox.children[1].children.length > 0) {
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
    //Add any new winnings and store the new totals
    if (/you have earned the following rewards/.test(rewardsBox.children[1].textContent) &&
        !/Sorry, you didn't win anything this battle/.test(lootAndLimits[1].textContent)) {
        for (let i = 0; i < lootAndLimits.length; i++) {
            if (lootAndLimits[i].children[0].children[0].src == "http://images.neopets.com/reg/started_bagofnp.gif") {
                let np = lootAndLimits[i].children[0].children[2].innerText;
                //remove the ' Neopoints' part of the string
                nPCount += parseInt(np.slice(0, -10));
            } else if (lootAndLimits[i].children[0].children[0].nodeName == 'IMG') {
                itemCount++;
            }
        }
        window.localStorage.setItem('battledomeNPCount', nPCount);
        window.localStorage.setItem('battledomeItemCount', itemCount);
    }
    //Display the totals
    var counter = document.createElement("span");
    counter.setAttribute("nowrap", "nowrap")
    counter.textContent = ' Total items: ' + itemCount + ', NP: ' + nPCount;
    counter.setAttribute("style", "font-weight: bold;")
    rewardsBox.children[1].appendChild(counter);
}