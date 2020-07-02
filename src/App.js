import React, { Component } from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleSubmit = (params) => console.log(params);
    render() {
        return (
            <div>
                <form>
                    <label htmlFor="longUrl">Url</label>
                    <input type="text" name="longUrl" id="longUrl" />
                    <button onClick={this.handleSubmit}>Create</button>
                </form>
            </div>
        );
    }
}

export default App;
