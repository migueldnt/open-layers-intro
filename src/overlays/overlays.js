import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import "ol/ol.css"


import Overlay from 'ol/Overlay';

import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';


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



//creando un layer desde un geojson
var zonasMetro_layer = new VectorLayer({
  source: new VectorSource({
    url:  "https://geo.crip.conacyt.mx/geoserver/a_interinstitucional_zonas_metropolitanas_2015/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=a_interinstitucional_zonas_metropolitanas_2015%3Aa_interinstitucional_zonas_metropolitanas_2015&maxFeatures=50&outputFormat=application%2Fjson",
    format: new GeoJSON()
  })
})





var map = new Map({
  view: new View({
    center: [-99.168091, 19.438963],
    zoom: 7,
    projection: 'EPSG:4326',
  }),
  layers: [
    new TileLayer({
        source: new OSM()
    }),zonasMetro_layer
  ],
  target: 'mapa1',
  overlays:[
      overlay_tooltip
  ]
});

map.on("click",(e)=>{
  var pixel = map.getEventPixel(e.originalEvent);
  var hit = map.hasFeatureAtPixel(pixel);

  if (hit) {
    var f_l = map.forEachFeatureAtPixel(pixel, function (feature, layer) {
        return [feature, layer];
    });

    let tooltip_overlay = map.getOverlayById("tooltip")
    tooltip_overlay.getElement().querySelector("div.content").innerHTML = `Diste click en:  ${f_l[0].getProperties()["nom_zm"]}`
    tooltip_overlay.setPosition(e.coordinate)
    console.log(e.coordinate)


  }

    /*
    
    */
})

