import React from "react";

class Current extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            temp: 0,
            condition: "",
        }
    }

    getWeather() {
        const apikey = process.env.REACT_APP_API_WEATHER_KEY;
        let zipCode = this.state.userEnteredZip;
        const apiUrl = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + ",us&APPID=" + apikey;
        fetch( apiUrl )
        .then(response => response.json())
        .then(responseData => {
            console.log('My Weather Data', responseData);
            this.setState({ 
                location: responseData.name,
                temp: responseData.main.temp,
                condition: responseData.weather[0].description,
            });
        });
    }

    getMap() {
        const googleMapKey = process.env.REACT_APP_API_GOOGLE_MAP_KEY
        let zipCode = this.state.userEnteredZip
        let apiUrl = "https://maps.googleapis.com/maps/api/staticmap?center=" + zipCode + "&zoom=11&size=350x350&key=" + googleMapKey
        this.setState({
            map: apiUrl,
        })
        
    }

    convertToFarenheit() {
        let kelvin = this.state.temp - 273.15;
        let farenheit = kelvin * 9/5 + 32;
        let rounded = Math.round( farenheit * 10 ) / 10
        return rounded;
     }

    render() {
        return(
            <div className="current">
                <div className="map">
                    <img src={this.state.map} alt="map of weather area"></img>
                </div>
                
                <div className="currentInfo">
                <div>Today's weather for {this.state.location}: </div>
                <div> It is currently {this.convertToFarenheit(this.state.temp)} degrees Farenheit.</div>
                <div> The conditions are: {this.state.condition}.</div>
                </div>
            </div>
        )
    }
}

export default Current;