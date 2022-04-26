import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Float "mo:base/Float";
import Iter "mo:base/Iter";

actor Token {
  var owner : Principal = Principal.fromText("lujmz-nhoos-oy2la-4dhat-b5m55-fveo7-vnppg-hp4or-q4ift-m4cyc-nae");
  var totalSupply : Nat = 1000000000;
  var symbol : Text = "DANG";

  private stable var balanceEntries: [(Principal, Nat)] = [];
  private var balances = HashMap.HashMap<Principal, Nat>(1,Principal.equal,Principal.hash);
  if (balances.size() < 1) {
      balances.put(owner, totalSupply);
  };  

  // CHECK BALANCE
  public query func balanceOf(who: Principal) : async Nat {
    let balance : Nat = switch (balances.get(who)) {
      case null 0;
      case (?result) result;
    };
    return balance;
  };
  // CHECK SUPPLY
  public query func querySupply(): async Nat {
    return totalSupply;
  };

  // PAY OUT
  public shared(msg) func payOut() : async Text {

    Debug.print(debug_show(msg.caller));
    if (balances.get(msg.caller) == null) {
      let amount : Nat = 10000;
      let result = await transfer(msg.caller, amount);
      return result;
      
      // My Version:
      // let fromBalance: Nat = totalSupply - amount;
      // if (fromBalance >= 0) {
      //   totalSupply := fromBalance;
      //   balances.put(msg.caller, amount);
      //   return "Success";
      // } else {
      //   return "No more tokens on the blockchain. Please transfer with someone."
      //   };

    } else {
      return "Already claimed 10,000";
    }
  };
  // TRANSFER
  public shared(msg) func transfer(to: Principal, amount: Nat) : async Text {
    let fromBalance = await balanceOf(msg.caller);
    Debug.print(debug_show(fromBalance));

    if (fromBalance >= amount) {
      // Remove $
      let newFromBalance: Nat = fromBalance - amount;
      balances.put(msg.caller, newFromBalance);
      // Add $
      let toBalance = await balanceOf(to);
      let newToBalance: Nat = toBalance + amount; 
      balances.put(to, newToBalance);
      
      return "Success!";
    } else {
      Debug.print(debug_show(msg.caller));
      Debug.print(debug_show(fromBalance));
      return "Insufficient funds";
    };
    
  };

  // GET SYMBOL 
  public query func getSymbol() : async Text  {
    return symbol; 
  };

  system func preupgrade() {
    balanceEntries := Iter.toArray(balances.entries());
  };

  system func postupgrade() {
    balances := HashMap.fromIter<Principal,Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
  };
};
