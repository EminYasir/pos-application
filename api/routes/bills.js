const Bill = require("../models/Bill.js");
const express = require("express");
const router = express.Router();

//! get all category
router.get("/get-all", async (req, res) => {
  try {
    const bills = await Bill.find();
    //res.send(bill);
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add-bill", async (req, res) => {
  try {
    const newBill = new Bill(req.body);
    await newBill.save();
    res.status(200).json("Item added succesfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});


// router.put("/update-bill", async(req,res)=>{
//     try {
//         await Bill.findOneAndUpdate({_id:req.body.billId},req.body)
//         res.status(200).json("Item updated succesfully.");
//     } catch (error) {
//         res.status(500).json(error);
//     }
// })

// router.delete("/delete-bill",async(req,res)=>{
//     try {
//         await Bill.findOneAndDelete({_id:req.body.billId})
//         res.status(200).json("Item deleted successfully");
//     } catch (error) {
//         res.status(500).json(error)
//     }
// })

module.exports = router;
