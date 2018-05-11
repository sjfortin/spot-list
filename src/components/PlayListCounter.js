import React, { Component } from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

export default class PlayListCounter extends Component {
  render() {
    return (
      <div>
        <Title>{this.props.playlists.length} playlists</Title>
      </div>
    );
  }
}
