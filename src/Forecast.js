import React from 'react';

const baseApiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
const baseIconPath = 'http://openweathermap.org/img/w/';
const _appId = '54c0f6b126e1f9bb89e6249bad4dc7e5';
const _units = 'imperial';


export default class Forecast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            date: undefined,
            icon: undefined,
            tempHigh: undefined, // highest forecast temp
            tempLow: undefined, // lowest forecast temp
            description: undefined,
            _city: this.props.cityNameFromParent
        }
    }
    componentDidMount() {
        const connectString = `${baseApiUrl}?q=${this.state._city}&units=${_units}&appid=${_appId}`;
        
        fetch(connectString)
            .then(response => response.json())
            .then( data => {
                this.setState({
                    date: new Date(data.list[0].dt_txt.replace(' ','T') + 'Z'),
                    icon: data.list[0].weather[0].icon,
                    tempHigh: data.list[0].main.temp_max,
                    tempLow: data.list[0].main.temp_min,
                    description: data.list[0].weather[0].description
                });
            })
            .catch(error => {
                this.setState({
                    hasError: true
                });
            });
    }
    render() {
        const iconPath = `${baseIconPath}${this.state.icon}.png`;
        const monthDay = new Intl.DateTimeFormat('en-US', {month: 'short', day: 'numeric'}).format(this.state.date);
        return (
            <li>
                <h2>{monthDay} </h2>
                <img src={iconPath} alt={this.state.description} />
                <h3>{Math.round(this.state.tempHigh).toString()}</h3>
                <p>{Math.round(this.state.tempLow).toString()}</p>
            </li>
        );
    }
}