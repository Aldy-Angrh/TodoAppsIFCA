import { Dimensions } from "react-native";
import { heightMobileUI, widthMobileUI } from "../constant";

export const responsiveWidth = (width) => {
    return Dimensions.get('window').width*width/widthMobileUI;
}

export const responsiveHeight = (height) => {
    return Dimensions.get('window').height*height/heightMobileUI;
}

export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export const ColorCategory = (color)=>{
if (color === "easy") {
    return "#3EC70B"
} else if  (color === "Medium") {
    return "#FBB454"
}  else if  (color === "hard") {
    return "#EB1D36"
}
}