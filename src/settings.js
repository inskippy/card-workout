import React from 'react';

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert("submitted " + this.state.value);
        this.props.handleCardNumChange({newMaxCard: this.state.value,});
        event.preventDefault();
    }
    
    render() {
        return (

            <div>
                <p>Test settings page</p>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Number of Cards/Sets:
                        <input type="number" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }

}