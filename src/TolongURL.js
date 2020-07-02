import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class TolongURL extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "undefined",
        };
    }
    componentWillMount() {
        const slug = window.location.pathname.substr(1);
        fetch("https://utore.herokuapp.com/" + slug)
            .then((response) => response.json())
            .then((data) => {
                if (data.url) {
                    window.location.href = data.url;
                }
            });
    }
    render() {
        return <Redirect to={{ pathname: "/", search: "?m=0" }} />;
    }
}

export default TolongURL;
