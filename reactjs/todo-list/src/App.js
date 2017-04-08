import React from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'

const customAxios = axios.create({
    baseURL: API_BASE_URL
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {items: [], text: ''};
  }

  render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState((prevState) => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));

    this.submitItem(newItem)
  }

  submitItem(item) {

    console.log('Data to submit ..', item);
    const requestObject = {
        id: item.id,
        text: item.text
    }

   customAxios.post(`/todolist`, requestObject, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      console.log('Response ', response)
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount() {
   customAxios.get(`/todolist`)
   .then(response => {

    console.log(response.data.data)
    this.setState((prevState) => ({
      items: prevState.items.concat(response.data.data),
      text: ''
    }));
     
    }).catch(err => {
      console.log(err)
    })
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}