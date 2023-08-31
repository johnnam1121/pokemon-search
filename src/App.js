import React from 'react';
import './App.css';
import SearchPokemon from './fetch/SearchPokemon';

function App() {
  return (
    <div className='bg-slate-700 absolute h-full w-full'>
      <div className='p-3'>
        <h1 className='text-slate-300'>Pokemon Search App</h1>
        <SearchPokemon />
      </div>
    </div>

  );
}

export default App;
