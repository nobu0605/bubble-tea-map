import React from "react";
import SimpleCard from "../components/ShopCard";
import PersistentDrawerLeft from "../components/Drawer";
import styled from "styled-components";
import { shops } from "../constants/shops";
import search from "../images/search.svg";
import { RouteComponentProps } from "react-router-dom";
import { validateAddress } from "../utils/validation";

interface Props extends RouteComponentProps<{}> {}
type State = {
  filteredAddress: null | string;
};

export default class ShopList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      filteredAddress: null,
    };
  }

  filterList(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const isCorrectAddress = validateAddress(e.target.value, 100);
    if (!isCorrectAddress) {
      return alert("Please input an address within 100 characters.");
    }
    this.setState({ filteredAddress: e.target.value });
  }

  render() {
    const shopsCard: Array<any> = [];
    shops.forEach((shop) => {
      for (let index = 0; index < Object.keys(shop.shopObj).length; index++) {
        if (shop.companyName === "All-shops") {
          continue;
        }
        if (
          this.state.filteredAddress &&
          !shop.shopObj[index].address.includes(this.state.filteredAddress)
        ) {
          continue;
        }
        shopsCard.push(
          <SimpleCard
            key={shop.shopObj[index].shop_name}
            shopName={shop.shopObj[index].shop_name}
            companyName={shop.companyName}
            address={shop.shopObj[index].address}
            index={index}
          />
        );
      }
    });

    return (
      <div>
        <PersistentDrawerLeft />
        <Title
          style={{
            fontSize: 25,
            display: "flex",
            justifyContent: "center",
          }}
        >
          All Shops
        </Title>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SearchAddressInput
            placeholder="  Search Shop Address"
            type="text"
            onChange={(e) => this.filterList(e)}
          />
        </div>
        {shopsCard}
      </div>
    );
  }
}

const Title = styled.span`
  font-size: 2em;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 5px;
  color: black;
`;

const SearchAddressInput = styled.input`
  height: 30px;
  width: 200px;
  padding-left: 30px;
  padding-right: 10px;
  background-image: url(${search});
  background-position: 5px;
  background-repeat: no-repeat;
  border-width: thin;
  border-color: silver;
  border-style: solid;
`;
