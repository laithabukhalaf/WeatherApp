const express = require('express')
const router = express.Router()
const city = require('../model/city')
const moment = require('moment')
const request = require('request')


router.get('/city/:cityName', function (req, res) {
    request.get(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.cityName}&appid=901190118000464df7032eaa9bf14219`, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let data = JSON.parse(body)
            //  console.log(body)
            res.send(data)
        }
    })
})

router.get('/cities/', function (req, res) {
    city.find({}, function (err, cities) {
        res.send(cities)
    })
})

router.post('/city/', function (req, res) {
    let c1 = new city({
        name: req.body.name,
        temperature: req.body.temperature,
        condition: req.body.condition,
        conditionPic: req.body.conditionPic,
        humidity:req.body.humidity
    })
    // console.log(c1)
    c1.save()
    res.end()
})

router.delete('/city/:cityName', function (req, res) {
    city.find({ name: req.params.cityName }).deleteOne().exec()
    res.end()
})

router.put('/city/:cityName', function (req, res) {

    request.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.params.cityName}&appid=901190118000464df7032eaa9bf14219`, async function (error, response, body) {
        if ((!error && response.statusCode === 200)) {
            
            let data=JSON.parse(body)
            await city.update({ name: data.name },
                {
                    $set: {
                        temperature: data.main.temp,
                        condition: data.weather[0].description,
                        conditionPic: data.weather[0].icon
                    }
                }
            )
            res.send(data)
        }


    })
})


module.exports = router






















