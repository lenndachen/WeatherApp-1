import React from "react";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            location: "",
            temp: 0,
            condition: "",
            // map: "",
            userEnteredZip: "",
            date1: "",
            lowTemp1: 0,
            highTemp1: 0,
            condition1: "",
            date2: "",
            lowTemp2: 0,
            highTemp2: 0,
            condition2: "",
            date3: "",
            lowTemp3: 0,
            highTemp3: 0,
            condition3: "",
            date4: "",
            lowTemp4: 0,
            highTemp4: 0,
            condition4: "",
            date5: "",
            lowTemp5: 0,
            highTemp5: 0,
            condition5: "",
        };
    }

    componentDidMount() {
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

    convertToFarenheit() {
       let kelvin = this.state.temp - 273.15;
       let farenheit = kelvin * 9/5 + 32;
       let rounded = Math.round( farenheit * 10 ) / 10
       return rounded;
    }

    handleUserEnteredZip = (e) => {
        let userInput = e.target.value;
        console.log("in state: ", this.state.userEnteredZip);
        this.setState({
            userEnteredZip: userInput,
        })
    }

    submit = () => {
        this.getWeather();
        this.getForecast();
        this.getMap();
    }

    getForecast() {
        const apikey = process.env.REACT_APP_API_WEATHER_KEY;
        let zipCode = this.state.userEnteredZip;
        const apiUrl = "http://api.openweathermap.org/data/2.5/forecast?zip=" + zipCode + ",us&APPID=" + apikey;
        // const apiUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?zip=" + zipCode + ",us&APPID=" + apikey;
        fetch( apiUrl )
        .then(response => response.json())
        .then(responseData => {
            console.log('My Forecast Data', responseData);
            this.setState({ 
                 date1: responseData.list[0].dt_txt,
                 lowTemp1: responseData.list[0].main.temp_min,
                 highTemp1: responseData.list[0].main.temp_max,
                 condition1: responseData.list[0].weather[0].description,
                 date2: responseData.list[8].dt_txt,
                 lowTemp2: responseData.list[8].main.temp_min,
                 highTemp2: responseData.list[8].main.temp_max,
                 condition2: responseData.list[8].weather[0].description,
                 date3: responseData.list[16].dt_txt,
                 lowTemp3: responseData.list[16].main.temp_min,
                 highTemp3: responseData.list[16].main.temp_max,
                 condition3: responseData.list[16].weather[0].description,
                 date4: responseData.list[24].dt_txt,
                 lowTemp4: responseData.list[24].main.temp_min,
                 highTemp4: responseData.list[24].main.temp_max,
                 condition4: responseData.list[24].weather[0].description,
                 date5: responseData.list[32].dt_txt,
                 lowTemp5: responseData.list[32].main.temp_min,
                 highTemp5: responseData.list[32].main.temp_max,
                 condition5: responseData.list[32].weather[0].description,
            });
        });
    }

    getMap() {
        const googleMapKey = process.env.REACT_APP_API_GOOGLE_MAP_KEY
        let zipCode = this.state.userEnteredZip
        let apiUrl = "https://maps.googleapis.com/maps/api/staticmap?center=" + zipCode + "&zoom=14&size=400x400&key=" + googleMapKey
        // fetch(apiUrl)
        // .then(response => {
            
        //     response.JSON.parse();
        //     console.log("My map: ", response);
        // });
        // .then(responseData => responseData.text())
        // .then(text => {
        //     console.log('My Map Data', text);
        //     this.setState({
        //         map: responseData,
        //     });
        // });
        this.setState({
            map: apiUrl,
        })
        
    }

    render() {
        return (
            <div className="homepage">
                <h1>Weather App</h1>
                <div className="search">
                    <input onChange={this.handleUserEnteredZip} value={this.state.userEnteredZip} placeholder="Enter a zip code"></input> 
                    <button type="submit" onClick={() => this.submit()}>Submit</button>
                </div>
                
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
                
                <div className="forecast">
                    <h2 className="foreHeader">The 5-day forecast is: </h2>
                    <div className="foreDay1">For {this.state.date1}: a low temperature of {this.convertToFarenheit(this.state.lowTemp1)} degrees Farenheit and a high temperature of {this.convertToFarenheit(this.state.highTemp1)} with conditions of: {this.state.condition1}</div>
                    <div className="foreDay2">For {this.state.date2}: a low temperature of {this.convertToFarenheit(this.state.lowTemp2)} degrees Farenheit and a high temperature of {this.convertToFarenheit(this.state.highTemp2)} with conditions of: {this.state.condition2}</div>
                    <div className="foreDay3">For {this.state.date3}: a low temperature of {this.convertToFarenheit(this.state.lowTemp3)} degrees Farenheit and a high temperature of {this.convertToFarenheit(this.state.highTemp3)} with conditions of: {this.state.condition3}</div>
                    <div className="foreDay4">For {this.state.date4}: a low temperature of {this.convertToFarenheit(this.state.lowTemp4)} degrees Farenheit and a high temperature of {this.convertToFarenheit(this.state.highTemp4)} with conditions of: {this.state.condition4}</div>
                    <div className="foreDay5">For {this.state.date5}: a low temperature of {this.convertToFarenheit(this.state.lowTemp5)} degrees Farenheit and a high temperature of {this.convertToFarenheit(this.state.highTemp5)} with conditions of: {this.state.condition5}</div>
                </div>
            </div>
        )
    }
}

export default Home