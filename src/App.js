import React from 'react';
import SearchBox from './SearchBox';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      userCity: 'Seattle'
    }
  }

  inputCallback = (dataFromChild) => {
    this.setState(prevState => {
      return {
        userCity: dataFromChild
      }
    }) 
  }
  
  render() {
    return (
      <div className="App">
        <SearchBox callbackFromParent={this.inputCallback} />
        <div className="WeatherBox">
          <div id="current-day">
            <CurrentWeather cityNameFromParent={this.state.userCity} />  
          </div>
          <ul>
            <Forecast cityNameFromParent={this.state.userCity} />
          </ul>
			  </div>
      </div>
    );
  }

}

export default App;
