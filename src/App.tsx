import React from 'react';
import './App.css';
import { Form } from './components/Form/Form';
import { TextInput } from './components/TextInput/TextInput';

function App() {
  return (
    <div className="App">
      <TextInput/>
      <Form/>
    </div>
  );
}

export default App;
