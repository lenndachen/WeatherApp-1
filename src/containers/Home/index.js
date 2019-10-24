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
        // this.state.forecast.splice(0, 200);
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

                this.state.forecastItems.push(day);
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
            }, () => {

                if (this.state.forecastItems[3].includes("rain")) {
                    this.setState({
                        tomorrowIcon: "rainy"
                    });
                } 
                if (this.state.forecastItems[3].includes("drizzle")) {
                    this.setState({
                        tomorrowIcon: "rainy"
                    });
                }
                if (this.state.forecastItems[3].includes("clear")) {
                    this.setState({
                        tomorrowIcon: "sunny"
                    });
                }
                if (this.state.forecastItems[3].includes("broken clouds")) {
                    this.setState({
                        tomorrowIcon: "cloudy"
                    });
                }
                if (this.state.forecastItems[3].includes("overcast clouds")) {
                    this.setState({
                        tomorrowIcon: "cloudy"
                    });
                }
                if (this.state.forecastItems[3].includes("few clouds")) {
                    this.setState({
                        tomorrowIcon: "partCloud"
                    });
                }
                if (this.state.forecastItems[3].includes("scattered clouds")) {
                    this.setState({
                        tomorrowIcon: "partCloud"
                    });
                }

                if (this.state.forecastItems[9].includes("rain")) {
                    this.setState({
                        next1Icon: "rainy"
                    });
                } 
                if (this.state.forecastItems[9].includes("drizzle")) {
                    this.setState({
                        next1Icon: "rainy"
                    });
                }
                if (this.state.forecastItems[9].includes("clear")) {
                    this.setState({
                        next1Icon: "sunny"
                    });
                }
                if (this.state.forecastItems[9].includes("broken clouds")) {
                    this.setState({
                        next1Icon: "cloudy"
                    });
                }
                if (this.state.forecastItems[9].includes("overcast clouds")) {
                    this.setState({
                        next1Icon: "cloudy"
                    });
                }
                if (this.state.forecastItems[9].includes("few clouds")) {
                    this.setState({
                        next1Icon: "partCloud"
                    });
                }
                if (this.state.forecastItems[9].includes("scattered clouds")) {
                    this.setState({
                        next1Icon: "partCloud"
                    });
                }

                if (this.state.forecastItems[15].includes("rain")) {
                    this.setState({
                        next2Icon: "rainy"
                    });
                } 
                if (this.state.forecastItems[15].includes("drizzle")) {
                    this.setState({
                        next2Icon: "rainy"
                    });
                }
                if (this.state.forecastItems[15].includes("clear")) {
                    this.setState({
                        next2Icon: "sunny"
                    });
                }
                if (this.state.forecastItems[15].includes("broken clouds")) {
                    this.setState({
                        next2Icon: "cloudy"
                    });
                }
                if (this.state.forecastItems[15].includes("overcast clouds")) {
                    this.setState({
                        next2Icon: "cloudy"
                    });
                }
                if (this.state.forecastItems[15].includes("few clouds")) {
                    this.setState({
                        next2Icon: "partCloud"
                    });
                }
                if (this.state.forecastItems[15].includes("scattered clouds")) {
                    this.setState({
                        next2Icon: "partCloud"
                    });
                }

                if (this.state.forecastItems[21].includes("rain")) {
                    this.setState({
                        next3Icon: "rainy"
                    });
                } 
                if (this.state.forecastItems[21].includes("drizzle")) {
                    this.setState({
                        next3Icon: "rainy"
                    });
                }
                if (this.state.forecastItems[21].includes("clear")) {
                    this.setState({
                        next3Icon: "sunny"
                    });
                }
                if (this.state.forecastItems[21].includes("broken clouds")) {
                    this.setState({
                        next3Icon: "cloudy"
                    });
                }
                if (this.state.forecastItems[21].includes("overcast clouds")) {
                    this.setState({
                        next3Icon: "cloudy"
                    });
                }
                if (this.state.forecastItems[21].includes("few clouds")) {
                    this.setState({
                        next3Icon: "partCloud"
                    });
                }
                if (this.state.forecastItems[21].includes("scattered clouds")) {
                    this.setState({
                        next3Icon: "partCloud"
                    });
                }

                if (this.state.forecastItems[27].includes("rain")) {
                    this.setState({
                        next4Icon: "rainy"
                    });
                } 
                if (this.state.forecastItems[27].includes("drizzle")) {
                    this.setState({
                        next4Icon: "rainy"
                    });
                }
                if (this.state.forecastItems[27].includes("clear")) {
                    this.setState({
                        next4Icon: "sunny"
                    });
                }
                if (this.state.forecastItems[27].includes("broken clouds")) {
                    this.setState({
                        next4Icon: "cloudy"
                    });
                }
                if (this.state.forecastItems[27].includes("overcast clouds")) {
                    this.setState({
                        next4Icon: "cloudy"
                    });
                }
                if (this.state.forecastItems[27].includes("few clouds")) {
                    this.setState({
                        next4Icon: "partCloud"
                    });
                }
                if (this.state.forecastItems[27].includes("scattered clouds")) {
                    this.setState({
                        next4Icon: "partCloud"
                    });
                }

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

    tomorrowArray = (forecastArray) => {
        let today = parseInt(forecastArray[0]);
        console.log("today's number is: ", today);
        let tomorrowNum = today+1;
        let tomorrow = tomorrowNum.toString();
        console.log("tomorrow's number is: ", tomorrow);
        let tomorrowIndex = forecastArray.indexOf(tomorrow);
        console.log("tomorrowIndex is: ", tomorrowIndex);
        let tomorrowArray = forecastArray.slice(tomorrowIndex, tomorrowIndex+48);
        console.log("tomorrowArray is: ", tomorrowArray);
        return tomorrowArray;
    }

    next1Array = (forecastArray) => {
        let today = parseInt(forecastArray[0]);
        console.log("today's number is: ", today);
        let next1Num = today+2;
        let next1 = next1Num.toString();
        console.log("next1's number is: ", next1);
        let next1Index = forecastArray.indexOf(next1);
        console.log("next1Index is: ", next1Index);
        let next1Array = forecastArray.slice(next1Index, next1Index+48);
        console.log("next1Array is: ", next1Array);
        return next1Array;
    }

    next2Array = (forecastArray) => {
        let today = parseInt(forecastArray[0]);
        console.log("today's number is: ", today);
        let next2Num = today+3;
        let next2 = next2Num.toString();
        console.log("next2's number is: ", next2);
        let next2Index = forecastArray.indexOf(next2);
        console.log("next2Index is: ", next2Index);
        let next2Array = forecastArray.slice(next2Index, next2Index+48);
        console.log("next2Array is: ", next2Array);
        return next2Array;
    }

    next3Array = (forecastArray) => {
        let today = parseInt(forecastArray[0]);
        console.log("today's number is: ", today);
        let next3Num = today+4;
        let next3 = next3Num.toString();
        console.log("next3's number is: ", next3);
        let next3Index = forecastArray.indexOf(next3);
        console.log("next3Index is: ", next3Index);
        let next3Array = forecastArray.slice(next3Index, next3Index+48);
        console.log("next3Array is: ", next3Array);
        return next3Array;
    }

    next4Array = (forecastArray) => {
        let today = parseInt(forecastArray[0]);
        console.log("today's number is: ", today);
        let next4Num = today+5;
        let next4 = next4Num.toString();
        console.log("next4's number is: ", next4);
        let next4Index = forecastArray.indexOf(next4);
        console.log("next4Index is: ", next4Index);
        let next4Array = forecastArray.slice(next4Index, next4Index+48);
        console.log("next4Array is: ", next4Array);
        return next4Array;
    }

    checkTemps = (dayArray) => {
        console.log("in checkTemps fx: ", dayArray);
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
        console.log("temps are: ", temps);
        let low = Math.min(temps[0], temps[1], temps[2], temps[3], temps[4], temps[5], temps[6], temps[7]);
        console.log("low is: ", low);
        let high = Math.max(temps[0], temps[1], temps[2], temps[3], temps[4], temps[5], temps[6], temps[7]);
        console.log("high is: ", high)
        let lowHigh = [low, high];
        return lowHigh;
     }

    render() {
        // console.log("current weather data: ", this.state.current);
        // console.log("data pulled from api: ", this.state.apiForecast);
        let forecastArray = this.state.forecastItems;
        // console.log("forecast array is: ", forecastArray);

        let tomorrowArray = this.tomorrowArray(forecastArray);
        let temps = this.checkTemps(tomorrowArray);
        let tomorrow = {date: tomorrowArray[1], high: temps[1], low: temps[0]}

        let next1Array = this.next1Array(forecastArray);
        let next1Temps = this.checkTemps(next1Array);
        let next1 = {date: next1Array[1], high: next1Temps[1], low: next1Temps[0]}

        let next2Array = this.next2Array(forecastArray);
        let next2Temps = this.checkTemps(next2Array);
        let next2 = {date: next2Array[1], high: next2Temps[1], low: next2Temps[0]}
        
        let next3Array = this.next3Array(forecastArray);
        let next3Temps = this.checkTemps(next3Array);
        let next3 = {date: next3Array[1], high: next3Temps[1], low: next3Temps[0]}
        
        let next4Array = this.next4Array(forecastArray);
        let next4Temps = this.checkTemps(next4Array);
        let next4 = {date: next4Array[1], high: next4Temps[1], low: next4Temps[0]}

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
                {this.state.tomorrowIcon && <Forecast forecast={this.state.forecastItems} tomorrow={tomorrow} next1={next1} next2={next2} next3={next3} next4={next4} tomorrowIcon={this.state.tomorrowIcon} next1Icon={this.state.next1Icon} next2Icon={this.state.next2Icon} next3Icon={this.state.next3Icon} next4Icon={this.state.next4Icon} apiData={this.state.apiForecast} />}

            </div>
        )
    }
}

export default Home 