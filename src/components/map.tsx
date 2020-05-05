import React from 'react'
import { compose, withProps } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps'
import Geocode from 'react-geocode'
import { apiKey } from '../config'

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(apiKey)

// set response language. Defaults to english.
Geocode.setLanguage('en')

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion('es')

// Enable or disable logs. Its optional.
Geocode.enableDebug()

type locations = {
  lat: number
  lng: number
}
let locations: locations
// Get latitude & longitude from address.
Geocode.fromAddress(
  '神奈川県横浜市西区みなとみらい3-5-1 MARK IS みなとみらい地下4階'
).then(
  (response) => {
    locations = response.results[0].geometry.location
  },
  (error) => {
    console.error(error)
  }
)
export const MyMapComponent: any = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apiKey}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `800px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props: any) => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: locations.lat, lng: locations.lng }}
  >
    {props.isMarkerShown && (
      <div>
        <Marker
          position={{ lat: locations.lat, lng: locations.lng }}
          onClick={props.onMarkerClick}
        />
      </div>
    )}
  </GoogleMap>
))
