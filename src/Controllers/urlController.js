const urlModel = require('../models/urlModel')
const validUrl = require('valid-url')
const shortid = require('shortid')

const baseUrl = 'http:localhost:3000'

let createShortUrl = async (req, res) => {

    if (req.body) {

        const longUrl = req.body.longUrl
        const urlCode = shortid.generate()

        if (!validUrl.isUri(baseUrl)) {
            return res.status(401).json('Invalid base URL')
        }

        // check long url if valid using the validUrl.isUri method
        if (validUrl.isUri(longUrl)) {
            try {

                let url = await urlModel.findOne({
                    longUrl
                })
                if (url) {
                    res.status(201).send({ status: true, data: url, msg: "url already exist" })
                }

                const shortUrl = baseUrl + '/' + urlCode

                const shortString = {
                    longUrl,
                    shortUrl,
                    urlCode,
                }

                let newUrl = await urlModel.create(shortString)

                if (newUrl) {
                    res.status(201).send({ status: true, mst: "data created", data: newUrl })
                } else {
                    res.status(400).send({ status: true, mst: "bad request" })
                }
            } catch (error) {
                res.status(500).send({ status: false, msg: error.message })
            }
        } else {
            res.status(401).send({ status: false, msg: 'Invalid longUrl' })
        }

    }
    else {
        res.status(401).send({ status: false, msg: 'must have request body' })
    }

    }


    let getUrl = async (req, res) => {
        try {
                const url = await urlModel.findOne({
                    urlCode: req.params.code
                })
            if (url) {
                return res.redirect(url.longUrl)
            } else {
                return res.status(404).send({ status: false, msg: 'Url not found' })
            }

        }
        catch (error) {

            res.status(500).send({ status: false, msg: error.message })
        }
    }
    module.exports.createShortUrl = createShortUrl
    module.exports.getUrl = getUrl