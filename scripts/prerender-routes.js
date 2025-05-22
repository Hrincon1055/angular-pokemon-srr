const fs = require("fs");
const TOTAL_POKEMONS = 151;
const TOTAL_PAGE = 5;
(async () => {
  const pokemonIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
  let fileContet = pokemonIds.map((id) => `/pokemon/${id}`).join("\n");

  const pokemonsNameList = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`
  ).then((res) => res.json());
  fileContet += "\n";
  fileContet += pokemonsNameList.results
    .map((pokemon) => `/pokemon/${pokemon.name}`)
    .join("\n");
  for (let index = 0; index < TOTAL_PAGE; index++) {
    fileContet += `\n/pokemons/page/${index + 1}`;
  }

  fs.writeFileSync("routes.txt", fileContet);
  console.log("Routes.txt Generated");
})();
