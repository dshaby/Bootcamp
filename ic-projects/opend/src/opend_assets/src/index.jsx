import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { Principal } from "@dfinity/principal";
const root = ReactDOM.createRoot(document.getElementById("root"));

const CURRENT_USER_ID = Principal.fromText("2vxsx-fae");
export default CURRENT_USER_ID;

const init = async () => {
  root.render(<App />);
};

init();
