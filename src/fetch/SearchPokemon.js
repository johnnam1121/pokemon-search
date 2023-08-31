import React, { useState } from 'react'

const url = 'https://pokeapi.co/api/v2/pokemon'

export default function SearchPokemon() {
  const [input, setInput] = useState('');
  const [displayError, setDisplayError] = useState(null);
  const [pokemonData, setPokemonData] = useState({
    name: '',
    id: 0,
    sprite: '',
    weight: 0,
    types: []
  })

  async function fetchData(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${url}/${input.toLowerCase()}`);
      if (res.ok) {
        setDisplayError(null)
        const rawData = await res.json();
        console.log(rawData);
        setPokemonData({
          name: rawData.name,
          id: rawData.id,
          sprite: rawData.sprites.front_default,
          weight: rawData.weight,
          types: rawData.types,
        })
      } else {
        setDisplayError('Could not find Pokemon')
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <form onSubmit={fetchData} className='mt-3'>
        <input value={input} onChange={(e) => { setInput(e.target.value) }} type='text' placeholder='Bulbasaur' className='bg-slate-600 text-slate-200 border-2 rounded-md p-1' />
        <button className='block mt-2 border-2 py-1 px-2 text-slate-200 rounded-lg'>Search</button>
      </form>
      {pokemonData.id === 0 ?
        <h1 className='text-slate-200 mt-2'>
          {displayError ? displayError : 'searching for ' + input + '...'}
        </h1>
        :
        <div>
          <h1 className='text-slate-200 mt-2'>
            Name: {pokemonData.name}<br />
            ID: {pokemonData.id}<br />
            Weight: {pokemonData.weight}<br />
          </h1>
          <img src={pokemonData.sprite} alt={pokemonData.name} />
          <ul className='text-slate-200 mt-2'>
            {pokemonData.types.map((value, index) => (
              <li key={index}>Type {index+1}: {value.type.name}</li>
            ))}
          </ul>
        </div>
      }
    </div>
  )
}
