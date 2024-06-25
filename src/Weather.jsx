import React , {useState} from 'react';


function Weather(){

    const card = document.getElementById("card");
    const info = document.getElementById("info");
    const error = document.getElementById("error");
    
    const apiKey = "65dc12881738377503f2d9619ae55934";

    const [City , setCity] = useState("");

    const [DisplayError , setDisplayError] = useState();

    const [display , setDisplay] = useState({
                                                DisplayCity : "" ,
                                                DisplayTemp : "" ,
                                                DisplayHumidity : "",
                                                DisplayDescription : "",
                                                DisplayId : "",
                                            })

    async function handleSubmit(event){

        event.preventDefault();

        const city = City;

        if(city){
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        else{
            handleError("Please enter a valid city")
            card.style.display = "flex";
            error.style.display = "flex";
            info.style.display = "none";
        }

    }

    function handleInputChange(event){
        setCity(event.target.value);
    }

    async function getWeatherData(city){
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        const response = await fetch(apiUrl);

        if(!response.ok){
            handleError("Could not fetch weather data")
        }
        else{
            const data = await response.json();
            return data;
        }
    }

    function displayWeatherInfo(data){
        const { name : city,
                main: {temp , humidity},
                weather:[{description , id}] } = data;
 
        card.style.display = "flex";
        info.style.display = "flex";
        error.style.display = "none";

        setDisplay(prevDisplay => {
            return {
                ...prevDisplay ,
                DisplayCity : city , 
                DisplayTemp : temp , 
                DisplayHumidity : humidity ,
                DisplayDescription : description , 
                DisplayId : getWeatherEmoji(id)
            }
        })
    }

    function getWeatherEmoji(weatherId){

        switch(true){
            case(weatherId >= 200 && weatherId < 300):
                return "⛈"
            case(weatherId >= 300 && weatherId < 400):
                return "🌧"
            case(weatherId >= 400 && weatherId < 500):
                return "🌧"
            case(weatherId >= 500 && weatherId < 600):
                return "🌧"
            case(weatherId >= 600 && weatherId < 700):
                return "❄"
            case(weatherId >= 700 && weatherId < 800):
                return "🌫"
            case(weatherId === 800):
                return "☀"
            case(weatherId >= 801 && weatherId < 810):
                return "☁"
            default:
                return "❓"
        }
    
    }

    function handleError(message){
        setDisplayError(message)
    }


    return(
        <div className='container'>
            <form className='weather-form' id='weatherForm' onSubmit={handleSubmit}>
                <input type="text" className='city-input' onChange={handleInputChange} placeholder='Enter City'/>
                <button type="submit" className='submit-btn'>Get Weather</button>
            </form>

            <div className='card' id='card' style={{display : "none"}}>
                <div className='info' id='info' style={{display : "none"}}>
                    <h1 className='cityDisplay'> {display.DisplayCity} </h1>
                    <p className='tempDisplay'> {(display.DisplayTemp - 273.15).toFixed(1)}°C </p>
                    <p className='humidityDisplay'> Humidity: {display.DisplayHumidity}% </p>
                    <p className='descDisplay'> {display.DisplayDescription} </p>
                    <p className='weatherEmoji'> {display.DisplayId} </p>
                </div>

                <div className='error' id='error' style={{display : "none"}}>
                    <p className='errorDisplay'>{DisplayError}</p>
                </div>
            </div>
        </div>
    )

}

export default Weather