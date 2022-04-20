import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";

actor Token {
  var owner : Principal = Principal.fromText("lujmz-nhoos-oy2la-4dhat-b5m55-fveo7-vnppg-hp4or-q4ift-m4cyc-nae");
  var totalSupply : Nat = 1000000000;
  var symbol : Text = "DANG";

  var balances = HashMap.HashMap<Principal, Nat>(1,Principal.equal,Principal.hash);
  balances.put(owner, totalSupply);

  public query func balanceOf(who: Principal) : async Nat {
    let balance : Nat = switch (balances.get(who)) {
      case null 0;
      case (?result) result;
    };
    return balance;
  };

  public shared(msg) func payOut() : async Text {
    Debug.print(debug_show(msg.caller));
    // if (balances.get(msg.caller) == null) {
    //   let amount : Nat = 10000;
    //   balances.put(msg.caller, amount);
      return "Success!";
    // } else {
    //   return "Already claimed 10,000";
    // }
  };

  public func transfer(to: Principal, amount: Nat) : async Text {
    let result = await payOut();
    return "Hey";
  };

  public query func getSymbol() : async Text  {
    return symbol; 
  };
};
