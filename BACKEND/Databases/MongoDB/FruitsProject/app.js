const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://danielshaby1:TBuCFs2esaUQgWDt@cluster0.4twxp.mongodb.net/fruitsDB?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const dbName = "fruitsDB";

async function run() {
    try {
        await client.connect();

        const database = client.db(dbName);
        const fruits = database.collection('fruits');

        const docs = [
            {
                name: "Apple",
                score: 8,
                review: "Great Fruit!"
            },
            {
                name: "Orange",
                score: 6,
                review: "Kinda sour"
            },
            {
                name: "Banana",
                score: 9,
                review: "Great Stuff!"
            }
        ]

        const result = await fruits.insertMany(docs);
        console.log(`${result.insertedCount} documents were inserted.`);

        const myDoc = await fruits.find();
        console.log(myDoc);

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);

// client.connect(function (err) {
//     // assert.equal(null, err);
//     console.log("Succcesfully connectedd");
//     const db = client.db(dbName);

//     insertDocuments(db, function () {
//         client.close();
//     })
// })

// const insertDocuments = function (db, callback) {
//     const collection = db.collection("fruitsDB");

//     collection.insertMany([
//         {
//             name: "Apple",
//             score: 8,
//             review: "Great Fruit!"
//         },
//         {
//             name: "Orange",
//             score: 6,
//             review: "Kinda sour"
//         },
//         {
//             name: "Banana",
//             score: 9,
//             review: "Great Stuff!"
//         }
//     ], function (err, result) {
//         // assert.equal(err, null);
//         // assert.equal(3, result.result.n);
//         // assert.equal(3, result.ops.length);
//         console.log("Inserted 3 documents into the collection");
//         callback(result);
//     })
// }