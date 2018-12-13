jVectorMap is a vector-based, cross-browser and cross-platform component for interactive geography-related data visualization on the web. It provides numerious features like smooth zooming and panning, fully-customizable styling, markers, labels and tooltips.

You can find maps, documentation, examples and more at [the official site](http://jvectormap.com/)

Example
-------

```javascript
var $ = require('jquery');

// load jvectormap jquery plugin
require('jvectormap-next')($);

// render the map
var gdpData = {
    'AF': 16.63,
    'AL': 11.58,
    'DZ': 158.97,
    // ...
}

$('#world-map-gdp').vectorMap({
    map: 'world_mill',
    series: {
        regions: [{
            values: gdpData,
            scale: ['#C8EEFF', '#0071A4'],
            normalizeFunction: 'polynomial'
        }]
    },
    onRegionTipShow: function(e, el, code){
        el.html(el.html()+' (GDP - '+gdpData[code]+')');
    }
});
```
