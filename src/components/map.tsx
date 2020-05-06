import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import chatime from "../shopData/chatime.json";
import GongCha from "../shopData/GongCha.json";
import ChunShuiTang from "../shopData/ChunShuiTang.json";
import { apiKey } from "../config";
import iconsMarker from "../images/iconsMarker.png";
import icons30 from "../images/icons30.png";

type Props = any;
type State = any;

const shops = [
  { shopObj: chatime, icon: iconsMarker, companyName: "chatime" },
  { shopObj: GongCha, icon: null, companyName: "GongCha" },
  { shopObj: ChunShuiTang, icon: icons30, companyName: "ChunShuiTang" },
];
let key = process.env.NODE_ENV;
console.log(key);
export default class MyMapComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isShowInfoWindow: false,
      activeMarker: 0,
      selectedPlace: {},
    };
  }

  onMarkerClick(props: any, selected: number, e: any) {
    this.setState({
      selectedPlace: props,
      activeMarker: selected,
      isShowInfoWindow: true,
    });
  }

  render() {
    const MyMapComponent: any = compose(
      withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apiKey}`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `1200px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withScriptjs,
      withGoogleMap
    )((props: any) => (
      <div>
        <GoogleMap
          defaultZoom={10}
          defaultCenter={{ lat: 35.6970463, lng: 139.7004277 }}
        >
          {this.props.isMarkerShown &&
            shops.map((shop: any) => {
              return shop.shopObj.map((shopData: any, index: number) => {
                return (
                  <div>
                    <Marker
                      position={{ lat: shopData.lat, lng: shopData.lng }}
                      onClick={(e) => this.onMarkerClick(this.props, index, e)}
                      icon={shop.icon}
                    >
                      {index === this.state.activeMarker &&
                        this.state.isShowInfoWindow &&
                        shop.companyName === "ChunShuiTang" && (
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
                  </div>
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
