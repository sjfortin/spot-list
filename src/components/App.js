import React, { Component } from 'react';
import queryString from 'query-string';
import '../App.css';

import HoursCounter from './HoursCounter';
import Playlists from './PlayLists';
import Filter from './Filter';
import PlaylistCounter from './PlayListCounter';

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ''
    };
  }
  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    fetch('https://api.spotify.com/v1/me/', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    }).then(response =>
      response.json().then(data => {
        console.log(data);
        this.setState({
          user: {
            name: data.id
          }
        });
      })
    );
  }
  render() {
    let playlistToRender = this.state.serverData.user
      ? this.state.serverData.user.playlists.filter(playlist =>
          playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())
        )
      : [];
    return (
      <div className="App">
        {this.state.user ? (
          <div>
            <h1 style={{ fontSize: '18px' }}>Playlists</h1>
            <PlaylistCounter playlists={playlistToRender} />
            <HoursCounter playlists={playlistToRender} />
            <Filter
              onTextChange={text => {
                this.setState({ filterString: text });
              }}
            />
            {playlistToRender.map(playlist => <Playlists playlist={playlist} />)}
          </div>
        ) : (
          <div style={{ margin: '20px' }}>
            <h1>Login to spot-list</h1>
            <button onClick={() => (window.location = 'http://localhost:8888/login')}>Sign in with Spotify</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
