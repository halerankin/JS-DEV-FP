import React from 'react';

const baseApiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
const baseIconPath = 'http://openweathermap.org/img/w/';
const _appId = '54c0f6b126e1f9bb89e6249bad4dc7e5';
const _units = 'imperial';
let _forecasts = [];

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
        _forecasts = [];
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        _forecasts = [];

        if (this.props.cityNameFromParent !== prevProps.cityNameFromParent) {     
            this.fetchData();
        }
    }

    render() {
        let today = new Date().toISOString().substring(0,10);
        let prevDate = null;
        let currHigh = null;
        let currLow = null;
        let Description = null;
        let Icon = '04d';
        
        for (let i = 0; i < this.state.data.length; i++){            
            let currDate = this.state.data[i].dt_txt.substring(0, 10);

            //exclude records for current day. We only want next 5 days.
            if(currDate !== today) {
                if(currDate !== prevDate && prevDate !== null) {
                    _forecasts.push({
                        "date": new Date(this.state.data[i].dt_txt.replace(' ','T') + 'Z'),
                        "iconPath": `${baseIconPath}${Icon}.png`,
                        "tempLow": currLow,
                        "tempHigh": currHigh,
                        "description": Description
                    })
                    
                } else {
                    currLow = this.state.data[i].main.temp_min;
                    currHigh = this.state.data[i].main.temp_max;
                    Description = this.state.data[i].weather[0].description;          
                    Icon = this.state.data[i].weather[0].icon;
                    
                    console.log('temps: L '+currLow +',H '+ currHigh + ', date '+ this.state.data[i].dt_txt + ' -- '+ i + ', Max: '+ this.state.data[i].main.temp_max + ', Min: ' + this.state.data[i].main.temp_min + ', Desc: ' + this.state.data[i].weather[0].description);
                    
                    // Update min/max temp
                    if( this.state.data[i].main.temp_min < currLow) {
                        currLow = this.state.datalist[i].main.temp_min;
                    }                            
                    if( this.state.data[i].main.temp_max > currHigh) {
                        currHigh = this.state.data[i].main.temp_max;
                    }                              

                }                                
                prevDate = currDate; 
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