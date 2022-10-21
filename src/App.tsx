import React, { FunctionComponent } from 'react';
import './App.css';
import catImg from '../public/assets/cat.jpg';

interface AppProps {}

const str = process.env.TEST_STR;

const App: FunctionComponent<AppProps> = () => {
  return (
    <div>
      <h1 className='case'>{str}</h1>
      <img src={catImg} />
    </div>
  );
};

export default App;
