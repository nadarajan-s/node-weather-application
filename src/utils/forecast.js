const request = require('postman-request')

const forecastApiCall = (latitude,longitude,callback)=>{
    const weatherApiurl = 'http://api.weatherstack.com/current?access_key=b66eede7a300fbb1e1e2506822ef29d0&query='+latitude+','+longitude
    console.log(weatherApiurl)
    request({url:weatherApiurl,json:true},(error, {body})=>{
        if (error){
            callback('Unable to connect to the weather api',undefined);
        }else if (body.error){
            callback('Weather api failure ',undefined)
        }else{
            const currentWeatherData = body.current
            callback(undefined,{
               description: currentWeatherData.weather_descriptions[0],
               temperature: currentWeatherData.temperature,
               feelslike : currentWeatherData.feelslike
            })
        }
    })
}

module.exports = {
    forecastApiCall : forecastApiCall
}