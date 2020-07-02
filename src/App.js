import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search);
        const message = urlParams.get("m");
        if (message === "0") {
            toast.error("😱 This link doesn't exist !", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    render() {
        return (
            <div id="main">
                <ToastContainer />
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
                    {this.state.shortUrl.error || (
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
