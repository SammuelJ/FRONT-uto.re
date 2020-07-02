import React, { Component } from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            shortUrl: {},
            message: ["Link not found"],
        };
    }
    handleChange = (event) => {
        this.setState({ value: event.target.value });
    };

    handleSubmit = (event) => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ longUrl: this.state.value }),
        };
        console.log(requestOptions);
        fetch("https://utore.herokuapp.com/", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.setState({ shortUrl: data });
            });
        event.preventDefault();
    };
    render() {
        const urlParams = new URLSearchParams(window.location.search);
        const message = urlParams.get("m");
        console.log(message);
        return (
            <div>
                <h1>utore - URL Shortener</h1>
                <input
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                    placeholder={"Paste a long URL here"}
                />
                <button onClick={this.handleSubmit}>Shorten</button>
                <p>
                    {this.state.shortUrl.shortId || this.state.shortUrl.error}
                </p>
                <p>{this.state.message[message]}</p>
            </div>
        );
    }
}

export default App;
