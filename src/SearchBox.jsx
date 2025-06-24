import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';
import { useState } from 'react';

export default function SearchBox() {
    let [city, setCity] = useState("");
    const [result, setResult] = useState(null);

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "e1d36b1e620ddaa8b0819ee604b43da9";

    let getWeatherInfo = async() => {
        let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        let jsonResponse = await response.json();
        console.log(jsonResponse);

        if (jsonResponse.cod !== 200) {
      setResult({ error: "City not found. Please enter a valid city name." });
      return;
    }else{

        const resultData = {
            temp: jsonResponse.main.temp,
            tempMin: jsonResponse.main.temp_min,
            tempMax: jsonResponse.main.temp_max,
            humidity: jsonResponse.main.humidity,
            feelsLike: jsonResponse.main.feels_like,
            weather: jsonResponse.weather[0].description
        };
        setResult(resultData);
        console.log(resultData);
    }
} 

    let handleChange = (evt) => {
        setCity(evt.target.value);
    };

    let handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(city);
        setCity("");
        getWeatherInfo(city);
    };

    return(
        <div className="searchBox">
            <h3>Search for the weather</h3>
            <form onSubmit={handleSubmit}>
                <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handleChange} />
                <br/>
                <br/>
                <Button variant="contained" type="submit">
        Search
      </Button>
            </form>
                <div className="res">
        {result && result.error ? (
    <div className="result_box">
      <h2>Error</h2>
      <p>{result.error}</p>
    </div>
  ) : result ? (
    <div className="result_box">
      <h2>Result</h2>
      <p>Temp: {result.temp}°C</p>
      <p>Temp Min: {result.tempMin}°C</p>
      <p>Temp Max: {result.tempMax}°C</p>
      <p>Humidity: {result.humidity}%</p>
      <p>Feels Like: {result.feelsLike}°C</p>
      <p>Description: {result.weather}</p>
    </div>
  ) : null}
</div>
        </div>
    )
}