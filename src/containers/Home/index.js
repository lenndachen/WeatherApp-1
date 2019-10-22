import React from "react";
// import SearchAndSave from "../../components/SearchAndSave";
import Current from "../../components/Current";
import Forecast from "../../components/Forecast";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userEnteredZip: "",
            current: {
                location: "",
                temp: 0,
                condition: "",
                cloud: 0,
                icon: "",
                sunrise: 0,
                sunset: 0,
            },
            apiForecast: [],
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
            
            for (let i=0; i<responseData.list.length; i++) {
                let date = responseData.list[i].dt_txt;
                let splitDate = date.split("-");
                let splitOffTime = splitDate[2].split(" ");
                let month = splitDate[1];
                let time = splitOffTime[1];
                let day = splitOffTime[0];
                let year = splitDate[0];
                let newFormat = month + "-" + day + "-" + year;
                let temp = this.convertToFarenheit(responseData.list[i].main.temp);
                let condition = responseData.list[i].weather[0].description;
                let icon = responseData.list[i].weather[0].icon;
               
                this.state.forecastItems.push(newFormat);    
                this.state.forecastItems.push(temp);    
                this.state.forecastItems.push(condition);    
                this.state.forecastItems.push(icon);  
                this.state.forecastItems.push(time);  
            }
            
            let response = [];
            response.push(responseData.list);
            this.setState({
                apiForecast: response,
            })         
        
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
        console.log("data pulled from api: ", this.state.apiForecast);
        let forecastArray = this.state.forecastItems;
        console.log("forecast array is: ", forecastArray);

        return (
            <div className="homepage">
                <h1>Weather App</h1>
                {/* <SearchAndSave /> */}
    
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

                <Current current={this.state.current} map={this.state.map} image={"http://openweathermap.org/img/wn/" + this.state.current.icon + "@2x.png"} />
                <Forecast forecast={this.state.forecastItems} apiData={this.state.apiForecast} />

            </div>
        )
    }
}

export default Home