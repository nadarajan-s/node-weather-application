console.log('Client side javascript file is loaded!')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    console.log('user defined location',search.value)
    messageOne.textContent = 'Fetching weather information. please hold on !! '
     fetch('http://localhost:3000/weather?address='+search.value).then((response)=>{
         response.json().then(data => {
            if (data.error){
                messageOne.textContent = 'Error fetching the data.'
            }else{
                messageOne.textContent = 'Weather today is '+data.forecast.description
                messageTwo.textContent = 'Temperature is '+data.forecast.temperature+' degree celcius'
            }
             console.log(data)
         })
     })
   

})