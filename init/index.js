// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";





// main()
// .then(() => {
//  console.log("connect to DB")
// })
// .catch((err) => {
//     console.log(err)
// })
// async function main() {
//     await mongoose.connect(MONGO_URL);
    
// }

// const initDB = async () => {
//     await Listing.deleteMany({});
//    initData.data.map((obj) => ({ obj, 
//     owner: "693ee665b669bdd005f16a5a" 
// }));
// await Listing.insertMany(updatedData);

//     // await Listing.insertMany(initData.data);
//      await Listing.insertMany(listingsWithOwner);
//     console.log("data was initialized");
// };

// initDB();


const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("connect to DB");
}

main().catch(err => console.log(err));

const initDB = async () => {
  await Listing.deleteMany({});

  const listingsWithOwner = initData.data.map((listing) => ({
    ...listing,
    owner: new mongoose.Types.ObjectId("693ee665b669bdd005f16a5a"),
  }));

  await Listing.insertMany(listingsWithOwner);
  console.log("data was initialized");
};

initDB();
