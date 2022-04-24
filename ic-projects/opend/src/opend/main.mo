import Cycles "mo:base/ExperimentalCycles";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import NFTActorClass "../NFT/nft";
import Principal "mo:base/Principal";
import List "mo:base/List";

actor OpenD {

    var mapOfNFTs = HashMap.HashMap<Principal, NFTActorClass.NFT>(1, Principal.equal, Principal.hash);
    var mapOfOwners = HashMap.HashMap<Principal, List.List<Principal>>(1,Principal.equal, Principal.hash);

    public shared(msg) func mint(imgData: [Nat8], name: Text) : async Principal {
        let owner : Principal = msg.caller;

        Debug.print(debug_show(Cycles.balance()));
        Cycles.add(100_500_000_000);
        let newNFT = await NFTActorClass.NFT(name, owner, imgData);
        Debug.print(debug_show(Cycles.balance()));

        let newNFTPrincipal = await newNFT.getCanisterID();

        mapOfNFTs.put(newNFTPrincipal,newNFT);
        addToOwnerMap(owner,newNFTPrincipal);

        return newNFTPrincipal;
    };

    private func addToOwnerMap(owner: Principal, nftID: Principal) {
        // Initializing empty list or grabbing exiting list of a specific person
        var ownedNFTs : List.List<Principal> = switch (mapOfOwners.get(owner)) {
            case null List.nil<Principal>();
            case (?result) result;
        }; 
        // Adding that nftID to that list above
        ownedNFTs := List.push(nftID, ownedNFTs);
        // adding that updated list to the actual owner
        mapOfOwners.put(owner, ownedNFTs);
    };

    public query func getOwnedNFTs(user: Principal) : async [Principal] {
        // List of NFT Canister IDs that belong to the user (argument)
        var userNFTs : List.List<Principal> = switch (mapOfOwners.get(user)) {
            case null List.nil<Principal>();
            case (?result) result;
        };
       return List.toArray(userNFTs);
    }; 
};
