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
import NavigationIcon from "@material-ui/icons/Navigation";

type Props = {
  filteredShop: string;
  isMarkerShown: boolean;
  params: {
    companyName: string;
    shopId: number;
  };
};

type State = {
  isShowInfoWindow: boolean;
  activeMarker: number;
  selectedPlace: object;
  companyName: string;
  lat: number;
  lng: number;
  isShowCurrentLocation: boolean;
  filteredShop: string;
  currentLocationLng: number;
  currentLocationLat: number;
  error: null | string;
};

const initialLat: number = 35.601236;
const initialLng: number = 139.767125;
const adjustLatitude: number = 0.05;

export default class Map extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isShowInfoWindow: true,
      activeMarker: 1,
      selectedPlace: {},
      companyName: "All-shops",
      lat: initialLat,
      lng: initialLng,
      isShowCurrentLocation: true,
      filteredShop: props.filteredShop,
      currentLocationLng: 0,
      currentLocationLat: 0,
      error: null,
    };
  }

  onCurrentButtonClick() {
    this.setState({
      isShowCurrentLocation: !this.state.isShowCurrentLocation,
    });
  }

  showSelectedShop(
    selected: number,
    companyName: string,
    lat: number,
    lng: number
  ) {
    this.setState({
      activeMarker: selected,
      companyName: companyName,
      isShowInfoWindow: true,
      lat: lat - adjustLatitude,
      lng: lng,
    });
  }

  componentDidMount() {
    if (this.props.params.companyName) {
      this.setState({
        filteredShop: this.props.params.companyName,
      });
    }
    if (this.props.params.shopId) {
      this.setState({
        activeMarker: Number(this.props.params.shopId),
        isShowInfoWindow: true,
        companyName: this.props.params.companyName,
      });
    }

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
    console.error(this.state.error);
  }

  render() {
    const MyMapComponent: Function = compose(
      withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apiKey}`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `700px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withScriptjs,
      withGoogleMap
    )(() => (
      <div>
        <GoogleMap
          defaultZoom={10}
          defaultCenter={{ lat: initialLat, lng: initialLng }}
          center={{ lat: this.state.lat, lng: this.state.lng }}
        >
          {shops.map((shop) => {
            return shop.shopObj.map((shopData, index: number) => {
              return (
                <Marker
                  key={index}
                  position={{ lat: shopData.lat, lng: shopData.lng }}
                  onClick={(e) =>
                    this.showSelectedShop(
                      index,
                      shop.companyName,
                      shopData.lat,
                      shopData.lng
                    )
                  }
                  visible={
                    this.state.filteredShop === "All-shops" ||
                    (this.state.filteredShop !== "All-shops" &&
                      this.state.filteredShop === shop.companyName)
                      ? true
                      : false
                  }
                  icon={shop.icon}
                >
                  {index === this.state.activeMarker &&
                    this.state.isShowInfoWindow &&
                    this.state.companyName === shop.companyName && (
                      <InfoWindow defaultZIndex={1}>
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
              lat: this.state.currentLocationLat,
              lng: this.state.currentLocationLng,
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
