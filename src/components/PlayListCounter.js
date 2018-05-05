import React, { Component } from 'react';

export default class PlayListCounter extends Component {
  render() {
    return (
      <div style={{ width: '40%', display: 'inline-block' }}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}
