import React from 'react';
import SearchBox from './SearchBox';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';

class App extends React.Component {
  
  render() {
    return (
      <div className="App">
        <SearchBox />
        <div className="WeatherBox">
          <div id="current-day">
            <CurrentWeather />  
          </div>
          <ul>
            <Forecast />
          </ul>
			  </div>
      </div>
    );
  }

}

export default App;
