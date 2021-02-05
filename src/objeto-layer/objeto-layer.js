import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import "ol/ol.css"
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';

import ImageLayer from "ol/layer/Image";
import ImageWMS from 'ol/source/ImageWMS';

//creando un layer de osm
var osm_layer = new TileLayer({
  source: new OSM()
})

//creando un layer desde un geojson
var zonasMetro_layer = new VectorLayer({
  source: new VectorSource({
    url: "https://geo.crip.conacyt.mx/geoserver/a_interinstitucional_zonas_metropolitanas_2015/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=a_interinstitucional_zonas_metropolitanas_2015%3Aa_interinstitucional_zonas_metropolitanas_2015&maxFeatures=50&outputFormat=application%2Fjson",
    format: new GeoJSON()
  })
})

//creando un layer desde un wms
var layer_wms = new ImageLayer({
  source: new ImageWMS({
    url: "https://geo.crip.conacyt.mx/geoserver/p_imta_estaciones_climatologicas_1996/wms",
    params: {
      'LAYERS': "p_imta_estaciones_climatologicas_1996:p_imta_estaciones_climatologicas_1996",
      "SRS": "EPSG:4326",
      "TILED": false
    },
    serverType: "geoserver"
  }),

  visible:false
});

var map = new Map({
  view: new View({
    center: [-99.168091, 19.438963],
    zoom: 7,
    projection: 'EPSG:4326',
  }),
  layers: [
    osm_layer,
    zonasMetro_layer,
    layer_wms
  ],
  target: 'mapa1'
});


document.getElementById("prende-osm").addEventListener("click", () => {
  osm_layer.setVisible(!osm_layer.getVisible())
})

document.getElementById("prende-pols").addEventListener("click", () => {
  zonasMetro_layer.setVisible(!zonasMetro_layer.getVisible())
})

document.getElementById("prende-wms").addEventListener("click", () => {
  layer_wms.setVisible(!layer_wms.getVisible())
})