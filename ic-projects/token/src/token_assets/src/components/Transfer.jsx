import React, { useState } from "react";
import { token } from "../../../declarations/token";
import { Principal } from "@dfinity/principal";

function Transfer() {

  const [principal, setPrincipal] = useState("");
  const [amount, setAmount] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function handleClick() {
    setDisabled(true);
    const toPrincipal = Principal.fromText(principal);
    const toAmount = Number(amount);
    const result = await token.transfer(toPrincipal, toAmount);
    setFeedback(result);
    setDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                onChange={(e) => { setPrincipal(e.target.value) }}
                value={principal}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                onChange={(e) => { setAmount(e.target.value) }}
                value={amount}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button
            id="btn-transfer"
            onClick={handleClick}
            disabled={isDisabled} >
            Transfer
          </button>
        </p>
        <p>
          {feedback}
        </p>
      </div>
    </div>
  );
}

export default Transfer;
