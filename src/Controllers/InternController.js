const InternModel = require("../models/internModel")





const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}




const InternCreate = async function (req, res) {


    try {

        let data = req.body;

        if (Object.keys(data).length > 0) {

            if (!isValid(data.name)) {
                return res.status(400).send({ status: false, msg: "Name is Mandatory" })
            }
            if (!isValid(data.collegeId)) {
                return res.status(400).send({ status: false, msg: "College Id is Mandatory" })
            }

            if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(data.email))) {
                return res.status(400).send({ status: false, msg: "Please Enter a Valid Email" })
            }
            if (!(/^([+]\d{2})?\d{10}$/.test(data.mobile))) {
                return res.status(400).send({ status: false, msg: "Please Enter  a Valid Mobile Number" })
            }

            let AlreadyExistData = await InternModel.findOne({ email: data.email })

            if (AlreadyExistData) {
                return res.status(400).send({ status: false, msg: "Email already exists" })
            }

            let savedData = await InternModel.create(data);
            return res.status(201).send({ status: true, data: savedData, msg: "Intern data Saved Succefully" });

        } else {
            return res.status(400).send({ status: false, msg: "Enter Mandatory Field" })
        }

    } catch (err) {

        return res.status(500).send({ error: err.message })

    }
}




module.exports.InternCreate = InternCreate;