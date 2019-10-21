import React from "react";
// import cloudy from "../../assets/images/SVG/cloudy.svg";
// import rainy from "../../assets/images/SVG/rainy.svg";
// import sunny from "../../assets/images/SVG/sunny.svg";
// import partCloud from "../../assets/images/SVG/partly cloudy.svg";
// import SearchAndSave from "../../components/SearchAndSave";
// import Current from "../../components/Current";
// import Forecast from "../../components/Forecast";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            userEnteredZip: 20001,
            current: {
                location: "",
                temp: 0,
                condition: "",
                cloud: 0,
                icon: "",
                sunrise: 0,
                sunset: 0,
            },
            apiForecast: {},
            forecastItems: [
                // {date: "",
                // month: "01",
                // day: "01",
                // year: "2000",
                // time: "",
                // formattedDate: "01-01-2000",
                // temp: 0,
                // condition: "",
                // icon: "",},
            ],
        };
    }

    componentDidMount() {
        this.getWeather();
        this.getForecast();
        this.getMap();
    }

    handleUserEnteredZip = (e) => {
        let userInput = e.target.value;
        this.setState({
            userEnteredZip: userInput,
        })
    }

    submit = () => {
        this.getWeather();
        this.getForecast();
        this.getMap();
    }

    getWeather() {
        const apikey = process.env.REACT_APP_API_WEATHER_KEY;
        let zipCode = this.state.userEnteredZip;
        const apiUrl = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + ",us&APPID=" + apikey;
        fetch( apiUrl )
        .then(response => response.json())
        .then(responseData => {
            console.log('My Weather Data', responseData);
            // let sunrise = new Date(responseData.sys.sunrise).toLocaleString();
            // let sunriseArray = sunrise.split(" ");
            // let sunriseFormatted = sunriseArray[1];

            // let sunset = new Date(responseData.sys.sunset).toUTCString();
            // let sunsetArray = sunset.split(" ");
            // let sunsetFormatted = sunsetArray[4];

            this.setState({
                current: {
                    location: responseData.name,
                    temp: this.convertToFarenheit(responseData.main.temp),
                    condition: responseData.weather[0].description,
                    cloud: responseData.clouds.all,
                    icon: responseData.weather[0].icon,
                }
            })


            // if (responseData.clouds.all >= 95) {
            //     this.setState({
            //         current: {
            //             location: responseData.name,
            //             temp: this.convertToFarenheit(responseData.main.temp),
            //             condition: responseData.weather[0].description,
            //             cloud: responseData.clouds.all,
            //             icon: "rainy"
            //         }
            //     });
            // } else if (responseData.clouds.all >=50 && responseData.clouds.all < 95) {
            //     this.setState({
            //         current: {
            //             location: responseData.name,
            //             temp: this.convertToFarenheit(responseData.main.temp),
            //             condition: responseData.weather[0].description,
            //             cloud: responseData.clouds.all,
            //             icon: "cloudy"
            //         }
            //     });
            // } else if (responseData.clouds.all >= 10 && responseData.clouds.all <50) {
            //     this.setState({
            //         current: {
            //             location: responseData.name,
            //             temp: this.convertToFarenheit(responseData.main.temp),
            //             condition: responseData.weather[0].description,
            //             cloud: responseData.clouds.all,
            //             icon: "partCloud"
            //         }
            //     });
            // } else if (responseData.clouds.all <10 && responseData.clouds.all >= 0) {
            //     this.setState({
            //         current: {
            //             location: responseData.name,
            //             temp: this.convertToFarenheit(responseData.main.temp),
            //             condition: responseData.weather[0].description,
            //             cloud: responseData.clouds.all,
            //             icon: "../../assets/images/SVG/sunny.svg"
            //         }
            //     });
            // }
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

    getForecast() {
        const apikey = process.env.REACT_APP_API_WEATHER_KEY;
        let zipCode = this.state.userEnteredZip;
        const apiUrl = "http://api.openweathermap.org/data/2.5/forecast?zip=" + zipCode + ",us&APPID=" + apikey;
        fetch( apiUrl )
        .then(response => response.json())
        .then(responseData => {
            this.setState({
                apiForecast: responseData.list,
            })
        for (let i=0; i<responseData.list.length; i++) {
            let date = responseData.list[i].dt_txt;
            let splitDate = date.split("-");
            let splitOffTime = splitDate[2].split(" ");
            let month = splitDate[1];
            let time = splitOffTime[1];
            let day = splitOffTime[0];
            let year = splitDate[0];
            let newFormat = month + "-" + day + "-" + year;
            let temp = responseData.list[i].main.temp;
            let condition = responseData.list[i].weather[0].description;
            let icon = responseData.list[i].weather[0].icon;
            let forecastData = {
                date: date,
                month: month,
                day: day,
                year: year,
                time: time,
                formattedDate: newFormat,
                temp: this.convertToFarenheit(temp),
                condition: condition,
                icon: icon,
            }
            this.state.forecastItems.push(forecastData);             
        }
        console.log('My Forecast Data', this.state.forecastItems);   
    })
    }

    convertToFarenheit = (x) => {
        let kelvin = x - 273.15;
        let farenheit = kelvin * 9/5 + 32;
        let rounded = Math.round( farenheit * 10 ) / 10
        return rounded;
    }

    render() {
        console.log("current weather data: ", this.state.current);
        let icon = this.state.current.icon;
        let image = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        // let foreIcon1 = this.state.forecastItems[0].icon;
        // let foreImg1 = "http://openweathermap.org/img/wn/" + foreIcon1 + "@2x.png";
        // let foreIcon2 = this.state.forecastItems[].icon;
        // let foreImg2 = "http://openweathermap.org/img/wn/" + foreIcon2 + "@2x.png";
        // let foreIcon3 = this.state.forecastItems[].icon;
        // let foreImg3 = "http://openweathermap.org/img/wn/" + foreIcon3 + "@2x.png";
        // let foreIcon4 = this.state.forecastItems[].icon;
        // let foreImg4 = "http://openweathermap.org/img/wn/" + foreIcon4 + "@2x.png";
        // let foreIcon5 = this.state.forecastItems[].icon;
        // let foreImg5 = "http://openweathermap.org/img/wn/" + foreIcon5 + "@2x.png";
        console.log("data pulled from api: ", this.state.apiForecast);
        let forecastArray = this.state.forecastItems;
        console.log("forecast array is: ", forecastArray);
        // let forecastArrayItem = forecastArray[1];
        console.log("forecast array item is: ", forecastArray[4]);
        console.log("forecast array item value is: ", forecastArray[1]);
        // let sample = forecastArray[0].formattedDate;
        // console.log("testing breakdown of forecastArray: ", sample);

        return (
            <div className="homepage">
                <h1>Weather App</h1>
                {/* <SearchAndSave /> */}
                {/* <Current /> */}
                {/* <Forecast /> */}

                <div className="searchAndSaved">
                    <div className="search">
                        <input 
                            onChange={this.handleUserEnteredZip} 
                            // value={enteredZipCode} 
                            placeholder="Enter a zip code">
                        </input> 
                        <button 
                            type="submit" 
                            onClick={() => this.submit()}>
                                Submit
                        </button>
                    </div>
                    <div className="saved">
                        <p>Local Saved List will go here</p>
                    </div>
                </div>

                <div className="current">
                    <div className="map">
                        <img src={this.state.map} alt="map of weather area"></img>
                    </div>
                    
                    <div className="currentInfo">
                        <div>Today's weather for {this.state.current.location}: </div>
                        <div> It is currently {this.state.current.temp} {'\u00b0'}F</div>
                        <div> The conditions are:<br/>
                            <img 
                                className="weatherIcon"
                                src={image}
                                alt="weather icon">
                            </img><br/>
                            {/* {this.pickAPic(this.state.current.condition)} */}
                            {this.state.current.condition}
                        </div>
                        <div> Sunrise is at {this.state.current.sunrise}</div>
                        <div> Sunset is at {this.state.current.sunset}</div>
                    </div>
                </div>

                <div className="forecast">
                    <h2 className="foreHeader">The 5-day forecast is: </h2>
                    <div className="foreDay1">For {}: <br/> 
                        High: {} {'\u00b0'}F<br/>
                        Low: {} {'\u00b0'}F<br/>
                        Conditions: <br/>
                            <img className="weatherIcon" src={""
                                // foreImg1
                                } alt="weather icon"></img><br/>
                            {}</div>
                    <div className="foreDay2">For {}: <br/> 
                        High: {} {'\u00b0'}F<br/>
                        Low: {} {'\u00b0'}F<br/>
                        Conditions: <br/>
                            <img className="weatherIcon" src={""
                                // foreImg2
                                } alt="weather icon"></img><br/>
                            {}</div>
                    <div className="foreDay3">For {}: <br/> 
                        High: {} {'\u00b0'}F<br/>
                        Low: {} {'\u00b0'}F<br/>
                        Conditions: <br/>
                            <img className="weatherIcon" src={""
                                // foreImg3
                                } alt="weather icon"></img><br/>
                            {}</div>
                    <div className="foreDay4">For {}: <br/> 
                        High: {} {'\u00b0'}F<br/>
                        Low: {} {'\u00b0'}F<br/>
                        Conditions: <br/>
                            <img className="weatherIcon" src={""
                                // foreImg4
                                } alt="weather icon"></img><br/>
                            {}</div>
                    <div className="foreDay5">For {}: <br/> 
                        High: {} {'\u00b0'}F<br/>
                        Low: {} {'\u00b0'}F<br/>
                        Conditions: <br/>
                            <img className="weatherIcon" src={""
                                // foreImg5
                            } alt="weather icon"></img><br/>
                            {}</div>
                </div>

            </div>
        )
    }
}

export default Home