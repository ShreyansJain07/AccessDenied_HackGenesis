import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

import { extendTheme } from '@chakra-ui/react'
import '@fontsource/poppins';


const colors = {
  "black": "#0c1015",
  "gray": {
    "50": "#f7f7f7",
    "100": "#e0e0e0",
    "200": "#c5c5c5",
    "300": "#a6a6a6",
    "400": "#949494",
    "500": "#7d7d7d",
    "600": "#696969",
    "700": "#545454",
    "800": "#474747",
    "900": "#333333"
  },
  "teal": {
    "50": "#edfdfd",
    "100": "#adf5f4",
    "200": "#51eae7",
    "300": "#00d3d0",
    "400": "#00b4b0",
    "500": "#009996",
    "600": "#007c7a",
    "700": "#00615f",
    "800": "#00514f",
    "900": "#004341"
  },
  "cyan": {
    "50": "#f2fcfd",
    "100": "#c6f1f8",
    "200": "#aceaf5",
    "300": "#8ce2f1",
    "400": "#1dc5e4",
    "500": "#00b5d6",
    "600": "#00a3c1",
    "700": "#00879f",
    "800": "#006f83",
    "900": "#005666"
  },
  "blue": {
    "50": "#f0f7fd",
    "100": "#c7e1f8",
    "200": "#9ecaf3",
    "300": "#70b1ee",
    "400": "#4298e8",
    "500": "#1680e3",
    "600": "#0069cb",
    "700": "#00509b",
    "800": "#004280",
    "900": "#003668"
  },
  "purple": {
    "50": "#f8f6fe",
    "100": "#e4dafa",
    "200": "#d0bef7",
    "300": "#b396f2",
    "400": "#9e79ef",
    "500": "#8252ea",
    "600": "#6c34e6",
    "700": "#510de2",
    "800": "#3e00c4",
    "900": "#2f0095"
  },
  "pink": {
    "50": "#fef5fa",
    "100": "#fad8ea",
    "200": "#f6b7d8",
    "300": "#f189bf",
    "400": "#ec64aa",
    "500": "#e42488",
    "600": "#cd006a",
    "700": "#a80057",
    "800": "#850045",
    "900": "#640034"
  },
  "orange": {
    "50": "#fefaf6",
    "100": "#fbeadb",
    "200": "#f6d2b2",
    "300": "#eeaf74",
    "400": "#e78d38",
    "500": "#de6b00",
    "600": "#bb5a00",
    "700": "#954800",
    "800": "#763900",
    "900": "#612f00"
  },
  "yellow": {
    "50": "#fff6e7",
    "100": "#ffdc9b",
    "200": "#ffb939",
    "300": "#dd981c",
    "400": "#c58819",
    "500": "#a67315",
    "600": "#8c6112",
    "700": "#714e0e",
    "800": "#5f420c",
    "900": "#452f09"
  },
  "green": {
    "50": "#f3fae9",
    "100": "#cdeaa4",
    "200": "#9ed64f",
    "300": "#71b80b",
    "400": "#65a50a",
    "500": "#558b08",
    "600": "#487507",
    "700": "#3a5e06",
    "800": "#315005",
    "900": "#233903"
  }
}

const theme = extendTheme({
  colors,
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },

})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
