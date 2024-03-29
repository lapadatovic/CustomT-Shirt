import { proxy } from "valtio";

const state = proxy ({
    // intro is used for checking if we are on home page
    intro: true,
    color: "#A28743",
    // Are we displaying LOGO on shirt
    isLogoTexture: true,
    isFullTexture: false,
    // Default logo on shirt
    logoDecal: './threejs.png',
    fullDecal: './threejs.png',
});

export default state;