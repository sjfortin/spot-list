import React, { Component } from 'react';
import queryString from 'query-string';
import '../App.css';
import styled from 'styled-components';

import HoursCounter from './HoursCounter';
import Playlists from './PlayLists';
import Filter from './Filter';
import PlaylistCounter from './PlayListCounter';

const Title = styled.h1`
  font-size: 1.5em;
  color: ${props => (props.primary ? 'blue' : 'darkblue')};
`;

const Button = styled.button`
  background: #202020;
  border-radius: 6px;
  padding: 1em 2em;
  color: #fff;
  display: inline-block;
  margin: 1em;
  cursor: pointer;
  &:hover {
    background: darkblue;
  }
`;

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
    if (!accessToken) {
      return;
    }
    fetch('https://api.spotify.com/v1/me/', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    }).then(response =>
      response.json().then(data => {
        console.log('me', data);
        this.setState({
          user: {
            name: data.id
          }
        });
      })
    );
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })
      .then(response =>
        response.json().then(data => {
          console.log('playlists', data);
          this.setState({
            playlists: data.items.map(item => ({
              name: item.name,
              imgUrl: item.images[0].url,
              songs: []
            }))
          });
        })
      )
      .catch(error => console.error(error));
  }
  render() {
    let playlistToRender =
      this.state.user && this.state.playlists
        ? this.state.playlists.filter(playlist =>
            playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())
          )
        : [];
    return (
      <div className="App">
        {this.state.user ? (
          <div>
            <Title primary>Playlists</Title>
            <PlaylistCounter playlists={playlistToRender} />
            <HoursCounter playlists={playlistToRender} />
            <Filter
              onTextChange={text => {
                this.setState({ filterString: text });
              }}
            />
            {playlistToRender.map((playlist, index) => <Playlists key={index} playlist={playlist} />)}
          </div>
        ) : (
          <div>
            <Title>Login to spot-list</Title>
            <Button
              onClick={() => {
                window.location = window.location.href.includes('localhost')
                  ? 'http://localhost:8888/login'
                   : 'https://spot-list.herokuapp.com/login';
              }}
            >
              Sign in with Spotify
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
