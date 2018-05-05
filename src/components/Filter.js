import React, { Component } from 'react';

export default class Filter extends Component {
  render() {
    return (
      <div>
        <input
          style={{ padding: '5px', borderRadius: '5px', outline: 'none' }}
          placeholder="Search playlists"
          type="text"
          onKeyUp={event => this.props.onTextChange(event.target.value)}
        />
      </div>
    );
  }
}
