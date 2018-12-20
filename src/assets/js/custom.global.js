// Page JS Helpers 
jQuery(function () {
    Dashmix.helpers('sparkline'); // jQuery Sparkline plugin
    Dashmix.helpers('core-bootstrap-tooltip'); // Tooltip
    Dashmix.helpers('core-bootstrap-popover'); // Popover
    //Dashmix.helpers(['sparkline', 'core-bootstrap-tooltip', 'core-bootstrap-popover']);
});

// GLOBAL JS FUNCTIONS
// functions to be declared in component.ts and called without 'this' annotation

function blockAPI(mode, block_id) {
    jQuery(function () {
        Dashmix.block(mode, "#"+block_id);
    });
}

function Bootstrap_initPopover() {
    jQuery(function () {
        Dashmix.helpers('core-bootstrap-popover');
        console.log('popover initialized!');
    });
}

function scrollToId(id) {
    document.getElementById(id).scrollIntoView();
}
