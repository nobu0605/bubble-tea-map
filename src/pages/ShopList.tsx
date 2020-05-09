import React from "react";
import SimpleCard from "../components/ShopCard";
import PersistentDrawerLeft from "../components/Drawer";
import styled from "styled-components";
import { shops } from "../constants/shops";

export default class ShopList extends React.Component {
  render() {
    const shopsCard: any = [];
    shops.forEach((shop) => {
      for (let index = 0; index < Object.keys(shop.shopObj).length; index++) {
        if (shop.companyName === "All-shops") {
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
        <Title style={{ display: "flex", justifyContent: "center" }}>
          ShopList
        </Title>
        {shopsCard}
      </div>
    );
  }
}

const Title = styled.span`
  font-size: 2em;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
  color: black;
`;
