import { dbank } from "../../declarations/dbank";

window.addEventListener("load", async () => {
  console.log("Finished loading!");

  updateBalance();
});

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const button = e.target.querySelector("#submit-btn");
  button.disabled = true;

  const topUpAmount = parseFloat(document.getElementById("input-amount").value);
  if (topUpAmount) {
    await dbank.topUp(topUpAmount);
    document.getElementById("input-amount").value = "";
  }
  const withdrawAmount = parseFloat(document.getElementById("withdrawal-amount").value);
  if (withdrawAmount) {
    await dbank.withdraw(withdrawAmount);
    document.getElementById("withdrawal-amount").value = "";
  }

  await dbank.compound();
  updateBalance();
  button.disabled = false;
});

async function updateBalance() {
  const currentAmount = await dbank.checkBalance();
  const cleanAmount = Math.round(currentAmount * 100) / 100;
  document.getElementById("value").innerText = cleanAmount;
}