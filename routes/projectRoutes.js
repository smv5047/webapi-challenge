const express = require("express")
const router = express.Router();
const db= require("../data/helpers/projectModel")


//Create
router.post("/", (req, res) =>{
    if(!req.body.name || !req.body.description) {
        return res.status(404).json({errorMessage: "Please include Project NAme and Description"})
    }
    db.insert({
        name: req.body.name,
        description: req.body.description
    })
        .then( data => {
            res.status(201).json(req.body)
        })
        .catch(err => {
            res.status(500).json({erroreEssage: "Issue creating project on server"})
        } )
})

//Read
router.get("/", (req,res) =>{
    db.get()
        .then(data => {
           return res.status(200).json(data)
        })
        .catch(err => {
           res.status(500).json({errorMessage: "Projects could not be found"})
        })

})

//Update
router.put("/:id", (req, res) =>{
    if(!req.body.name || !req.body.description) {
        return res.status(404).json({errorMessage: "Please include Project Name and Description"})
    }
    db.get(req.params.id)
        .then(data =>{
            if(!data) {
                return res.status(404).json({errorMessage: "Project does not exist"})
            }
           
        })
    db.update(req.params.id, {
        name: req.body.name,
        description: req.body.description
        })
        .then(data => {
            return res.status(200).json({
                name: req.body.name,
                description: req.body.description
                })
        })

        .catch(err =>{
            res.status(500).json({errorMessage: "Issue updating project on server"})
        })
})

//Delete

router.delete("/:id", (req, res) => {
    db.get(req.params.id)
        .then(data =>{
            console.log(data)
            if(!data) {
                return res.status(404).json({errorMessage: "Project does not exist"})
            }
           
        })
    db.remove(req.params.id)
        .then(data => {
            return res.status(204).json({message: `Project Successfully Deleted`})
        })
        .catch(err =>{
            res.status(500).json({errorMessage: "Issue deleting project on server"})
        })
})



module.exports = router