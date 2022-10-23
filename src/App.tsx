import React, { FunctionComponent } from 'react';
import './App.css';
import catImg from '../public/assets/cat.jpg';
import { dateStr } from './test/date/printDate';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppProps {}

// @ts-ignore: webpack definePlugin
const str = TEST_STR;
// @ts-ignore: webpack providePlugin
const id = _.uniqueId('test');
const App: FunctionComponent<AppProps> = () => {
  return (
    <div>
      <h1 className='case'>Hello World</h1>
      <p>
        {str} {id} {dateStr}
      </p>
      <img src={catImg} />
    </div>
  );
};

export default App;
