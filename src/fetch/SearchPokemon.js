import React, { useEffect, useState } from 'react'
import Downshift from 'downshift';

const url = 'https://pokeapi.co/api/v2/pokemon'

export default function SearchPokemon() {
  const [input, setInput] = useState('');
  const [displayError, setDisplayError] = useState(null);
  const [pokemonNames, setPokemonNames] = useState({});
  const [pokemonData, setPokemonData] = useState({
    name: '',
    id: 0,
    sprite: '',
    weight: 0,
    types: []
  })

  useEffect(() => {
    async function getPokemonNames() {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1500`);
        if (res.ok) {
          setDisplayError(null)
          const rawData = await res.json();
          const names = rawData.results.map(pokemon => pokemon.name)
          // console.log(rawData);
          setPokemonNames(names)
          // console.log(names)
        } else {
          setDisplayError('Could not find Pokemon')
        }
      } catch (error) {
        console.log(error)
      }
    }
    getPokemonNames()
  }, [])

  async function fetchData(e) {
    e.preventDefault()
    try {
      const res = await fetch(`${url}/${input.toLowerCase()}`);
      if (res.ok) {
        setDisplayError(null)
        const rawData = await res.json();
        // console.log(rawData);
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
        <Downshift
          onChange={(selectedItem) => setInput(selectedItem)}
          inputValue={input}
          itemToString={(item) => (item ? item : '')}
        >
          {({
            getInputProps,
            getMenuProps,
            getItemProps,
            isOpen,
            inputValue: downshiftInputValue,
            selectedItem,
            highlightedIndex,
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search for a Pokemon',
                  value: input,
                  onChange: (e) => setInput(e.target.value),
                })}
                className='bg-slate-200 rounded-md border-2 border-slate-900'
              />
              <ul {...getMenuProps()} style={{ listStyle: 'none', padding: 0 }}>
                {isOpen &&
                  pokemonNames
                    .filter((item) =>
                      item.toLowerCase().includes(downshiftInputValue.toLowerCase())
                    ).slice(0, 10)
                    .map((item, index) => (
                      <li
                        {...getItemProps({
                          key: item,
                          index,
                          item,
                          style: {
                            backgroundColor:
                              highlightedIndex === index ? 'lightgray' : '#B6C1C1',
                            fontWeight: selectedItem === item ? 'bold' : 'normal',
                            color: '#777777'
                          },
                        })}
                      >
                        {item}
                      </li>
                    ))}
              </ul>
            </div>
          )}
        </Downshift>
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
              <li key={index}>Type {index + 1}: {value.type.name}</li>
            ))}
          </ul>
        </div>
      }
    </div>
  )
}
