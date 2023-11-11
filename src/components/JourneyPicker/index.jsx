import React, { useEffect, useState } from 'react';
import './style.css';

export const DatesOptions = ({ dates }) => {
  return dates.map((date) => (
    <option key={date.dateBasic} value={date.dateBasic}>
      {date.dateCs}
    </option>
  ));
};

export const CityOptions = ({ cities }) => {
  return cities.map((city) => (
    <option key={city.code} value={city.code}>
      {city.name}
    </option>
  ));
};

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [cities, setCities] = useState([]);
  const [dates, setDates] = useState([]);
  useEffect(() => {
    const fetchCities = async () => {
      const resp = await fetch(
        'https://apps.kodim.cz/daweb/leviexpress/api/cities',
      );
      const data = await resp.json();
      setCities(data.results);
    };
    fetchCities();
  }, []);
  useEffect(() => {
    const fetchDates = async () => {
      const resp = await fetch(
        'https://apps.kodim.cz/daweb/leviexpress/api/dates',
      );
      const data = await resp.json();
      setDates(data.results);
    };
    fetchDates();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ fromCity, toCity, date });
  };
  return (
    <div className="journey-picker container">
      <h2 className="journey-picker__head">Kam chcete jet?</h2>
      <div className="journey-picker__body">
        <form onSubmit={handleSubmit} className="journey-picker__form">
          <label>
            <div className="journey-picker__label">Odkud:</div>
            <select
              value={fromCity}
              onChange={(event) => setFromCity(event.target.value)}
            >
              <option value="">Vyberte</option>,
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Kam:</div>
            <select
              value={toCity}
              onChange={(event) => setToCity(event.target.value)}
            >
              <option value="">Vyberte</option>,
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Datum:</div>
            <select
              value={date}
              onChange={(event) => setDate(event.target.value)}
            >
              <option value="">Vyberte</option>
              <DatesOptions dates={dates} />
            </select>
          </label>
          <div className="journey-picker__controls">
            <button className="btn" type="submit">
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src="/map.svg" />
      </div>
    </div>
  );
};
