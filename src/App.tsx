import React, { FunctionComponent } from 'react';
import './App.css';
import catImg from '../public/assets/cat.jpg';

interface AppProps {}

const App: FunctionComponent<AppProps> = () => {
  return (
    <div>
      <h1 className='case'>Hello World 1</h1>
      <img src={catImg} />
    </div>
  );
};

export default App;
