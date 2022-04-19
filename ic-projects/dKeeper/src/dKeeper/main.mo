import List "mo:base/List";
import Debug "mo:base/Debug";
import Char "mo:base/Char";
import Text "mo:base/Text";

actor DKeeper {
  public type Note = {
    title: Text;
    content: Text;
    id: Text;
  };

  stable var notes: List.List<Note> = List.nil<Note>();
  // CREATE
  public func createNote(titleText: Text, contentText: Text, myID: Text) {
    let newNote: Note = {
      title = titleText;
      content = contentText;
      id = myID;
    };

    notes := List.push(newNote, notes);
    Debug.print(debug_show(notes));  
  };

  // READ QUERY = faster
  public query func readNotes(): async [Note] {
    return List.toArray(notes);
  };

// DELETE
  public func removeNote(index: Nat) {
      var takeNotes = List.take(notes, index);
      var dropNotes = List.drop(notes, index + 1);
      notes := List.append(takeNotes,dropNotes);
     };
    //  Wish I could figure out how to delete by ID.
};


// actor {
//   public func greet(name : Text) : async Text {
//     return "Hello, " # name # "!";
//   };
// };
