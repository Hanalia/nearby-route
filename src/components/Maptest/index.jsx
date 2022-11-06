import React from "react";
import GoogleMapReact from 'google-map-react';
import { useState, useEffect } from 'react'

import Marker from "../Marker";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Maptest = ({ coords, places, setCoords, setBounds, setChildClicked, weatherData, distance }) => {

  const [circle, setCircle] = useState(null);
  useEffect(() => {
    console.log("h111i")
    console.log(circle)

    circle && circle.setRadius(Number(distance));

  }, [distance])
  const renderMarker = (map, maps) => {
    let marker = new maps.Marker({
      icon: blueDot,
      position: { lat: coords.lat, lng: coords.lng },
      map,
      title: 'You are here!'
    });
    return marker;
  };

  // const renderRoute = (map, maps) => {

  //   const start = new google.maps.LatLng(37.5298043, 127.1176134)
  //   const end = new google.maps.LatLng(37.5346895, 127.1229848)

  //   const directionsService = new maps.DirectionsService();

  //   let directionsDisplay = new maps.DirectionsRenderer({
  //     suppressMarkers: true,
  //     suppressBicyclingLayer: true,
  //   });

  //   directionsDisplay.setOptions({
  //     polylineOptions: {
  //       strokeColor: '#ff85a2',
  //       strokeWeight: '4',
  //       strokeOpacity: '0.7',
  //     },
  //     // draggable: true,
  //   });

  //   directionsDisplay.setMap(map);
  //   const request = {
  //     origin: start,
  //     destination: end,
  //     // travelMode: google.maps.TravelMode.WALKING,
  //     travelMode: 'WALKING',
  //   };
  //   directionsService.route(request, (result, status) => {
  //     if (status === 'OK') {
  //       Session.set('directionsService', result);
  //       directionsDisplay.setDirections(result);
  //       Meteor.setTimeout(() => {
  //         directionsDisplay.setOptions({ preserveViewport: true });
  //       }, 1000);
  //     }
  //   });
  // };

  const addCircle = async (map, maps) => {
    let circle = await new maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.1,
      strokeWeight: 0.5,
      fillColor: '#FF0000',
      fillOpacity: 0.1,
      map,
      center: { lat: coords.lat, lng: coords.lng },
      radius: distance,
    })
    setCircle(circle)
  };

  const color = {
    'google-blue 100': `#4285F4`,
    'white 100': `rgb(255,255,255)`,
  }

  const blueDot = {
    fillColor: color['google-blue 100'],
    fillOpacity: 1,
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    strokeColor: color['white 100'],
    strokeWeight: 2,
  };

  // const [mapcoords, setMapCoords] = useState(coords);
  const defaultProps = {
    center: {
      lat: 37.51928,
      lng: 127.1026131
    },
    zoom: 14
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => {
          renderMarker(map, maps),
            addCircle(map, maps);
          // renderRoute(map, maps)
        }
        }
        onChange={(e) => {
          console.log({ e })
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
      >
      </GoogleMapReact>
    </div>
  );
}

export default Maptest;