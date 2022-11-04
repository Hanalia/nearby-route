import React from 'react';
import GoogleMapReact from 'google-map-react';


const Map = ({ coords, places, setCoords, setBounds, setChildClicked, weatherData }) => {
  // const matches = useMediaQuery('(min-width:600px)');
  const matches = true

  return (
    <div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_MAP_API }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true }}
        onChange={(e) => {
          console.log({ e })
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
      // onChildClick={(child) => setChildClicked(child)}
      >
        {/* {places.length && places.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!matches
              ? <LocationOnOutlinedIcon color="primary" fontSize="large" />
              : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
          </div>
        ))} */}
      </GoogleMapReact>
    </div>
  );
};

export default Map;