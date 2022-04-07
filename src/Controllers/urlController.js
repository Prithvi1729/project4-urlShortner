const urlModel = require('../models/urlModel')
const validUrl = require('valid-url')
const shortid = require('shortid')

const redis = require("redis");
const { promisify } = require("util");

//Connect to redis
const redisClient = redis.createClient({
   port: 13124,
    host: "redis-13124.c212.ap-south-1-1.ec2.cloud.redislabs.com",
   // { no_ready_check: true }
});
redisClient.auth("7dt27hqDd4B9iQFsDpiu7m27G4cLo4sA", function (err) {
    if (err) throw err;
});

redisClient.on("connect", async function () {
    console.log("Connected to Redis..");
});

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient)
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient)

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
                let longUrlData = await GET_ASYNC(`${longUrl}`)
                cachedLongUrlData = JSON.parse(longUrlData)
                 if (cachedLongUrlData) {
                     return res.status(200).send({ 'msg': "'provided url already exist in record", 'record': cachedLongUrlData })
               }

                let url = await urlModel.findOne({
                    longUrl
                })
                if (url) {
                    await SET_ASYNC(`${longUrl}`, JSON.stringify(url))
                    res.status(200).send({ status: true, msg: "provided url already exist in record",'record': url })
                    return
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

    const isValid = function (value) {
        if (typeof value === 'undefined' || value === null) return false
        if (typeof value === 'string' && value.trim().length === 0) return false
        return true
      }

    let getUrl = async (req, res) => {
        try {
            let Code = req.params.code
            if (!isValid(Code)) {
            res.status(400).send({ 'status': 'failed', 'message': 'please enter valid code' })
                        }
            let cachedUrlData = await GET_ASYNC(`${Code}`)
           
            if (cachedUrlData) 
            {
             urlRecord = JSON.parse(cachedUrlData)
            let long_Url = urlRecord.longUrl
            return res.redirect(302, long_Url)
            }
                
            const url = await urlModel.findOne({
                urlCode: req.params.code
                })
            if (!url) 
             {
                return res.status(404).send({ status: false, msg: 'Url not found' })
             }
             await SET_ASYNC(`${Code}`, JSON.stringify(record))
             let path = record.longUrl
             return res.redirect(301, path)
        }
        catch (error) {

            res.status(500).send({ status: false, msg: error.message })
        }
    }
    module.exports.createShortUrl = createShortUrl
    module.exports.getUrl = getUrl