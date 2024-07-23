const express = require('express');
const router = express.Router();
const Person = require('../models/Person');



router.post('/', async (req, res) => {
    try {
      const data = req.body;
  
      // create a new person document using mongoose model
      const newPerson = new Person(data);
  
      // save the newperson to the database
      const response = await newPerson.save();
      console.log("data saved");
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.get("/", async (req, res) => {
    try {
      const data = await Person.find();
      console.log("data fetched");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.get("/:workType", async (req, res) => {
    try {
      const workType = req.params.workType;
      if(workType == 'chef' || workType == "waiter" || workType == "manager" ) {
        const response = await Person.find({work: workType});
        console.log('response fetched');
        res.status(200).json(response)
      }else{
        res.status(404).json({error: "Invaild Url"})
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({error: "Internal Server Error"})
    }
  })

  router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;  // extract the id from the url
        const updatePersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
            new: true,
            runValidators: true
        })
        if(!updatePersonData) {
            return res.status(404).json({error: "Person not find"})
        }
        console.log("data updated");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"})    
    }
  })

  router.delete('/:id', async (req,res) => {
    try {
        const personId = req.params.id;
        const deletePerson = await Person.findByIdAndDelete(personId);

        if(!deletePerson) {
            return res.status(404).json({error: "Person deleted succesfully"})
        }
        console.log("data deleted");
        res.status(200).json(deletePerson)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"})
    }
  })

  module.exports = router;