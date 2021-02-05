import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import "ol/ol.css"


import Overlay from 'ol/Overlay';


let overlay_tooltip = new Overlay({
    id: "tooltip",
    element: document.getElementById("overlay1"),
    autoPan: false,
    stopEvent: false,
    position: "center-center",
    insertFirst: false
})
overlay_tooltip.setPosition(undefined)
//map1.addOverlay(overlay_tooltip)







var map = new Map({
  view: new View({
    center: [-99.168091, 19.438963],
    zoom: 7,
    projection: 'EPSG:4326',
  }),
  layers: [
    new TileLayer({
        source: new OSM()
    })
  ],
  target: 'mapa1',
  overlays:[
      overlay_tooltip
  ]
});

map.on("click",(e)=>{
    let tooltip_overlay = map.getOverlayById("tooltip")
    tooltip_overlay.getElement().querySelector("div.content").innerHTML = `Diste click en:  ${e.coordinate}`
    tooltip_overlay.setPosition(e.coordinate)
    console.log(e.coordinate)

})

