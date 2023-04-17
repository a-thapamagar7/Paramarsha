const express = require("express")
const College = require("../models/colleges.model")
const University = require("../models/universities.model")
const router = express.Router()


router.post("/university/create", async (req, res) => {
    const { name, location, website, courses, subjects, colleges, description } = req.body
    if (!name || !description || !location|| !website || subjects.length === 0 || courses.length === 0)
        return res.json({ error: "input_empty", msg: "Required field is empty" })
    try {
        await University.create({ 
            name: req.body.name, 
            description: req.body.description, 
            location: req.body.location, 
            website: req.body.website, 
            subjects: req.body.subjects, 
            colleges: req.body.colleges, 
            courses: req.body.courses,
            imgURL: req.body.imgURL,
            logoURL: req.body.logoURL,
        })
        const answer = await University.find({})
        return res.json({ status: "success", message: "data_added", data: answer})
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })

    }
})

router.get("/getuniversities", async (req, res) => {
    try {
        const university = await University.distinct("name")
        return res.json({ status: "success", message: "data_added", data: university })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }

})

router.get("/getrequireduniversity/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const university = await University.findById(id)
        return res.json({ status: "success", message: "data_found", data: university })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }

})

router.get("/gethighestuniversity", async (req, res) => {
    const collegeNames = await College.aggregate([
        {
          $lookup: {
            from: 'review-data',
            localField: '_id',
            foreignField: 'college',
            as: 'reviewsData'
          }
        },
        {
          $addFields: {
            overallRating: { $avg: '$reviewsData.overallRating' } 
          }
        },
        {
          $sort: { overallRating: -1 }
        },
        {
          $limit: 3
        },
        {
          $project: {
            _id: 0,
            name: 1
          }
        }
      ]);
      
      // Extract only the names from the collegeNames array
      const namesArray = collegeNames.map(college => college.name);
      const universities = await University.find({ colleges: { $in: namesArray } })
    return res.json({ status: 'success', message: 'data_added', data: universities });
})

router.get("/getuniversityinfo", async (req, res) => {
    try {
        const university = await University.find({})
        return res.json({ status: "success", message: "data_added", data: university })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })

    }
})

router.delete("/university/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const university = await University.findByIdAndDelete(id)
        return res.json({ status: "success", message: "data_deleted" })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }
})

router.patch("/university/update/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const university = await University.findByIdAndUpdate(id, req.body)
        return res.json({ status: "success", message: "data_updated" })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }
})

router.get("/getuniversityinfo", async (req, res) => {
    try {
        const university = await University.find({})
        return res.json({ status: "success", message: "data_added", data: university })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })

    }
})


module.exports = router