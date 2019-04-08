import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weight_input: "",
      weight_list: { weight: "", date: "" },
      weight_lists: []
    };
  }

  componentDidMount() {
    const local_lists = JSON.parse(localStorage.getItem("local_list"));

    if (local_lists !== null) {
      this.setState({
        weight_lists: local_lists
      });
    }

    window.addEventListener("beforeunload", () => {
      localStorage.setItem(
        "local_list",
        JSON.stringify(this.state.weight_lists)
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Your Weight</h2>
        <input onChange={this.input_weight} value={this.state.weight_input} />
        <br />
        <button onClick={this.click_button}>submit</button>
        <br />
        <div>
          {this.state.weight_lists.map((list, index) => (
            <li key={index}>
              {list.weight}kg {list.date}
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
    const h = new Date().getHours();
    const min = new Date().getMinutes();
    const date = y + "/" + m + "/" + d + " " + h + ":" + min;

    this.setState(state => ({
      weight_lists: [
        ...state.weight_lists,
        { weight: state.weight_input, date: date }
      ],
      weight_input: ""
    }));
  };

  delete = index => {
    this.setState(state => {
      const weight_lists = [...state.weight_lists];
      weight_lists.splice(index, 1);
      return {
        weight_lists: weight_lists
      };
    });
  };
}

export default App;
