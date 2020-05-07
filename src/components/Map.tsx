import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { apiKey } from "../config";
import { shops } from "../constants/shops";

type Props = any;
type State = any;

const initialLat: number = 35.601236;
const initialLng: number = 139.767125;
const adjustLatitude: number = 0.05;

export default class Map extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isShowInfoWindow: false,
      activeMarker: 0,
      selectedPlace: {},
      lat: initialLat,
      lng: initialLng,
    };
  }

  onMarkerClick(
    props: any,
    selected: number,
    companyName: string,
    lat: number,
    lng: number
  ) {
    this.setState({
      selectedPlace: props,
      activeMarker: selected,
      companyName: companyName,
      isShowInfoWindow: true,
      lat: lat - adjustLatitude,
      lng: lng,
    });
  }

  render() {
    const MyMapComponent: any = compose(
      withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apiKey}`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `700px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withScriptjs,
      withGoogleMap
    )((props: any) => (
      <div>
        <GoogleMap
          defaultZoom={10}
          defaultCenter={{ lat: initialLat, lng: initialLng }}
          center={{ lat: this.state.lat, lng: this.state.lng }}
        >
          {shops.map((shop: any) => {
            return shop.shopObj.map((shopData: any, index: number) => {
              return (
                <Marker
                  position={{ lat: shopData.lat, lng: shopData.lng }}
                  onClick={(e) =>
                    this.onMarkerClick(
                      this.props,
                      index,
                      shop.companyName,
                      shopData.lat,
                      shopData.lng
                    )
                  }
                  visible={
                    this.props.filteredShops === "All shops" ||
                    (this.props.filteredShops !== "All shops" &&
                      this.props.filteredShops === shop.companyName)
                      ? true
                      : false
                  }
                  icon={shop.icon}
                >
                  {index === this.state.activeMarker &&
                    this.state.isShowInfoWindow &&
                    this.state.companyName === shop.companyName && (
                      <InfoWindow>
                        <div>
                          <b>
                            <span>{shopData.shop_name}</span>
                          </b>
                          <br />
                          <span>{shopData.address}</span>
                        </div>
                      </InfoWindow>
                    )}
                </Marker>
              );
            });
          })}
        </GoogleMap>
      </div>
    ));

    return (
      <div>
        <MyMapComponent />
      </div>
    );
  }
}
