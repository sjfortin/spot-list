import React, { Component } from 'react';

export default class Playlists extends Component {
  render() {
    let playlist = this.props.playlist;
    return (
      <div
        style={{
          display: 'inline-block',
          width: '25%',
          border: '1px solid #202020',
          borderRadius: '6px',
          margin: '10px',
          padding: '10px'
        }}
      >
        <h3>{playlist.name}</h3>
        <ul style={{ listStyleType: 'none', padding: '0' }}>{playlist.songs.map(song => <li>{song.name}</li>)}</ul>
      </div>
    );
  }
}
