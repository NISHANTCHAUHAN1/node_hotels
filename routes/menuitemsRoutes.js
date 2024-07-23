const express = require('express');
const router = express.Router();
const menuItems = require("../models/Menuitems");


router.post("/", async (req, res) => {
    try {
      const data = req.body;
  
      const newMenu = new menuItems(data);
  
      const response = await newMenu.save();
      console.log("data saved");
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.get("/", async (req, res) => {
    try {
        const data = await menuItems.find()
        console.log('data fetched');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"})
    }
})

module.exports = router;