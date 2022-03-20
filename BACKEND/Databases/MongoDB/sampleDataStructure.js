db.products.insert(
    {
        _id: 3,
        name: "Rubber",
        price: 1.30,
        stock: 43,
        reviews: [
            {
                authorName: "Sally",
                rating: 5,
                review: "Best rubber ever!"
            },
            {
                authorName: "Daniel",
                rating: 5,
                review: "Best material ever!"
            }
        ]
    }
)


db.products.insertOne(
    {
        _id: 2,
        name: "Pencil",
        price: 0.80,
        stock: 100,
        reviews: [
            {
                authorName: "Shaby",
                rating: 5,
                review: "Great pencil!"
            },
            {
                authorName: "Daniel",
                rating: 4,
                review: "Pencil works"
            }
        ]
    }
)