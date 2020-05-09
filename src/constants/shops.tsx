import chatime from "../shopData/chatime.json";
import GongCha from "../shopData/GongCha.json";
import ChunShuiTang from "../shopData/ChunShuiTang.json";
import GongChaIcon from "../images/GongChaIcon.png";
import ChunShuiTangIcon from "../images/ChunShuiTangIcon.png";
import chatimeIcon from "../images/chatimeIcon.png";
import commerce from "../images/commerce.png";

export type shopObjType = Array<{
  lat: number;
  lng: number;
  shop_name: string;
  address: string;
}>;

const chatimeObj: shopObjType = chatime;
const GongChaObj: shopObjType = GongCha;
const ChunShuiTangObj: shopObjType = ChunShuiTang;

export type shopsType = Array<{
  shopObj: shopObjType;
  icon: string;
  companyName: string;
  numberOfShops: number;
}>;

export const shops: shopsType = [
  {
    shopObj: [],
    icon: commerce,
    companyName: "All-shops",
    numberOfShops:
      chatimeObj.length + GongChaObj.length + ChunShuiTangObj.length,
  },
  {
    shopObj: chatimeObj,
    icon: chatimeIcon,
    companyName: "chatime",
    numberOfShops: chatimeObj.length,
  },
  {
    shopObj: GongChaObj,
    icon: GongChaIcon,
    companyName: "GongCha",
    numberOfShops: GongChaObj.length,
  },
  {
    shopObj: ChunShuiTangObj,
    icon: ChunShuiTangIcon,
    companyName: "ChunShuiTang",
    numberOfShops: ChunShuiTangObj.length,
  },
];
