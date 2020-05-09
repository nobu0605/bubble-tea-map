import chatime from "../shopData/chatime.json";
import GongCha from "../shopData/GongCha.json";
import ChunShuiTang from "../shopData/ChunShuiTang.json";
import GongChaIcon from "../images/GongChaIcon.png";
import ChunShuiTangIcon from "../images/ChunShuiTangIcon.png";
import chatimeIcon from "../images/chatimeIcon.png";
import commerce from "../images/commerce.png";

export const shops = [
  {
    shopObj: [],
    icon: commerce,
    companyName: "All-shops",
    numberOfShops: chatime.length + GongCha.length + ChunShuiTang.length,
  },
  {
    shopObj: chatime,
    icon: chatimeIcon,
    companyName: "chatime",
    numberOfShops: chatime.length,
  },
  {
    shopObj: GongCha,
    icon: GongChaIcon,
    companyName: "GongCha",
    numberOfShops: GongCha.length,
  },
  {
    shopObj: ChunShuiTang,
    icon: ChunShuiTangIcon,
    companyName: "ChunShuiTang",
    numberOfShops: ChunShuiTang.length,
  },
];
