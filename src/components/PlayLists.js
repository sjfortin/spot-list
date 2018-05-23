import React, { Component } from 'react';

export default class Playlists extends Component {
  render() {
    let playlist = this.props.playlist;
    let playlistImg = {
      width: '100%'
    }
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
        <img src={playlist.imgUrl} alt={playlist.name} style={playlistImg} />
        <h3>{playlist.name}</h3>
        <ul style={{ listStyleType: 'none', padding: '0' }}>{playlist.songs.map(song => <li>{song.name}</li>)}</ul>
      </div>
    );
  }
}
