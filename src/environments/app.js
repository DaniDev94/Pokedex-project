window.onload = function () {
  init();
};

let allPoke = [];
const init = async () => {
  try {
    const allPokes = await getPokemons();
    // console.log(allPoke);
    allPoke = mappedPoke(allPokes.results);
    // console.log(allPoke);
    addEvents();
  } catch (err) {
    console.log(err);
  }
};

const getPokemons = async () => {
  try {
    const resultPoke = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const resultToJson = await resultPoke.json();
    // console.log(resultToJson.results);
    return resultToJson;
  } catch (err) {
    console.log(err);
  }
};

const mappedPoke = (pokemons) => {
  const pokeAfterMap = pokemons.map((pokemon, index) => {
    // console.log(pokemon)Todos los pokemons
    // console.log(index+1)Id de cada pokemon mas uno por que empieza en cero.
    return {
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        index + 1
      }.png`,
      name: pokemon.name,
      id: index + 1,
    };
  });
  return pokeAfterMap;
};

const addEvents = () => {
  const $$btn = document.querySelector("#btnSearch");
  $$btn.addEventListener("click", infoSearch);
};

const infoSearch = () => {
  const $$input = document.querySelector("#search");
  // let result = $$input.value
  // console.log(result) Resultado del input
  paintPokemon(findPokemons($$input.value));
};

const findPokemons = (data) => {
  // console.log(data) Resultado del input
  //  console.log("Estoy dentro", allPokes);
  const filterPoke = allPoke.filter((pokemon) => {
    if (pokemon.name.toLowerCase().includes(data.toLowerCase())) {
      return pokemon;
    }
  });
  return filterPoke;
};
const paintPokemon = (arrayPoke) => {
  const $$ul = document.querySelector("#listPoke");
  $$ul.innerHTML = "";
  arrayPoke.forEach((poke) => {
    const $$li = document.createElement("li");
    $$li.innerHTML = `
        <div class='b-card'>
           <div class='b-img'>
            <img src='${poke.image}' class='b-img__image'>
           </div>
           <div class='b-container-name'>
            <h2 class='b-container-name__name'> ${poke.name}</h2>
           </div>
           <span class= 'b-card__id'>N: ${poke.id}</span>
        </div>`;
    $$ul.appendChild($$li);
  });
};
