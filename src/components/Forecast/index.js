import React from "react";
import sunny from "../../assets/images/SVG/sunny.svg"
import rainy from "../../assets/images/SVG/rainy.svg"
import partCloud from "../../assets/images/SVG/partly cloudy.svg"
import cloudy from "../../assets/images/SVG/cloudy.svg"
import ltRain from "../../assets/images/SVG/light rain.svg"
import ltSnow from "../../assets/images/SVG/light snow.svg"
import snow from "../../assets/images/SVG/snow.svg"
import thunderstorm from "../../assets/images/SVG/thunderstorms.svg"
import windy from "../../assets/images/SVG/windy.svg"
import wintryMix from "../../assets/images/SVG/wintry mix.svg"

const Forecast = ({ forecast, tomorrow, next1, next2, next3, next4, tomorrowIcon, next1Icon, next2Icon, next3Icon, next4Icon, apiData }) => {
    let tomorrowImg;
    let nextDay1Img;
    let nextDay2Img;
    let nextDay3Img;
    let nextDay4Img;
    console.log("array data in forecast comp: ", forecast);
    console.log("condition for tomorrow in forecast comp: ", forecast[3]);
    console.log("condition for tomorrow in forecast comp: ", forecast[9]);
    console.log("condition for tomorrow in forecast comp: ", forecast[15]);
    console.log("condition for tomorrow in forecast comp: ", forecast[21]);
    console.log("condition for tomorrow in forecast comp: ", forecast[27]);
    if (tomorrowIcon === "sunny") {
        tomorrowImg = sunny
    }     
    if (tomorrowIcon === "rainy") {
        tomorrowImg = rainy
    }
    if (tomorrowIcon === "partCloud") {
        tomorrowImg = partCloud
    }
    if (tomorrowIcon === "cloudy") {
        tomorrowImg = cloudy
    }
    if (tomorrowIcon === "ltRain") {
        tomorrowImg = ltRain
    }
    if (tomorrowIcon === "ltSnow") {
        tomorrowImg = ltSnow
    }
    if (tomorrowIcon === "snow") {
        tomorrowImg = snow
    }
    if (tomorrowIcon === "thunderstorm") {
        tomorrowImg = thunderstorm
    }
    if (tomorrowIcon === "windy") {
        tomorrowImg = windy
    }
    if (tomorrowIcon === "wintryMix") {
        tomorrowImg = wintryMix
    }
    console.log("tomorrow icon at end: ", tomorrowImg)
    if (next1Icon === "sunny") {
        nextDay1Img = sunny
    }     
    if (next1Icon === "rainy") {
        nextDay1Img = rainy
    }
    if (next1Icon === "partCloud") {
        nextDay1Img = partCloud
    }
    if (next1Icon === "cloudy") {
        nextDay1Img = cloudy
    }
    if (next1Icon === "ltRain") {
        nextDay1Img = ltRain
    }
    if (next1Icon === "ltSnow") {
        nextDay1Img = ltSnow
    }
    if (next1Icon === "snow") {
        nextDay1Img = snow
    }
    if (next1Icon === "thunderstorm") {
        nextDay1Img = thunderstorm
    }
    if (next1Icon === "windy") {
        nextDay1Img = windy
    }
    if (next1Icon === "wintryMix") {
        nextDay1Img = wintryMix
    }

    if (next2Icon === "sunny") {
        nextDay2Img = sunny
    }     
    if (next2Icon === "rainy") {
        nextDay2Img = rainy
    }
    if (next2Icon === "partCloud") {
        nextDay2Img = partCloud
    }
    if (next2Icon === "cloudy") {
        nextDay2Img = cloudy
    }
    if (next2Icon === "ltRain") {
        nextDay2Img = ltRain
    }
    if (next2Icon === "ltSnow") {
        nextDay2Img = ltSnow
    }
    if (next2Icon === "snow") {
        nextDay2Img = snow
    }
    if (next2Icon === "thunderstorm") {
        nextDay2Img = thunderstorm
    }
    if (next2Icon === "windy") {
        nextDay2Img = windy
    }
    if (next2Icon === "wintryMix") {
        nextDay2Img = wintryMix
    }

    if (next3Icon === "sunny") {
        nextDay3Img = sunny
    }     
    if (next3Icon === "rainy") {
        nextDay3Img = rainy
    }
    if (next3Icon === "partCloud") {
        nextDay3Img = partCloud
    }
    if (next3Icon === "cloudy") {
        nextDay3Img = cloudy
    }
    if (next3Icon === "ltRain") {
        nextDay3Img = ltRain
    }
    if (next3Icon === "ltSnow") {
        nextDay3Img = ltSnow
    }
    if (next3Icon === "snow") {
        nextDay3Img = snow
    }
    if (next3Icon === "thunderstorm") {
        nextDay3Img = thunderstorm
    }
    if (next3Icon === "windy") {
        nextDay3Img = windy
    }
    if (next3Icon === "wintryMix") {
        nextDay3Img = wintryMix
    }

    if (next4Icon === "sunny") {
        nextDay4Img = sunny
    }     
    if (next4Icon === "rainy") {
        nextDay4Img = rainy
    }
    if (next4Icon === "partCloud") {
        nextDay4Img = partCloud
    }
    if (next4Icon === "cloudy") {
        nextDay4Img = cloudy
    }
    if (next4Icon === "ltRain") {
        nextDay4Img = ltRain
    }
    if (next4Icon === "ltSnow") {
        nextDay4Img = ltSnow
    }
    if (next4Icon === "snow") {
        nextDay4Img = snow
    }
    if (next4Icon === "thunderstorm") {
        nextDay4Img = thunderstorm
    }
    if (next4Icon === "windy") {
        nextDay4Img = windy
    }
    if (next4Icon === "wintryMix") {
        nextDay4Img = wintryMix
    }
    
    return(
    <div className="forecast">
    <h2 className="foreHeader">The 5-day forecast is: </h2>
        
        <div className="foreDay1">For {tomorrow.date}: <br/> 
            High: {tomorrow.high} {'\u00b0'}F<br/>
            Low: {tomorrow.low} {'\u00b0'}F<br/>
            Conditions: <br/>
                <img className="weatherIcon" src={tomorrowImg} alt="weather icon"></img><br/>
                {forecast[3]}</div>
        <div className="foreDay2">For {next1.date}: <br/> 
            High: {next1.high} {'\u00b0'}F<br/>
            Low: {next1.low} {'\u00b0'}F<br/>
            Conditions: <br/>
                <img className="weatherIcon" src={nextDay1Img} alt="weather icon"></img><br/>
                {forecast[9]}</div>
        <div className="foreDay3">For {next2.date}: <br/> 
            High: {next2.high} {'\u00b0'}F<br/>
            Low: {next2.low} {'\u00b0'}F<br/>
            Conditions: <br/>
                <img className="weatherIcon" src={nextDay2Img} alt="weather icon"></img><br/>
                {forecast[15]}</div>
        <div className="foreDay4">For {next3.date}: <br/> 
            High: {next3.high} {'\u00b0'}F<br/>
            Low: {next3.low} {'\u00b0'}F<br/>
            Conditions: <br/>
                <img className="weatherIcon" src={nextDay3Img} alt="weather icon"></img><br/>
                {forecast[21]}</div>
        <div className="foreDay5">For {next4.date}: <br/> 
            High: {next4.high} {'\u00b0'}F<br/>
            Low: {next4.low} {'\u00b0'}F<br/>
            Conditions: <br/>
                <img className="weatherIcon" src={nextDay4Img} alt="weather icon"></img><br/>
                {forecast[27]}</div>
    </div>
)}

export default Forecast;


{/* <h2 className="foreHeader">The 5-day forecast is: </h2>
<div className="foreDay1">For {this.state.date1}: a low temperature of {this.convertToFarenheit(this.state.lowTemp1)} degrees Farenheit and a high temperature of {this.convertToFarenheit(this.state.highTemp1)} with conditions of: {this.state.condition1}</div>
<div className="foreDay2">For {this.state.date2}: a low temperature of {this.convertToFarenheit(this.state.lowTemp2)} degrees Farenheit and a high temperature of {this.convertToFarenheit(this.state.highTemp2)} with conditions of: {this.state.condition2}</div>
<div className="foreDay3">For {this.state.date3}: a low temperature of {this.convertToFarenheit(this.state.lowTemp3)} degrees Farenheit and a high temperature of {this.convertToFarenheit(this.state.highTemp3)} with conditions of: {this.state.condition3}</div>
<div className="foreDay4">For {this.state.date4}: a low temperature of {this.convertToFarenheit(this.state.lowTemp4)} degrees Farenheit and a high temperature of {this.convertToFarenheit(this.state.highTemp4)} with conditions of: {this.state.condition4}</div>
<div className="foreDay5">For {this.state.date5}: a low temperature of {this.convertToFarenheit(this.state.lowTemp5)} degrees Farenheit and a high temperature of {this.convertToFarenheit(this.state.highTemp5)} with conditions of: {this.state.condition5}</div> */}


// class Forecast extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             date1: "",
//             lowTemp1: 0,
//             highTemp1: 0,
//             condition1: "",
//             date2: "",
//             lowTemp2: 0,
//             highTemp2: 0,
//             condition2: "",
//             date3: "",
//             lowTemp3: 0,
//             highTemp3: 0,
//             condition3: "",
//             date4: "",
//             lowTemp4: 0,
//             highTemp4: 0,
//             condition4: "",
//             date5: "",
//             lowTemp5: 0,
//             highTemp5: 0,
//             condition5: "",
//         }
//     }

//     getForecast() {
//         const apikey = process.env.REACT_APP_API_WEATHER_KEY;
//         let zipCode = this.state.userEnteredZip;
//         const apiUrl = "http://api.openweathermap.org/data/2.5/forecast?zip=" + zipCode + ",us&APPID=" + apikey;
//         fetch( apiUrl )
//         .then(response => response.json())
//         .then(responseData => {
//             console.log('My Forecast Data', responseData);
//             this.setState({ 
//                  date1: responseData.list[0].dt_txt,
//                  lowTemp1: responseData.list[0].main.temp_min,
//                  highTemp1: responseData.list[0].main.temp_max,
//                  condition1: responseData.list[0].weather[0].description,
//                  date2: responseData.list[8].dt_txt,
//                  lowTemp2: responseData.list[8].main.temp_min,
//                  highTemp2: responseData.list[8].main.temp_max,
//                  condition2: responseData.list[8].weather[0].description,
//                  date3: responseData.list[16].dt_txt,
//                  lowTemp3: responseData.list[16].main.temp_min,
//                  highTemp3: responseData.list[16].main.temp_max,
//                  condition3: responseData.list[16].weather[0].description,
//                  date4: responseData.list[24].dt_txt,
//                  lowTemp4: responseData.list[24].main.temp_min,
//                  highTemp4: responseData.list[24].main.temp_max,
//                  condition4: responseData.list[24].weather[0].description,
//                  date5: responseData.list[32].dt_txt,
//                  lowTemp5: responseData.list[32].main.temp_min,
//                  highTemp5: responseData.list[32].main.temp_max,
//                  condition5: responseData.list[32].weather[0].description,
//             });
//         });
//     }

//     convertToFarenheit() {
//         let kelvin = this.state.temp - 273.15;
//         let farenheit = kelvin * 9/5 + 32;
//         let rounded = Math.round( farenheit * 10 ) / 10
//         return rounded;
//      }

//     render() {