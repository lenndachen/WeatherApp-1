import React from "react";

class SearchAndSave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userEnteredZip: "",
        }
    }

    handleUserEnteredZip = (e) => {
        let userInput = this.props.enteredZipCode(e.target.value);
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

    render() {
        let enteredZipCode = this.state.userEnteredZip;
        return(
            <div className="searchAndSaved">
                <div className="search">
                    <input 
                        onChange={this.handleUserEnteredZip} 
                        value={enteredZipCode} 
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
        )
    }
}

export default SearchAndSave;