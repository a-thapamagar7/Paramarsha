const express = require("express")
const College = require("../models/colleges.model")
const router = express.Router()


router.post("/college/create", async (req, res) => {
    const { name, location, website, courses, subjects, university, description, approximateFee } = req.body
    if (!name || !description || !location|| !website || subjects.length === 0 || !university || courses.length === 0 || approximateFee < 0)
        return res.json({ error: "input_empty", msg: "Required field is empty" })
    try {
        await College.create({ 
            name: req.body.name, 
            description: req.body.description, 
            location: req.body.location, 
            website: req.body.website, 
            approximateFee: req.body.approximateFee, 
            subjects: req.body.subjects, 
            university: req.body.university, 
            courses: req.body.courses,
            imgURL: req.body.imgURL,
            logoURL: req.body.logoURL,
            
        })
        const answer = await College.find({})
        return res.json({ status: "success", message: "data_added", data: answer})
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })

    }
})

router.get("/getcolleges", async (req, res) => {
    try {
        const college = await College.distinct("name")
        return res.json({ status: "success", message: "data_added", data: college })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }

})

router.get("/getrequiredcollege/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const college = await College.findById(id)
        return res.json({ status: "success", message: "data_found", data: college })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }

})

router.get("/getcollegeinfo", async (req, res) => {
    try {
        const college = await College.find({})
        return res.json({ status: "success", message: "data_added", data: college })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })

    }
})

router.get("/gethighestcollege", async (req, res) => {
    const colleges = await College.aggregate([
        {
          $lookup: {
            from: 'review-data', // Collection name of the 'Reviews' model
            localField: '_id', // Field in the 'College' model to match with '_id' field in 'Reviews' model
            foreignField: 'college', // Field in the 'Reviews' model that contains the college references
            as: 'reviewsData' // Name of the field to store the retrieved reviews data
          }
        },
      
        // Stage 3: Calculate overall rating for each college
        {
          $addFields: {
            overallRating: { $avg: '$reviewsData.overallRating' } // Assuming 'reviewsData.rating' contains the rating field in the 'Reviews' model
          }
        },
      
        // Stage 4: Sort colleges by overall rating in descending order
        {
          $sort: { overallRating: -1 }
        },
      
        // Stage 5: Limit the retrieved documents to 3
        {
          $limit: 3
        }
      ]);
      return res.json({ status: 'success', message: 'data_added', data: colleges });
      
})

router.delete("/college/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const college = await College.findByIdAndDelete(id)
        return res.json({ status: "success", message: "data_deleted" })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }
})

router.patch("/college/update/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const college = await College.findByIdAndUpdate(id, req.body)
        return res.json({ status: "success", message: "data_updated" })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }
})


module.exports = router