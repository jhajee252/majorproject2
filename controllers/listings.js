const Listing = require("../models/listing");

module.exports.index = async(req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
    };



   module.exports.renderNewForm = (req,res)  =>{
    // router.get("/new", isLoggedIn)
    res.render("listings/new.ejs")
};

module.exports.showListing = async(req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate: {
            path: "author",
        },
    })
    .populate("owner");
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    console.log("/listings")
    res.render("listings/show.ejs", {listing});
};

// module.exports.createListing = async (req,res,next) => {
//       let url = req.file.path;
//       let filename = req.file.filename;

//      const newListing = new Listing(req.body.listing);
//      newListing.owner = req.user._id;
//      newListing.image = { url, filename };
//     //   await newListing.save();
//     if (req.file) {
//     newListing.image = { url: req.file.path, filename: req.file.filename };
// }

//       req.flash("success", "New Listing Created!");
//     res.redirect("/listings");
//  };

//  module.exports.renderEditform = async (req,res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id);
//       req.flash("success", " Listing Edited!");
//     res.render("listings/edit.ejs", {listing});
// };
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }


let originalImageUrl = listing.image.url;

  originalImageUrl =originalImageUrl.replace("/upload/", "/upload/h_300,w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};


module.exports.createListing = async (req, res, next) => {
  try {
    // 1️⃣ Create listing from form data
    const newListing = new Listing(req.body.listing);

    // 2️⃣ Add owner
    if (req.user) {
      newListing.owner = req.user._id;
    } else {
      req.flash("error", "You must be logged in!");
      return res.redirect("/users/login");
    }

    // 3️⃣ Add image if uploaded
    if (req.file) {
      newListing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    // 4️⃣ Save to database
    const savedListing = await newListing.save();
    console.log("Saved Listing:", savedListing);

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  } catch (err) {
    console.log("Error saving listing:", err);
    req.flash("error", "Failed to create listing!");
    res.redirect("/listings/new");
  }
};


// module.exports.updateListing = async(req,res) => {
//      let { id } = req.params;
//  await Listing.findByIdAndUpdate(id,
//    {...req.body.listing});
//      req.flash("success", "Listing Updated");
//  res.redirect(`/listings/${id}`);
// };
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { new: true }
    
  );

  // ✅ Image update
  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
    // listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
      req.flash("success", " Listing Deleted!");
    console.log(deletedListing);
    res.redirect("/listings");
};

