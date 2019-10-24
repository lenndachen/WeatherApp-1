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
            forecast: [],
            highLow: [],
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
        let oldInfo = this.state.forecast;
        console.log("in submit, old info? ", oldInfo);
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
            let forecastData = [];
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

                forecastData.push(day);
                forecastData.push(newFormat);    
                forecastData.push(temp);    
                forecastData.push(condition);    
                forecastData.push(icon);  
                forecastData.push(time);        
                // console.log("whats in my array after push? ", forecastData);          
            }
            
            let response = [];
            response.push(responseData.list);
            console.log("array right before set state? ", forecastData);
            this.setState({
                apiForecast: response,
                forecast: forecastData,
            }, () => {
                let forecast = this.state.forecast;
                console.log("before if statement", forecast[3]);
                if (forecast[3] === "rain") {
                    this.setState({
                        tomorrowIcon: "rainy"
                    });
                } 
                if (forecast[3].includes("drizzle")) {
                    this.setState({
                        tomorrowIcon: "rainy"
                    });
                }
                if (forecast[3].includes("clear")) {
                    this.setState({
                        tomorrowIcon: "sunny"
                    });
                }
                if (forecast[3].includes("broken clouds")) {
                    this.setState({
                        tomorrowIcon: "cloudy"
                    });
                }
                if (forecast[3].includes("overcast clouds")) {
                    this.setState({
                        tomorrowIcon: "cloudy"
                    });
                }
                if (forecast[3].includes("few clouds")) {
                    this.setState({
                        tomorrowIcon: "partCloud"
                    });
                }
                if (forecast[3].includes("scattered clouds")) {
                    this.setState({
                        tomorrowIcon: "partCloud"
                    });
                }

                if (forecast[9].includes("rain")) {
                    this.setState({
                        next1Icon: "rainy"
                    });
                } 
                if (forecast[9].includes("drizzle")) {
                    this.setState({
                        next1Icon: "rainy"
                    });
                }
                if (forecast[9].includes("clear")) {
                    this.setState({
                        next1Icon: "sunny"
                    });
                }
                if (forecast[9].includes("broken clouds")) {
                    this.setState({
                        next1Icon: "cloudy"
                    });
                }
                if (forecast[9].includes("overcast clouds")) {
                    this.setState({
                        next1Icon: "cloudy"
                    });
                }
                if (forecast[9].includes("few clouds")) {
                    this.setState({
                        next1Icon: "partCloud"
                    });
                }
                if (forecast[9].includes("scattered clouds")) {
                    this.setState({
                        next1Icon: "partCloud"
                    });
                }

                if (forecast[15].includes("rain")) {
                    this.setState({
                        next2Icon: "rainy"
                    });
                } 
                if (forecast[15].includes("drizzle")) {
                    this.setState({
                        next2Icon: "rainy"
                    });
                }
                if (forecast[15].includes("clear")) {
                    this.setState({
                        next2Icon: "sunny"
                    });
                }
                if (forecast[15].includes("broken clouds")) {
                    this.setState({
                        next2Icon: "cloudy"
                    });
                }
                if (forecast[15].includes("overcast clouds")) {
                    this.setState({
                        next2Icon: "cloudy"
                    });
                }
                if (forecast[15].includes("few clouds")) {
                    this.setState({
                        next2Icon: "partCloud"
                    });
                }
                if (forecast[15].includes("scattered clouds")) {
                    this.setState({
                        next2Icon: "partCloud"
                    });
                }

                if (forecast[21].includes("rain")) {
                    this.setState({
                        next3Icon: "rainy"
                    });
                } 
                if (forecast[21].includes("drizzle")) {
                    this.setState({
                        next3Icon: "rainy"
                    });
                }
                if (forecast[21].includes("clear")) {
                    this.setState({
                        next3Icon: "sunny"
                    });
                }
                if (forecast[21].includes("broken clouds")) {
                    this.setState({
                        next3Icon: "cloudy"
                    });
                }
                if (forecast[21].includes("overcast clouds")) {
                    this.setState({
                        next3Icon: "cloudy"
                    });
                }
                if (forecast[21].includes("few clouds")) {
                    this.setState({
                        next3Icon: "partCloud"
                    });
                }
                if (forecast[21].includes("scattered clouds")) {
                    this.setState({
                        next3Icon: "partCloud"
                    });
                }

                if (forecast[27].includes("rain")) {
                    this.setState({
                        next4Icon: "rainy"
                    });
                } 
                if (forecast[27].includes("drizzle")) {
                    this.setState({
                        next4Icon: "rainy"
                    });
                }
                if (forecast[27].includes("clear")) {
                    this.setState({
                        next4Icon: "sunny"
                    });
                }
                if (forecast[27].includes("broken clouds")) {
                    this.setState({
                        next4Icon: "cloudy"
                    });
                }
                if (forecast[27].includes("overcast clouds")) {
                    this.setState({
                        next4Icon: "cloudy"
                    });
                }
                if (forecast[27].includes("few clouds")) {
                    this.setState({
                        next4Icon: "partCloud"
                    });
                }
                if (forecast[27].includes("scattered clouds")) {
                    this.setState({
                        next4Icon: "partCloud"
                    });
                }

                let tomorrowArray = this.tomorrowArray(forecast);
                let temps = this.checkTemps(tomorrowArray);
                let tomorrow = [tomorrowArray[1], temps[1], temps[0]]

                let next1Array = this.next1Array(forecast);
                let next1Temps = this.checkTemps(next1Array);
                let next1 = [next1Array[1], next1Temps[1], next1Temps[0]]

                let next2Array = this.next2Array(forecast);
                let next2Temps = this.checkTemps(next2Array);
                let next2 = [next2Array[1], next2Temps[1], next2Temps[0]]
                
                let next3Array = this.next3Array(forecast);
                let next3Temps = this.checkTemps(next3Array);
                let next3 = [next3Array[1], next3Temps[1], next3Temps[0]]
                
                let next4Array = this.next4Array(forecast);
                let next4Temps = this.checkTemps(next4Array);
                let next4 = [next4Array[1], next4Temps[1], next4Temps[0]]

                this.setState({
                    tomorrow: tomorrow,
                    next1: next1,
                    next2: next2,
                    next3: next3,
                    next4: next4
                })
            })                
        
            console.log('My Forecast Data', this.state.forecast);   
        })
    }

    convertToFarenheit = (x) => {
        let kelvin = x - 273.15;
        let farenheit = kelvin * 9/5 + 32;
        let rounded = Math.round( farenheit * 10 ) / 10
        return rounded;
    }

    tomorrowArray = (forecastArray) => {
        let today = parseInt(forecastArray[0]);
        let tomorrowNum = today+1;
        let tomorrow = tomorrowNum.toString();
        let tomorrowIndex = forecastArray.indexOf(tomorrow);
        let tomorrowArray = forecastArray.slice(tomorrowIndex, tomorrowIndex+48);
        return tomorrowArray;
    }

    next1Array = (forecastArray) => {
        let today = parseInt(forecastArray[0]);
        let next1Num = today+2;
        let next1 = next1Num.toString();
        let next1Index = forecastArray.indexOf(next1);
        let next1Array = forecastArray.slice(next1Index, next1Index+48);
        return next1Array;
    }

    next2Array = (forecastArray) => {
        let today = parseInt(forecastArray[0]);
        let next2Num = today+3;
        let next2 = next2Num.toString();
        let next2Index = forecastArray.indexOf(next2);
        let next2Array = forecastArray.slice(next2Index, next2Index+48);
        return next2Array;
    }

    next3Array = (forecastArray) => {
        let today = parseInt(forecastArray[0]);
        let next3Num = today+4;
        let next3 = next3Num.toString();
        let next3Index = forecastArray.indexOf(next3);
        let next3Array = forecastArray.slice(next3Index, next3Index+48);
        return next3Array;
    }

    next4Array = (forecastArray) => {
        let today = parseInt(forecastArray[0]);
        let next4Num = today+5;
        let next4 = next4Num.toString();
        let next4Index = forecastArray.indexOf(next4);
        let next4Array = forecastArray.slice(next4Index, next4Index+48);
        return next4Array;
    }

    checkTemps = (dayArray) => {
        let dayData = dayArray;
        function checkNums(num) {
            return num >= -100;
        }
        let temps = dayData.filter(checkNums);
        temps.splice(0,1);
        temps.splice(1,1);
        temps.splice(2,1);
        temps.splice(3,1);
        temps.splice(4,1);
        temps.splice(5,1);
        temps.splice(6,1);
        temps.splice(7,1);
        let low = Math.min(temps[0], temps[1], temps[2], temps[3], temps[4], temps[5], temps[6], temps[7]);
        let high = Math.max(temps[0], temps[1], temps[2], temps[3], temps[4], temps[5], temps[6], temps[7]);
        let lowHigh = [low, high];
        return lowHigh;
    }

    render() {
        let stored = JSON.parse(window.localStorage.getItem('city'));
        // console.log("stored city is: ", stored);
        // console.log("stored zip is: ", stored.zipCode);
        // console.log("did the days get stored? ", this.state.tomorrow);
        console.log("checking home render: ", this.state.forecast);

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
                {this.state.tomorrow && <Forecast forecast={this.state.forecast} tomorrow={this.state.tomorrow} next1={this.state.next1} next2={this.state.next2} next3={this.state.next3} next4={this.state.next4} tomorrowIcon={this.state.tomorrowIcon} next1Icon={this.state.next1Icon} next2Icon={this.state.next2Icon} next3Icon={this.state.next3Icon} next4Icon={this.state.next4Icon} apiData={this.state.apiForecast} />}

            </div>
        )
    }
}

export default Home 