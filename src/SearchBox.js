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
        this.props.callbackFromParent(this.state.newCity);
        console.log('! submitted !', this.state.newCity);
    }
    clearInput = (event) => {
        console.log('clicked clear');
        this.setState(prevState => {
            return {
                newCity: ''
            }
        })
        document.getElementById('city').value = '';
    }

    render() {
        console.log('Search props: ', this.props);

        return (
            <div className="SearchBox">
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.onChange} id="city" name="city" type="text" placeholder="Enter a city name" />
                    <button id="submit-city" type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
                    <button onChange={this.clearInput} id="clear-input" type="button"><i className="fa fa-times" aria-hidden="true"></i></button>
                </form>
			</div>
        );
    }
}