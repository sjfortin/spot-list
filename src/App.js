import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: '#202020'
};
let fakeServerData = {
  user: {
    name: 'Sam',
    playlists: [
      {
        name: 'My favorites',
        songs: [
          { name: 'Fire', duration: 1345 },
          { name: '288', duration: 1236 },
          { name: 'Eleanor Rigby', duration: 1234 }
        ]
      },
      {
        name: 'Discover Weekly',
        songs: [
          { name: 'The sun', duration: 1345 },
          { name: 'Where were you?', duration: 1236 },
          { name: 'Memoriez', duration: 876 }
        ]
      }
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{ ...defaultStyle, width: '40%', display: 'inline-block' }}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs);
    }, []);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration;
    }, 0);
    return (
      <div style={{ ...defaultStyle, width: '40%', display: 'inline-block' }}>
        <h2>{Math.round(totalDuration / 60)} hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <input style={{padding: '5px', borderRadius: '5px', outline: 'none'}} placeholder="Search playlists" type="text" onKeyUp={event => this.props.onTextChange(event.target.value)} />
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    return (
      <div style={{ ...defaultStyle, display: 'inline-block', width: '25%', border: '1px solid #202020', borderRadius: '6px', margin: '10px', padding: '10px' }}>
        <h3>{playlist.name}</h3>
        <ul style={{ ...defaultStyle, listStyleType: 'none', padding: '0'}}>{playlist.songs.map(song => <li>{song.name}</li>)}</ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ''
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ serverData: fakeServerData });
    }, 1000);
  }
  render() {
    let playlistToRender = this.state.serverData.user
      ? this.state.serverData.user.playlists.filter(playlist =>
          playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())
        )
      : [];
    return (
      <div className="App">
        {this.state.serverData.user ? (
          <div>
            <h1 style={{ ...defaultStyle, 'font-size': '18px' }}>{this.state.serverData.user.name}'s Playlists</h1>
            <PlaylistCounter playlists={playlistToRender} />
            <HoursCounter playlists={playlistToRender} />
            <Filter
              onTextChange={text => {
                this.setState({ filterString: text });
              }}
            />
            {playlistToRender.map(playlist => <Playlist playlist={playlist} />)}
          </div>
        ) : (
          <h1 style={defaultStyle}>Loading...</h1>
        )}
      </div>
    );
  }
}

export default App;
