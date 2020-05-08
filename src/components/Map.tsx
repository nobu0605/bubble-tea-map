import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  Circle,
} from "react-google-maps";
import { apiKey } from "../config";
import { shops } from "../constants/shops";
import currentLocation from "../images/currentLocation.png";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import NavigationIcon from "@material-ui/icons/Navigation";

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
      isShowCurrentLocation: true,
    };
  }

  onCurrentButtonClick() {
    this.setState({
      isShowCurrentLocation: !this.state.isShowCurrentLocation,
    });
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

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          currentLocationLat: position.coords.latitude,
          currentLocationLng: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
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
          <Marker
            icon={currentLocation}
            title={"Current Location"}
            position={{
              lat: this.state.currentLocationLat,
              lng: this.state.currentLocationLng,
            }}
            visible={this.state.isShowCurrentLocation}
          />
          <Circle
            defaultCenter={{
              lat: parseFloat(this.state.currentLocationLat),
              lng: parseFloat(this.state.currentLocationLng),
            }}
            visible={this.state.isShowCurrentLocation}
            radius={5000}
            options={{
              strokeColor: "#0000FF",
              strokeOpacity: 0.2,
              strokeWeight: 2,
              fillColor: "#0000FF",
              fillOpacity: 0.2,
            }}
          />
          <Fab
            style={{ position: "fixed", bottom: 40, left: 20 }}
            color="primary"
            aria-label="add"
            onClick={() => this.onCurrentButtonClick()}
          >
            <NavigationIcon></NavigationIcon>
          </Fab>
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
