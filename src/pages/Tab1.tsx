import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  useIonViewWillLeave,
} from '@ionic/react';
import { book, build, colorFill, grid } from 'ionicons/icons';
import React from 'react';


import { 
  geoJSON,
  Map,
  popup,
  tileLayer, 
  // Layer, 
  // marker
} from 'leaflet';

import './Tab1.css';

const Tab1: React.FC = () => {
  let map: Map;

  const leafletMap = () => {
    // In setView add latLng and zoom
    map = new Map('mapId').setView([43.07467, -89.38414], 12);
    tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
      attribution: 'Digital Dems | OpenStreeMap ',
    }).addTo(map);

    const groups = [{
      "type": "Feature",
      "properties": {"name": "South Madison Voters"},
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-89.344791, 43.050259],
          [-89.386494, 43.061762],
          [-89.404748, 43.057094],
          [-89.436691, 43.034530],
          [-89.435357, 43.024428],
          [-89.351707, 43.025506]
        ]]
      }
    }];
    // @ts-ignore
    geoJSON(groups, {
      style: function(feature:any) {
        switch (feature.properties.name) {
          case 'South Madison Voters': return {color: "#0000ff"};
          default: return {color: "#"+((1<<24)*Math.random()|0).toString(16)};
        }
      }
    }).addTo(map);

    // add click listeners
    map.on('click', onMapClick);
  }

  const onMapClick = (e:any) => {
    popup()
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);
  }


  useIonViewDidEnter(() => {
    leafletMap();
  });

  useIonViewWillLeave(() => {

    map.off('click', onMapClick);
    map.remove();
  });


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Browse Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div id="mapId" style={{width: '100%', height: '100%'}}/>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
