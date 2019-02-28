import React from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_ENDPOINT = "8afa950031150cefc07a5f791ec41b35";

class App extends React.Component {

  state = {
    temperature: null,
    city: null,
    country: null,
    humidity: null,
    description: null,
    error: undefined
  }

  getWeather = async (event) => {
    event.preventDefault()
    const city = event.target.elements.city.value
    const country = event.target.elements.country.value
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_ENDPOINT}`);
    const data = await api_call.json();
    console.log(data);

    if(city && country) {
    this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: ""
    })
  }else {
    return <h1>{data.message}</h1>
  }
}

  render() {
    return(
      <div>
        <Titles />
        <Form getWeather={this.getWeather}/>
        <Weather
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}
        />
      </div>
    );
  }




}

export default App;
