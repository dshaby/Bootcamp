import ReactDOM from "react-dom/client";
import { Card } from "./components/App";
import { Contacts } from "./components/Contacts";
const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
    <div>
     <h1>My Contacts</h1>
          <Card {...Contacts[0]}/>
          <Card {...Contacts[1]}/>
          <Card {...Contacts[2]}/>
    </div>
  );