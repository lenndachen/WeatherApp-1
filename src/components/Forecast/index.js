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
    
    // console.log("in forecast, tomorrow is: ", tomorrow);
    // console.log("can i reference something specific? ", tomorrow[0]);

    return(
    <div className="forecast">
    <h2 className="foreHeader">The 5-day forecast is: </h2>
        
        <div className="foreDay1">For {tomorrow[0]}: <br/> 
            High: {tomorrow[1]} {'\u00b0'}F<br/>
            Low: {tomorrow[2]} {'\u00b0'}F<br/>
            Conditions: <br/>
                <img className="weatherIcon" src={tomorrowImg} alt="weather icon"></img><br/>
                {forecast[3]}
        </div>
        <div className="foreDay2">For {next1[0]}: <br/> 
            High: {next1[1]} {'\u00b0'}F<br/>
            Low: {next1[2]} {'\u00b0'}F<br/>
            Conditions: <br/>
                <img className="weatherIcon" src={nextDay1Img} alt="weather icon"></img><br/>
                {forecast[9]}</div>
        <div className="foreDay3">For {next2[0]}: <br/> 
            High: {next2[1]} {'\u00b0'}F<br/>
            Low: {next2[2]} {'\u00b0'}F<br/>
            Conditions: <br/>
                <img className="weatherIcon" src={nextDay2Img} alt="weather icon"></img><br/>
                {forecast[15]}</div>
        <div className="foreDay4">For {next3[0]}: <br/> 
            High: {next3[1]} {'\u00b0'}F<br/>
            Low: {next3[2]} {'\u00b0'}F<br/>
            Conditions: <br/>
                <img className="weatherIcon" src={nextDay3Img} alt="weather icon"></img><br/>
                {forecast[21]}</div>
        <div className="foreDay5">For {next4[0]}: <br/> 
            High: {next4[1] === isNaN && "TBD"} {'\u00b0'}F<br/>
            Low: {next4[2] === isNaN && "TBD"} {'\u00b0'}F<br/>
            Conditions: <br/>
                <img className="weatherIcon" src={nextDay4Img} alt="weather icon"></img><br/>
                {forecast[27]}</div>
    </div>
)}

export default Forecast;