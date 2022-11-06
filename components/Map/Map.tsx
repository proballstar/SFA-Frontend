import React from "react";
import GoogleMapReact from "google-map-react";
import LocationPin from "../LocationPin/LocationPin";
import styles from '../../styles/LocationPin.module.css'
import { Container } from '@mantine/core';

export default function GoogleMap({ location }) {
  return (
    <Container size="md">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS }}
        defaultCenter={location}
        defaultZoom={15}
      >
        <LocationPin lat={location.lat} lng={location.lng} />
      </GoogleMapReact>
    </Container>
  );
}
