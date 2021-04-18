import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_WEATHER_QUERY } from '../graphql/Queries';
import tConverter from '@khanisak/temperature-converter';
import './Home.css';

function Home() {
    const [citySearched, setCitySearched] = useState('');
    const [getWeather, { data, error }] = useLazyQuery(
        GET_WEATHER_QUERY,
        {
            variables: { name: citySearched }
        }
    );
    if (error) return <h1>Error found</h1>;
    const renderWeatherList = () => {
        const temperatureConverter = tConverter.convert(data.getCityByName?.weather.temperature.actual, tConverter.unit.Kelvin, tConverter.unit.Celcius);
        return (
            <div className="weather__list">
                <div>City: {data.getCityByName?.name}</div>
                <div>Temperature: {parseInt(temperatureConverter)}</div>
                <div>Description: {data.getCityByName?.weather.summary.description}</div>
                <div>Wind Speed: {data.getCityByName?.weather.wind.speed}</div>
            </div>
        )
    };
    
    return (
        <div className="home">
            <h1>Search For Weather</h1>
            <div className="input__container">
                <input type="text" placeholder="City name..." onChange={(e) => setCitySearched(e.target.value)}/>
                <button onClick={() => getWeather()}>Search</button>
            </div>
            {data && data.getCityByName ? renderWeatherList() : null}
        </div>
    )
}

export default Home;
