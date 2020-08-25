const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocodeApiUtil = require('./utils/geocode.js')
const weatherApiUtil = require('./utils/forecast.js')
const app = express()
const port =  process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nadarajan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nadarjan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Nadarajan'
    })
})

app.get('/weather', (req, res) => {
    console.log(req.query)
    const address = req.query.address;
    if(!address){
        return res.send({
            error: 'No address provided! '
        })
    }

    geocodeApiUtil.geoCodeApiCall(address,(error,{latitude,longitude,location}={})=>{
        if (!error){
           // console.log('Data ',data)
            weatherApiUtil.forecastApiCall(latitude,longitude,(error,weatherData)=>{
                if(error){
                    return console.log(error)
                }
                console.log('Weather details for',location)
                console.log(weatherData)
                res.send({
                     forecast: weatherData,
                    // temperature: weatherData.temperature,
                    // location: location,
                     address
                })
                
            })
        }
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nadarajan',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nadarajan',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})