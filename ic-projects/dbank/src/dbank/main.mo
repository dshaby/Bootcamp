import Debug "mo:base/Debug";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor Dbank {
  stable var currentValue: Float = 1000; 
  currentValue := 300;
  Debug.print(debug_show(currentValue));

  stable var startTime = Time.now();
  startTime := Time.now();
  Debug.print(debug_show(startTime));

  public func topUp(amount: Float) {
    currentValue += amount;
    Debug.print("You have added to your bank.");
    Debug.print(debug_show(currentValue));

  };

  public func withdraw(amount: Float) {
    let tempValue: Float = currentValue - amount;
    if (tempValue >= 0) {
       currentValue -= amount;
         Debug.print(debug_show(currentValue));

    } else {
      Debug.print("CurrentValue can't be less than zero");
        Debug.print(debug_show(currentValue));

    };
  };

  public func compound () {
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapsedS = timeElapsedNS / 1000000000;
    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedS));
    startTime := currentTime;
    Debug.print(debug_show(currentValue));

  };

  public query func checkBalance(): async Float {
    return currentValue;
  };
};

// actor {
//   public func greet(name : Text) : async Text {
//     return "Hello, " # name # "!";
//   };
// };
