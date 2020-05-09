import React from "react";
import Map from "../components/Map";
import PersistentDrawerLeft from "../components/Drawer";

type Props = {
  isMarkerShown: boolean;
  filteredShop: string;
  match: {
    params: {
      companyName: string;
      shopId: number;
    };
  };
};
type State = { filteredShop: string };

export default class BubbleTeaMap extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      filteredShop: "All-shops",
    };
  }
  filteredShop = (selectedShop: string) => {
    this.setState({
      filteredShop: selectedShop,
    });
    if (this.props.match.params.companyName) {
      this.setState({
        filteredShop: this.props.match.params.companyName,
      });
    }
  };

  render() {
    return (
      <div className="bubbleTeaMap">
        <PersistentDrawerLeft />
        <Map
          isMarkerShown
          params={this.props.match.params}
          filteredShop={this.state.filteredShop}
        />
      </div>
    );
  }
}
