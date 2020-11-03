const crudModel = require("../models/tutorial.model");

// Create and Save a new Tutorial
exports.create = (req, res) => {

    const title = req.body.title;
    const description = req.body.description;
    const published = req.body.published ? req.body.published : false;

    if(!title){
        return res.status(400).json({
            success: false,
            message: "content cannot be empty!"
        });
    }
    
    const tutorial = new crudModel({title:title, description:description, published:published});

    // Save Tutorial in the database
    tutorial.save()
        .then(data => {
            res.status(200).json({
                success:true,
                message: "tutorial created successfully!",
                data: data
            })
        })
        .catch(err => {
            res.status(400).json({
                success:false,
                message: "Some error occurred while creating the Tutorial!",
                err: err
            })
        })

};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    crudModel.find().sort({ title: 1})
    .then(data => {
        res.status(200).json({
            success: true,
            message: "tutorials fetched successfully!",
            data: data
        })
    })
    .catch(err => {
            res.status(400).json({
                success:false,
                message: "Some error occurred while fetching the Tutorial!",
                err: err
            })
        })
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params._id;

    crudModel.findById(id)
        .then(data => {
            res.status(200).json({
                success: true,
                message: "tutorial fetched successfully!",
                data: data
            })
        })
        .catch(err => {
            res.status(400).json({
                success: false,
                message: "Some error occurred while fetching the Tutorial!",
                err: err
            })
        })
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params._id;

    crudModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
        .then(data => {
            if (!data) {
                res.status(404).json({
                    success: false,
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            } else res.status(200).json({ 
                success: true,
                message: "Tutorial was updated successfully.",
                data: data 
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "Error updating Tutorial with id=" + id,
                err: err
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params._id;

    crudModel.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).json({
                    success: false,
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "Tutorial was deleted successfully!",
                    data: data
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: "Could not delete Tutorial with id=" + id,
                err: err
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    crudModel.deleteMany()
        .then(data => {
            console.log(data);
            res.status(200).json({
                success: true,
                message: `${data.deletedCount} tutorials deleted successfully!`,
                data: data
            })
        })
        .catch(err => {
            res.status(400).json({
                success: false,
                message: "Some error occurred while deleting tutorials!",
                err: err
            })
        })
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    crudModel.find({published:true}).sort({ title: 1 })
        .then(data => {
            res.status(200).json({
                success: true,
                message: "published tutorials fetched successfully!",
                data: data
            })
        })
        .catch(err => {
            res.status(400).json({
                success: false,
                message: "Some error occurred while fetching the published Tutorial!",
                err: err
            })
        })
};