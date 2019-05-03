import React, { Component } from "react";
import WeatherSearch from "components/WeatherElements/WeatherSearch";
import { getWeather } from "API";

class App extends Component {
  state = {
    //init marker coords
    weather: { latitude: 12.9791198, longitude: 77.5912997 },
    //init map coords
    viewport: {
      latitude: 12.9791198,
      longitude: 77.5912997,
      zoom: 11
    },
    isLoaded: false,
    isLoading: false
  };

  toggleLoading = () => this.setState({ isLoading: !this.state.isLoading });

  setViewport = viewport => {
    this.setState({ ...this.state, viewport: viewport });
    // console.log('set viewport in app js', this.state);
  };

  performSearch = async (lat, lon) => {
    const res = await getWeather(lat, lon);
    // console.log("res data appjs", res);
    if (res !== 0) {
      this.setState({
        weather: res,
        viewport: {
          ...this.state.viewport,
          latitude: res.latitude,
          longitude: res.longitude,
          zoom: 11
        },
        isLoaded: true,
        isLoading: false
      });
    }
  };

  render() {
    // console.log("App State", this.state);
    return (
      <div>
        <WeatherSearch
          weatherState={this.state}
          performSearch={this.performSearch}
          toggleLoading={this.toggleLoading}
          setViewport={this.setViewport}
          isLoaded={this.state.isLoaded}
        />
      </div>
    );
  }
}

export default App;
