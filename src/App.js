import React, { Component } from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            shortUrl: {},
            message: ["Link not found"],
            shortedLink: "",
        };
    }
    handleChange = (event) => {
        this.setState({ value: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ longUrl: this.state.value }),
        };
        let request = await fetch(
            "https://utore.herokuapp.com/",
            requestOptions
        );
        request = await request.json();
        this.setState({
            shortUrl: request,
        });
        if (request.shortId) {
            this.setState({
                shortedLink: "https://uto.re/" + request.shortId,
            });
        }
    };
    componentDidUpdate() {
        console.log(this.state);
    }
    render() {
        const urlParams = new URLSearchParams(window.location.search);
        const message = urlParams.get("m");
        return (
            <div id="main">
                <h1>utore - URL Shortener</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                        placeholder={"Paste a long URL here"}
                    />
                    <button onClick={this.handleSubmit}>Shorten</button>
                </form>
                <p id="message">
                    {this.state.message[message] || this.state.shortUrl.error || (
                        <a
                            href={this.state.shortedLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {this.state.shortedLink}
                        </a>
                    )}
                </p>
            </div>
        );
    }
}

export default App;
