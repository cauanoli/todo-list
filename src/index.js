import "./style.css";
import TestImage from "./assets/images/test_image.png";

const image = new Image();
image.src = TestImage;
document.querySelector("body").appendChild(image);

console.log("hello, world!");
