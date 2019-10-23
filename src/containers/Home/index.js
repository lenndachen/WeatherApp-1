import React from "react";
// import SearchAndSave from "../../components/SearchAndSave";
import Current from "../../components/Current";
import Forecast from "../../components/Forecast";
// import SavedDisplay from "../../components/SavedDisplay";

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

    componentDidMount() {
        window.localStorage.setItem('city', JSON.stringify({name: 'Wake Forest', zipCode: '27587'}));
    }

    handleUserEnteredZip = (e) => {
        let userInput = e.target.value;
        this.setState({
            userEnteredZip: userInput,
        })
    }

    submit = (userZip) => {
        this.setState({
            userEnteredZip: userZip,
        })
        this.getWeather();
        this.getForecast(userZip);
        this.getMap();
    }

    seeSaved = (zip) => {
        console.log("zip in the see saved fx is: ",zip)
        const apikey = process.env.REACT_APP_API_WEATHER_KEY;
        const apiUrl = "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",us&APPID=" + apikey;
        const googleMapKey = process.env.REACT_APP_API_GOOGLE_MAP_KEY
        let googleApiUrl = "https://maps.googleapis.com/maps/api/staticmap?center=" + zip + "&zoom=11&size=350x350&key=" + googleMapKey;
        // const forecastApiUrl = "http://api.openweathermap.org/data/2.5/forecast?zip=" + zip + ",us&APPID=" + apikey;
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
                    // icon: responseData.weather[0].icon,
                },
                map: googleApiUrl,
            }, () => {
                // code here will always happen after state is set


            if (this.state.current.condition.includes("rain" || "drizzle")) {
                this.setState({
                    current: {
                        icon: "rainy"
                    }
                });
            } 
            if (this.state.current.condition.includes("clear")) {
                this.setState({
                    current: {
                        icon: "sunny"
                    }
                });
            }
            if (this.state.current.condition.includes("broken clouds" || "overcast clouds")) {
                this.setState({
                    current: {
                        icon: "cloudy"
                    }
                });
            }
            if (this.state.current.condition.includes("few clouds" || "scattered clouds")) {
                this.setState({
                    current: {
                        icon: "partCloud"
                    }
                });
            }
            })
        })
        .then(this.getForecast(zip))
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
                    // icon: responseData.weather[0].icon,
                }
            }, () => {
                // code here will always happen after state is set


            if (this.state.current.condition.includes("rain")) {
                this.setState({
                    current: {
                        icon: "rainy"
                    }
                });
            } 
            if (this.state.current.condition.includes("drizzle")) {
                this.setState({
                    current: {
                        icon: "rainy"
                    }
                });
            }
            if (this.state.current.condition.includes("clear")) {
                this.setState({
                    current: {
                        icon: "sunny"
                    }
                });
            }
            if (this.state.current.condition.includes("broken clouds")) {
                this.setState({
                    current: {
                        icon: "cloudy"
                    }
                });
            }
            if (this.state.current.condition.includes("overcast clouds")) {
                this.setState({
                    current: {
                        icon: "cloudy"
                    }
                });
            }
            if (this.state.current.condition.includes("few clouds")) {
                this.setState({
                    current: {
                        icon: "partCloud"
                    }
                });
            }
            if (this.state.current.condition.includes("scattered clouds")) {
                this.setState({
                    current: {
                        icon: "partCloud"
                    }
                });
            }
            })
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

    getForecast = (zip) => {
        const apikey = process.env.REACT_APP_API_WEATHER_KEY;
        let zipCode = zip;
        const apiUrl = "http://api.openweathermap.org/data/2.5/forecast?zip=" + zipCode+ ",us&APPID=" + apikey;
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
               
                // if (responseData.list[i].dt_txt === responseData.list[i+1].dt_txt)

                this.state.forecastItems.splice(0, 1, newFormat);    
                this.state.forecastItems.splice(1, 1, temp);    
                this.state.forecastItems.splice(2, 1, condition);    
                this.state.forecastItems.splice(3, 1, icon);  
                this.state.forecastItems.splice(4, 1, time);                  
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

        let stored = JSON.parse(window.localStorage.getItem('city'));
        console.log("stored city is: ", stored);
        console.log("stored zip is: ", stored.zipCode);

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
                            onClick={() => this.submit(this.state.userEnteredZip)}>
                                Submit
                        </button>
                    </div>
                    <div className="saved">
                        <p>Get weather for: </p>
                        <button
                            type="submit" 
                            onClick={() => this.seeSaved(stored.zipCode)}>
                                {stored.name}
                        </button>
                    </div>
                </div>

                {this.state.current.icon && <Current current={this.state.current} map={this.state.map} condition={this.state.current.icon}/>}
                <Forecast forecast={this.state.forecastItems} apiData={this.state.apiForecast} />

            </div>
        )
    }
}

export default Home 