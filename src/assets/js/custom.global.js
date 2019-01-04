// Page JS Helpers
/*
jQuery(function () {
    Dashmix.helpers('sparkline'); // jQuery Sparkline plugin
    Dashmix.helpers('core-bootstrap-tooltip'); // Tooltip
    Dashmix.helpers('core-bootstrap-popover'); // Popover
    console.log('popover initialized!');
    //Dashmix.helpers(['sparkline', 'core-bootstrap-tooltip', 'core-bootstrap-popover']);  
});
*/

// GLOBAL JS FUNCTIONS
// functions to be declared in component.ts and called without 'this' annotation

function scrollToId(id) {
    document.getElementById(id).scrollIntoView();
}

function blockAPI(mode, block_id) {
    jQuery(function () {
        Dashmix.block(mode, "#" + block_id);
    });
}

function Helpers(name) {
    jQuery(function () { Dashmix.helpers(name); });
}

function initChartJS() {
    // Set Global Chart.js configuration
    Chart.defaults.global.defaultFontColor = '#495057';
    Chart.defaults.scale.gridLines.color = "rgba(0,0,0,.04)";
    Chart.defaults.scale.gridLines.zeroLineColor = "rgba(0,0,0,.1)";
    Chart.defaults.scale.ticks.beginAtZero = true;
    Chart.defaults.global.elements.line.borderWidth = 2;
    Chart.defaults.global.elements.point.radius = 5;
    Chart.defaults.global.elements.point.hoverRadius = 7;
    Chart.defaults.global.tooltips.cornerRadius = 3;
    Chart.defaults.global.legend.labels.boxWidth = 12;
}
