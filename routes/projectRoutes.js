const express = require("express")
const router = express.Router();
const db= require("../data/helpers/projectModel")



router.get("/", (req,res) =>{
    db.get()
        .then(data => {
           return res.status(200).json(data)
        })
        .catch(err => {
           res.status(404).json({errorMessage: "Projects could not be found"})
        })

})
module.exports = router