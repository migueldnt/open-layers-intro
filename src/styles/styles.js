import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import "ol/ol.css"
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';

import {Fill, Stroke, Circle, Style, Text} from 'ol/style';

 var fill = new Fill({
   color: 'green'
 });
 var stroke = new Stroke({
   color: 'red',
   width: 1.25
 });
 var style = new Style({
     fill: fill,
     stroke: stroke
   })
 ;



//creando un layer desde un geojson
var zonasMetro_layer = new VectorLayer({
  source: new VectorSource({
    url: "https://geo.crip.conacyt.mx/geoserver/a_interinstitucional_zonas_metropolitanas_2015/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=a_interinstitucional_zonas_metropolitanas_2015%3Aa_interinstitucional_zonas_metropolitanas_2015&maxFeatures=50&outputFormat=application%2Fjson",
    format: new GeoJSON()
  }),
  style:style
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
    }),
    zonasMetro_layer
  ],
  target: 'mapa1'
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//PARA EL MAPA 2

var styleFunction=(feature)=>{
    var fill = new Fill({
        color: 'white'
      });
      var stroke = new Stroke({
        color: 'black',
        width: 1
      });
      var style2 = new Style({
          fill: fill,
          stroke: stroke,
          text:new Text({
              text:feature.getProperties()["nom_zm"]
          })
        })
      ;
    return style2
}


//creando un layer desde un geojson
var zonasMetro_layer2 = new VectorLayer({
    source: new VectorSource({
      url: "https://geo.crip.conacyt.mx/geoserver/a_interinstitucional_zonas_metropolitanas_2015/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=a_interinstitucional_zonas_metropolitanas_2015%3Aa_interinstitucional_zonas_metropolitanas_2015&maxFeatures=50&outputFormat=application%2Fjson",
      format: new GeoJSON()
    }),
    style:styleFunction
  })
  
  
  
  var map2 = new Map({
    view: new View({
      center: [-99.168091, 19.438963],
      zoom: 7,
      projection: 'EPSG:4326',
    }),
    layers: [
      new TileLayer({
          source: new OSM()
      }),
      zonasMetro_layer2
    ],
    target: 'mapa2'
  });