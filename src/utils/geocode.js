const request = require('postman-request')

const geoCodeApiCall = (address,callback) =>{
    const geocodingApiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoibmFkYXJhamFuc3JuIiwiYSI6ImNrZTAzaGV3eDAxY3oydG1uZmIxZDN0b3cifQ.XZSiyVQuk1b_ZOVigTFPMw&limit=1';    
    console.log('geocodingApiUrl is'+ geocodingApiUrl)
    request({url:geocodingApiUrl,json:true},(error, {body})=>{
        if (error){
            callback('Unable to connect to the geocoding api',undefined)
        }else if (body.features.length === 0){
            callback('geocoding api failure ',undefined)
        }else{
            const geoCodingData = body.features[0]
            console.log("output from forcast api",geoCodingData)
            callback(undefined,{
                longitude: geoCodingData.center[0],
                latitude: geoCodingData.center[1],
                location: geoCodingData.place_name
            })
        }
    })  
}

module.exports = {
    geoCodeApiCall: geoCodeApiCall
}