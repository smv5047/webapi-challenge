const express = require("express")
const router = express.Router();
const db= require("../data/helpers/actionModel")
const project= require("../data/helpers/projectModel")

//Create
router.post("/:id/actions/", (req, res) =>{



    if(!req.body.description || !req.body.notes ) {
        return res.status(404).json({errorMessage: "Please include Action Description and Notes"})
    }

    db.get(req.params.id)
        .then(data =>{
            if(!data) {
                return res.status(404).json({errorMessage: "Project does not exist"})
            }
           
        })

    const payload = {
        description: req.body.description,
        notes: req.body.notes,
        project_id: req.params.id
    }
    db.insert(payload)
        .then(data => {
        
           return  res.status(201).json(data)
        })
        .catch(err => {
            res.status(500).json({errorMessage: "Issue creating action on server"})
        } )
})

//Read
router.get("/:id/actions/", (req,res) =>{
    project.getProjectActions(req.params.id)
        .then(data => {
            return res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({errorMessage: "Projects could not be found"})
            })
})

//Update
router.put("/:id/actions/:actionId", (req, res) =>{


    if(!req.body.description || !req.body.notes ) {
        return res.status(404).json({errorMessage: "Please include Action Description and Notes"})
    }

    db.get(req.params.id)
        .then(data =>{
            if(!data) {
                return res.status(404).json({errorMessage: "Project does not exist"})
            }
           
        })
    
    project.getProjectActions(req.params.actionId)
        .then(data => {
            if(!data) {
            return res.status(404).json({errorMessage: "Action does not exist"})
            }})
        
    const payload = {
        description: req.body.description,
        notes: req.body.notes,
       
    }

    db.update(req.params.actionId, payload)
        .then(data => {
            return res.status(200).json({data})
        })

        .catch(err =>{
            res.status(500).json({errorMessage: "Issue updating action on server"})
        })
})

//Delete

router.delete("/:id/actions/:actionId", (req, res) => {
    db.get(req.params.id)
        .then(data =>{
            console.log(data)
            if(!data) {
                return res.status(404).json({errorMessage: "Project does not exist"})
            }
           
        })
    
    db.remove(req.params.actionId)
        .then(data => {
            return res.status(204).json({message: `Action Successfully Deleted`})
        })
        .catch(err =>{
            res.status(500).json({errorMessage: "Action deleting project on server"})
        })
})




module.exports = router