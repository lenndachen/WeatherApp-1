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

const Current = ({ current, map, condition }) => {
    console.log("condition:", condition);
    
    let icon;
    console.log("current icon at start: ", icon);
    if (condition === "sunny") {
        icon = sunny
    }     
    if (condition === "rainy") {
        icon = rainy
    }
    if (condition === "partCloud") {
        icon = partCloud
    }
    if (condition === "cloudy") {
        icon = cloudy
    }
    if (condition === "ltRain") {
        icon = ltRain
    }
    if (condition === "ltSnow") {
        icon = ltSnow
    }
    if (condition === "snow") {
        icon = snow
    }
    if (condition === "thunderstorm") {
        icon = thunderstorm
    }
    if (condition === "windy") {
        icon = windy
    }
    if (condition === "wintryMix") {
        icon = wintryMix
    }
    console.log("current icon at end: ", icon)

    return(
    <div className="current">
        <div className="map">
                <img src={map} alt="map of weather area"></img>
            </div>
            
            <div className="currentInfo">
                <div>Today's weather for {current.location}: </div>
                <div> It is currently {current.temp} {'\u00b0'}F</div>
                <div> The conditions are:<br/>
                    <img 
                        className="weatherIcon"
                        src={icon}
                        alt="weather icon">
                    </img><br/>
                    {current.condition}
                </div>
                <div> Sunrise is at {current.sunrise}</div>
                <div> Sunset is at {current.sunset}</div>
            </div>
    </div>
)}

export default Current;