// ==UserScript==
// @author         smthngsaid
// @name           Neopets - Money Tree Counter
// @description    Keeps a count of how many items you've taken today
// @include        http://www.neopets.com/donations.phtml
// @include        http://www.neopets.com/takedonation_new.phtml*
// ==/UserScript==
if (window.location.href == "http://www.neopets.com/donations.phtml") {
    var d = new Date();
    var date = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var currentDate = date + "/" + month + "/" + year;
    var storedDate = window.localStorage.getItem('moneyTreeDate');
    var storedCount = window.localStorage.getItem('moneyTreeCount') == null ? 0 : window.localStorage.getItem('moneyTreeCount');
    if (storedDate != currentDate) {
        window.localStorage.setItem('moneyTreeDate', currentDate);
        window.localStorage.setItem('moneyTreeCount', '0');
    }
    var counter = document.createElement("span");
    counter.setAttribute("nowrap", "nowrap")
    counter.textContent = ' Items taken: ' + storedCount;
    $('.button-grid2__2020')[0].nextElementSibling.appendChild(counter);
}
if (/takedonation_new/.test(window.location.href)) {
    if (/Yeah! You got it!/.test(document.body.innerText)) {
        var count = window.localStorage.getItem('moneyTreeCount');
        count++;
        window.localStorage.setItem('moneyTreeCount', JSON.stringify(count));
    }
}
