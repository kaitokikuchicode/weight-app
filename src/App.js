import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weight_input: "",
      weight_list: []
    };
  }
  //It doesn't work
  /*componentDidMount() {
    const local_list = [];
    local_list = localStorage.getItem("local_list");
    if (local_list !== null) {
      local_list.split(",");
      this.setState({
        weight_list: local_list.toString()
      });
    }

    window.addEventListener("beforeunload", () => {
      localStorage.setItem("local_list", this.state.weight_list);
    });
  }*/

  render() {
    return (
      <div>
        <h2>Your Weight</h2>
        <input onChange={this.input_weight} value={this.state.weight_input} />
        <br />
        <button onClick={this.click_button}>submit</button>
        <br />
        <div>
          {this.state.weight_list.map((list, index) => (
            <li key={index}>
              {list}
              <button onClick={() => this.delete(index)}>delete</button>
            </li>
          ))}
        </div>
      </div>
    );
  }
  input_weight = e => {
    this.setState({
      weight_input: e.target.value
    });
  };

  click_button = () => {
    const y = new Date().getFullYear();
    const m = new Date().getMonth() + 1;
    const d = new Date().getDate();
    const date = y + "/" + m + "/" + d;

    this.setState(state => ({
      weight_list: [...state.weight_list, state.weight_input + " kg " + date],
      weight_input: ""
    }));
  };

  delete = index => {
    this.setState(state => {
      const weight_list = [...state.weight_list];
      weight_list.splice(index, 1);
      return {
        weight_list: weight_list
      };
    });
  };
}

export default App;
