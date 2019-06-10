import React from 'react';

const baseApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const _appId = '54c0f6b126e1f9bb89e6249bad4dc7e5';
const _units = 'imperial';

export default class CurrentWeather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            temperature: undefined,
            humidity: undefined,
            description: undefined,
            city: undefined,
            _city: this.props.cityNameFromParent
        }
    }
    componentDidMount() {
        const connectString = `${baseApiUrl}?q=${this.state._city}&units=${_units}&appid=${_appId}`;

        fetch(connectString)
            .then(response => response.json())
            .then( data => {
                this.setState({
                    temperature: data.main.temp,
                    description: data.weather[0].description,
                    humidity: data.main.humidity,
                    city: data.name
                });
            })
            .catch(error => {
                this.setState({
                    hasError: true
                });
            });
    }
    render() {
        console.log('CurrWeather props: ', this.props);

        return(
            <section className="CurrentWeather">
                <h1 id="current-temp">{Math.round(this.state.temperature).toString()}</h1>
                <span>&deg;</span>
                <div>
                    <p id="temperature-type">F</p>
                    <p id="current-condition">{this.state.description}</p>
                    <p id="current-humidity">{this.state.humidity}% Humidity</p>
                    <p>{this.state.city}</p>			
                </div>
            </section>
        );
    }
}