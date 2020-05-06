import Geocode from "react-geocode";
import { apiKey } from "../config";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(apiKey);
// set response language. Defaults to english.
Geocode.setLanguage("en");
// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");
// Enable or disable logs. Its optional.
Geocode.enableDebug();

type shopArray = [
  {
    shop_name: string;
    address: string;
    lat: number;
    lng: number;
  }
];

let shopArray: shopArray = [
  { shop_name: "string", address: "string", lat: 0, lng: 0 },
];

export async function getAddress(shopData: any) {
  // Get latitude & longitude from address.
  for (let index = 0; index < shopData.length; index++) {
    await Geocode.fromAddress(shopData[index].shop_name).then(
      (response) => {
        shopArray[index] = response.results[0].geometry.location;
        shopArray[index].shop_name = shopData[index].shop_name;
        shopArray[index].address = shopData[index].address;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  exportToJson(shopArray);
}

export function exportToJson(objectData: Object) {
  let filename = "export.json";
  let contentType = "application/json;charset=utf-8;";
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    var blob = new Blob(
      [decodeURIComponent(encodeURI(JSON.stringify(objectData)))],
      { type: contentType }
    );
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    var a = document.createElement("a");
    a.download = filename;
    a.href =
      "data:" +
      contentType +
      "," +
      encodeURIComponent(JSON.stringify(objectData));
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
