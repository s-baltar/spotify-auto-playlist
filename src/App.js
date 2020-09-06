import React from 'react';
import logo from './logo.svg';
import './App.css';
import queryString from 'query-string';

class App extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if (!accessToken) 
      return;

    fetch('https://api.spotify.com/v1/me', 
          { headers: {'Authorization': 'Bearer ' + accessToken} }).then( 
            (response) => response.json() ).then(
              data => this.setState({
                user: {
                  name: data.display_name
                }
              }))
  }

  render() {
    return (
      <div className="App">
        {this.state.user ?
        <div>
        {this.state.user.name}
        </div> : <button onClick={() => {
            window.location = window.location.href.includes("localhost")
              ? 'http://localhost:8888/login'
              : 'https://auto-playlist-backend.herokuapp.com/login'
              }
            }>Login with Spotify</button>
        }

      </div>
    );
  }
}


export default App;
