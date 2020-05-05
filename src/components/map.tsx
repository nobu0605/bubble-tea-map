import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import chatime from "../shopData/chatime.json";
import { apiKey } from "../config";

type Props = any;

export default class MyMapComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const MyMapComponent: any = compose(
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
        defaultCenter={{ lat: 35.6970463, lng: 139.7004277 }}
      >
        {props.isMarkerShown &&
          chatime.map((location: any) => {
            return (
              <div>
                <Marker
                  position={{ lat: location.lat, lng: location.lng }}
                  onClick={props.onMarkerClick}
                />
              </div>
            );
          })}
      </GoogleMap>
    ));

    return <MyMapComponent isMarkerShown={this.props.isMarkerShown} />;
  }
}
