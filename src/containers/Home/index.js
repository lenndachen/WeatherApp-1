import React from "react";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            location: "",
            temp: 0,
            condition: "",
            userEnteredZip: "",
        };
    }

    componentDidMount() {
        // this.getWeather();
    }

    getWeather() {
        const apikey = process.env.REACT_APP_API_WEATHER_KEY;
        let zipCode = this.state.userEnteredZip;
        const apiUrl = "http://api.openweathermap.org/data/2.5/weather?" + "zip=" + zipCode + ",us" + "&APPID=" + apikey;
        fetch( apiUrl )
        .then(response => response.json())
        .then(responseData => {
            console.log('My Weather Data', responseData);
            const location = responseData.name;
            this.setState({ 
                location: location,
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

    test = () => {
        console.log("you clicked submit");
        this.getWeather();
    }

    // getForecast() {
    //     const apikey = process.env.REACT_APP_API_WEATHER_KEY;
    //     const apiUrl = "http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=" + apikey;
    //     fetch( apiUrl )
    //     .then(response => response.json())
    //     .then(responseData => {
    //         console.log('My Forecast Data', responseData);
    //         // const forecastData = responseData.;
    //         // this.setState({ forecastData }), () => {
    //         // }
    //     });
    // }

    render() {
        return (
            <div className="homepage">
                <h1>Weather App</h1>
                <input onChange={this.handleUserEnteredZip} value={this.state.userEnteredZip} placeholder="Enter a zip code"></input> <button type="submit" onClick={() => this.test()}>Submit</button>
                <br/>
                <br/>
                <div>Today's weather for {this.state.location}: </div>
                <div> It is currently {this.convertToFarenheit(this.state.temp)} degrees Farenheit.</div>
                <div> The conditions are: {this.state.condition}.</div>
            </div>
        )
    }
}

export default Home