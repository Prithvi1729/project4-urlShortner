const mongoose = require("mongoose")
const collegeModel = require("../Models/CollegeModel")
const InternModel = require("../models/internModel")



const isValid = function (value) {
   if (typeof value == undefined || typeof value == null) return false
   if (typeof value == "string" && value.trim().length == 0) return false
   return true
}



//create collegeData
const createCollege = async function (req, res) {
   try {
      const data = req.body
      if (Object.keys(data).length > 0) {
         if (!isValid(data.name)) {
            return res.status(400).send({ status: false, msg: "Name is Mandatory" })
         }
         if (!isValid(data.fullName)) {
            return res.status(400).send({ status: false, msg: "Full name is Mandatory" })
         }
         if ((/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(data.logoLink))) {

            const savedData = await collegeModel.create(data)

            return res.status(201).send({ status: true, msg: "College detail Saved Successfully", data: savedData })

         } else { res.status(401).send({ msg: "Please Enter A Valid Url" }) }

      } else { res.status(401).send({ Message: "Enter Some Mandatory Detail" }) }

   } catch (error) {
      return res.status(500).send({ error: error.message })
   }
}

//get college intern data

const collegeDetails = async function (req, res) {
   try {
      let collegeName = req.query.collegeName

      if (!collegeName) {
         return res.status(400).send({ status: false, err: "Please Provide anabbreviated college name. For example iith, By Query" })
      }
      let lowerCase = collegeName.toLowerCase()
      let filterCollege = await collegeModel.findOne({ name: lowerCase })
      if (!filterCollege) {
         return res.status(404).send({ status: false, err: "College Data Not Found" })
      }

      let InternsEntry = await InternModel.find({ collegeId: filterCollege._id })
      let result = { name: filterCollege.name, fullName: filterCollege.fullName, logoLink: filterCollege.logoLink }
      if (InternsEntry.length > 0) {
         result["Interests"] = InternsEntry

         return res.status(200).send({data:result,  })
      }

      if (InternsEntry.length == 0) {

         result["Interests"] = "No Inters Available on That College";
         return res.status(200).send({ data: result })
      }


   } catch (err) {
      return res.status(404).send({ err: err.message })
   }

}






module.exports.collegeDetails = collegeDetails;
module.exports.createCollege = createCollege
