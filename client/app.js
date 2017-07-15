import React from 'react';
import ReactDOM from 'react-dom';

import ChatContainer from './containers/ChatContainer';

window.onload = () => {
  ReactDOM.render(
    <ChatContainer />,
    document.getElementById('app')
  );
};