import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import "ol/ol.css"

//default epsg 3857

var map1 = new Map({
  view: new View({
    center: [-11041175.861737,2228292.248569],
    zoom: 10,
    //rotation:1
  }),
  layers: [
    
    new TileLayer({
      source: new OSM()
    })
    
  ],
  target: 'mapa1'
});

/**
 * MAPA 2
 */
var map2 = new Map({
    view: new View({
      center: [-103.348389,20.694462],
      zoom: 10,
      projection: 'EPSG:4326',
      
    }),
    layers: [
      
      new TileLayer({
        source: new OSM()
      })
      
    ],
    target: 'mapa2'
  });