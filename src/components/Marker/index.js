import React from "react";
import GoogleMapReact from 'google-map-react';
import { useState, useEffect } from 'react'

const Marker = ({ text, map }) => {
  const [marker, setMarker] = React.useState();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);
  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);
  return null;
}



export default Marker;