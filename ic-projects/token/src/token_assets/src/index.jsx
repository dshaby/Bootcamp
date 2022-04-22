import ReactDOM from 'react-dom/client'
import React from 'react'
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client";

const root = ReactDOM.createRoot(document.getElementById("root"));

const init = async () => {
    // const authClient = await AuthClient.create();
    // await authClient.login({
    //     identityProvider: "https://identity.ic0.app/#authorize",
    //     maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
    // onSuccess: async () => {
    root.render(<App />);;
    //         }
    //     });
}

init();


