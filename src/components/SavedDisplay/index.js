import React from "react";

const SavedDisplay = ({ current, map, image }) => (
    <div className="saved">
        <div className="map">
                <img src={map} alt="map of weather area"></img>
            </div>
            
            <div className="savedInfo">
                <div>Today's weather for {current.location}: </div>
                <div> It is currently {current.temp} {'\u00b0'}F</div>
                <div> The conditions are:<br/>
                    <img 
                        className="weatherIcon"
                        src={image}
                        alt="weather icon">
                    </img><br/>
                    {/* {this.pickAPic(this.state.current.condition)} */}
                    {current.condition}
                </div>
                <div> Sunrise is at {current.sunrise}</div>
                <div> Sunset is at {current.sunset}</div>
            </div>
    </div>
)

export default SavedDisplay;