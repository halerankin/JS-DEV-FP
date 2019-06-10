import React from 'react';

const baseApiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
const baseIconPath = 'http://openweathermap.org/img/w/';
const _appId = '54c0f6b126e1f9bb89e6249bad4dc7e5';
const _units = 'imperial';
const _forecasts = [];

export default class Forecast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            data: []
        }
    }

    fetchData() {
        const connectString = `${baseApiUrl}?q=${this.props.cityNameFromParent}&units=${_units}&appid=${_appId}`;
        fetch(connectString)
            .then(response => response.json())
            .then( data => {
                this.setState(prevState => {
                    return {
                        data: data.list
                    }
                })
            })
            .catch(error => {
                console.log('err ', error);
                this.setState({
                    hasError: true
                });
            });
    }
    
    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate(prevProps) {
        if (this.props.cityNameFromParent !== prevProps.cityNameFromParent) {
            this.fetchData();
        }
    }
    componentWillMount() {}

    render() {

        const counter = this.state.data.length;
        let today = new Date().toISOString().substring(0,10);
        let prevDatePart = null;
        let currHigh = null;
        let currLow = null;
        
        for (let i = 0; i < counter; i++){            
            
            let currDate = this.state.data[i].dt_txt.substring(0, 10);

            //exclude records for current day. We only want next 5 days.
            if(currDate !== today) {                        
                if(currDate === prevDatePart) {
                    currLow = this.state.data[i].main.temp_min;
                    currHigh = this.state.data[i].main.temp_max;
                    
                    if( this.state.data[i].main.temp_min < currLow) {
                        currLow = this.state.datalist[i].main.temp_min;
                    }                            
                    if( this.state.data[i].main.temp_max > currHigh) {
                        currHigh = this.state.data[i].main.temp_max;
                    }
                } else {
                    _forecasts.push({
                        "index": i,
                        "date": new Date(this.state.data[i].dt_txt.replace(' ','T') + 'Z'),
                        "iconPath": `${baseIconPath}${this.state.data[i].weather[0].icon}.png`,
                        "tempHigh": currHigh,
                        "tempLow": currLow,
                        "description": this.state.data[i].weather[0].description
                    })
                }                                
                prevDatePart = currDate; 
            }
        }

        const forecastDays = _forecasts.map((d, idx) => 
            <li key={idx}>
                <h2>{new Intl.DateTimeFormat('en-US', {month: 'short', day: 'numeric'}).format(d.date)}</h2>
                <img src={d.iconPath} alt={d.description} />
                <h3>{Math.round(d.tempHigh).toString()}</h3>
                <p>{Math.round(d.tempLow).toString()}</p>
            </li>
        );

        return (
            <ul>
                {forecastDays}
            </ul>
        );
    }
}