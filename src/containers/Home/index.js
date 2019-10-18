import React from "react";
import cloudy from "../../assets/images/SVG/cloudy.svg";
import rainy from "../../assets/images/SVG/rainy.svg";
import sunny from "../../assets/images/SVG/sunny.svg";
import partCloud from "../../assets/images/SVG/partly cloudy.svg";
// import SearchAndSave from "../../components/SearchAndSave";
// import Current from "../../components/Current";
// import Forecast from "../../components/Forecast";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            userEnteredZip: "",
            location: "",
            temp: 255.35,
            condition: "",
            icon: "",
            date1: "",
            lowTemp1: 255.35,
            highTemp1: 255.35,
            condition1: "",
            date2: "",
            lowTemp2: 255.35,
            highTemp2: 255.35,
            condition2: "",
            date3: "",
            lowTemp3: 255.35,
            highTemp3: 255.35,
            condition3: "",
            date4: "",
            lowTemp4: 255.35,
            highTemp4: 255.35,
            condition4: "",
            date5: "",
            lowTemp5: 255.35,
            highTemp5: 255.35,
            condition5: "",
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
        // this.pickAPic();
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

    getForecast() {
        const apikey = process.env.REACT_APP_API_WEATHER_KEY;
        let zipCode = this.state.userEnteredZip;
        const apiUrl = "http://api.openweathermap.org/data/2.5/forecast?zip=" + zipCode + ",us&APPID=" + apikey;
        fetch( apiUrl )
        .then(response => response.json())
        .then(responseData => {
            console.log('My Forecast Data', responseData);

                let date1 = responseData.list[0].dt_txt;
                let splitDate1 = date1.split("-");
                let splitOffTime1 = splitDate1[2].split(" ");
                let month1 = splitDate1[1];
                let day1 = splitOffTime1[0];
                let year1 = splitDate1[0];
                let newFormat1 = month1+"-"+day1+"-"+year1;

                let date2 = responseData.list[8].dt_txt;
                let splitDate2 = date2.split("-");
                let splitOffTime2 = splitDate2[2].split(" ");
                let month2 = splitDate2[1];
                let day2 = splitOffTime2[0];
                let year2 = splitDate2[0];
                let newFormat2 = month2+"-"+day2+"-"+year2;

                let date3 = responseData.list[16].dt_txt;
                let splitDate3 = date3.split("-");
                let splitOffTime3 = splitDate3[2].split(" ");
                let month3 = splitDate3[1];
                let day3 = splitOffTime3[0];
                let year3 = splitDate3[0];
                let newFormat3 = month3+"-"+day3+"-"+year3;

                let date4 = responseData.list[24].dt_txt;
                let splitDate4 = date4.split("-");
                let splitOffTime4 = splitDate4[2].split(" ");
                let month4 = splitDate4[1];
                let day4 = splitOffTime4[0];
                let year4 = splitDate4[0];
                let newFormat4 = month4+"-"+day4+"-"+year4;

                let date5 = responseData.list[32].dt_txt;
                let splitDate5 = date5.split("-");
                let splitOffTime5 = splitDate5[2].split(" ");
                let month5 = splitDate5[1];
                let day5 = splitOffTime5[0];
                let year5 = splitDate5[0];
                let newFormat5 = month5+"-"+day5+"-"+year5;

            this.setState({ 
                 date1: newFormat1,
                 lowTemp1: responseData.list[0].main.temp_min,
                 highTemp1: responseData.list[0].main.temp_max,
                 condition1: responseData.list[0].weather[0].description,
                 date2: newFormat2,
                 lowTemp2: responseData.list[8].main.temp_min,
                 highTemp2: responseData.list[8].main.temp_max,
                 condition2: responseData.list[8].weather[0].description,
                 date3: newFormat3,
                 lowTemp3: responseData.list[16].main.temp_min,
                 highTemp3: responseData.list[16].main.temp_max,
                 condition3: responseData.list[16].weather[0].description,
                 date4: newFormat4,
                 lowTemp4: responseData.list[24].main.temp_min,
                 highTemp4: responseData.list[24].main.temp_max,
                 condition4: responseData.list[24].weather[0].description,
                 date5: newFormat5,
                 lowTemp5: responseData.list[32].main.temp_min,
                 highTemp5: responseData.list[32].main.temp_max,
                 condition5: responseData.list[32].weather[0].description,
            });
        });
        // this.convertDate();
    }

    convertToFarenheit() {
        let kelvin = this.state.temp - 273.15;
        let farenheit = kelvin * 9/5 + 32;
        let rounded = Math.round( farenheit * 10 ) / 10
        return rounded;
    }

    // pickAPic = (w) => {
    //     let imgNeeded = w;
    //     console.log("pickAPic condition: ", imgNeeded);
    //     switch(true) {
    //         case (imgNeeded.includes("rain")):
    //             this.setState({
    //                 image: "rainy"
    //             })
    //             break;
    //         case (imgNeeded.includes("sun")):
    //             this.setState({
    //                 image: "sunny"
    //             })
    //             break;
    //         case (imgNeeded.includes("clear")):
    //             this.setState({
    //                 image: "sunny"
    //             })
    //             break;
    //         case (imgNeeded.includes("cloud")):
    //             this.setState({
    //                 image: "cloudy"
    //             })
    //             break;
    //         default:
    //             this.setState({
    //                 image: "partCloud"
    //             })
    //     }
    // }

    render() {
        // console.log("this.state.image: ", this.state.image);
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
                        <div>Today's weather for {this.state.location}: </div>
                        <div> It is currently {this.convertToFarenheit(this.state.temp)} {'\u00b0'}F</div>
                        <div> The conditions are:<br/>
                            <img 
                                className="weatherIcon"
                                src={sunny} 
                                alt="weather icon">
                            </img><br/>
                            {/* {this.pickAPic(this.state.condition)} */}
                            {this.state.condition}
                        </div>
                    </div>
                </div>

                <div className="forecast">
                    <h2 className="foreHeader">The 5-day forecast is: </h2>
                    <div className="foreDay1">For {this.state.date1}: <br/> 
                        High: {this.convertToFarenheit(this.state.highTemp1)} {'\u00b0'}F<br/>
                        Low: {this.convertToFarenheit(this.state.lowTemp1)} {'\u00b0'}F<br/>
                        Conditions: <br/>
                            <img className="weatherIcon" src={sunny} alt="cloudy"></img><br/>
                            {this.state.condition1}</div>
                    <div className="foreDay2">For {this.state.date2}: <br/> 
                        High: {this.convertToFarenheit(this.state.highTemp2)} {'\u00b0'}F<br/>
                        Low: {this.convertToFarenheit(this.state.lowTemp2)} {'\u00b0'}F<br/>
                        Conditions: <br/>
                            <img className="weatherIcon" src={cloudy} alt="cloudy"></img><br/>
                            {this.state.condition2}</div>
                    <div className="foreDay3">For {this.state.date3}: <br/> 
                        High: {this.convertToFarenheit(this.state.highTemp3)} {'\u00b0'}F<br/>
                        Low: {this.convertToFarenheit(this.state.lowTemp3)} {'\u00b0'}F<br/>
                        Conditions: <br/>
                            <img className="weatherIcon" src={partCloud} alt="cloudy"></img><br/>
                            {this.state.condition3}</div>
                    <div className="foreDay4">For {this.state.date4}: <br/> 
                        High: {this.convertToFarenheit(this.state.highTemp4)} {'\u00b0'}F<br/>
                        Low: {this.convertToFarenheit(this.state.lowTemp4)} {'\u00b0'}F<br/>
                        Conditions: <br/>
                            <img className="weatherIcon" src={cloudy} alt="cloudy"></img><br/>
                            {this.state.condition4}</div>
                    <div className="foreDay5">For {this.state.date5}: <br/> 
                        High: {this.convertToFarenheit(this.state.highTemp5)} {'\u00b0'}F<br/>
                        Low: {this.convertToFarenheit(this.state.lowTemp5)} {'\u00b0'}F<br/>
                        Conditions: <br/>
                            <img className="weatherIcon" src={rainy} alt="cloudy"></img><br/>
                            {this.state.condition5}</div>
                </div>

            </div>
        )
    }
}

export default Home