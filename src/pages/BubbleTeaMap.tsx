import React from "react";
import Map from "../components/Map";
import PersistentDrawerLeft from "../components/Drawer";

type Props = any;
type State = any;

export default class BubbleTeaMap extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      filteredShop: "All shops",
    };
  }
  filteredShops = (selectedShop: string) => {
    this.setState({
      filteredShop: selectedShop,
    });
  };

  render() {
    return (
      <div className="bubbleTeaMap">
        <PersistentDrawerLeft filteredShops={this.filteredShops} />
        <Map isMarkerShown filteredShops={this.state.filteredShop} />
      </div>
    );
  }
}
