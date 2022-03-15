import React from 'react';
import './App.css';
import Comments from './component/comments';

function App() {
  return (
    <div>
      <h1>Simple Comments</h1>
      <Comments currentUserId='1'/>
    </div>
  );
}

export default App;
