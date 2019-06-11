import React from 'react';

export default class SearchBox extends React.Component {
    constructor(){
        super()
        this.state = {
            newCity: ''
        };
    }

    onChange = (event) => {
        const newCityValue = event.target.value;
        this.setState(prevState => {
            return {
                newCity: newCityValue
            }
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(document.getElementById('city').value !== ''){
            this.props.callbackFromParent(this.state.newCity);
        }
    }

    clearInput = (event) => {
        document.getElementById('city').value = '';
        this.setState(prevState => {
            return {
                newCity: ''
            }
        })
    }

    render() {
        return (
            <div className="SearchBox">
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.onChange} id="city" name="city" type="text" placeholder="Enter a city name" />
                    <button id="submit-city" type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
                    <button onClick={this.clearInput} id="clear-input" type="button"><i className="fa fa-times" aria-hidden="true"></i></button>
                </form>
			</div>
        );
    }
}