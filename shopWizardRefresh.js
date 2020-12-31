// ==UserScript==
// @name           Neopets - Shop Wizard Refresh
// @description    Click the header (where the shop wizard is) of the results page to resubmit your search
// @include        http://www.neopets.com/shops/wizard.phtml*
// ==/UserScript==
//Note: Shop Wizard refreshing stopped working after the redesign, and staff confirmed this was unintentional
//This script is a temporary fix
let item, phrasing, where, min, max;
let submit = function () {
    $.ajax({
        type: "POST",
        url: '/np-templates/ajax/wizard.php',
        dataType: 'html',
        data: {
            "type": 'process_wizard',
            "feedset": 0,
            "shopwizard": item,
            "table": where,
            "criteria": phrasing,
            "min_price": min,
            "max_price": max,
        },
        success: function (response) {
            $('#shopWizardFormResults').html(response);
        },
        error: function () {
            alert('Error');
        }
    })
}
$('.wizard-button-search')[0].addEventListener('click', function () {
    item = $("#shopwizard").val();
    where = $('#wizard-area option:selected').val();
    phrasing = $('#criteria option:selected').val();
    min = $("#min_price").val();
    max = $("#max_price").val();
});
$(document).ajaxSuccess(function () {
    $('.wizard-results-header')[0].addEventListener('click', function () {
        submit();
    });
});