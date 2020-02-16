const url = "https://pokeapi.co/api/v2/pokemon/";

var pokemon = 
[
{
	name: "Pokemon",
	type: "Type",
	hp: 0,
	attack: 0,
	defence: 0,
	SPAttack: 0,
	SPDefence: 0,
	speed: 0,
	favourite: false
}
];

fetch(url).then((response) => response.json()).then(function(data)
{
	for (let i = 0; i < 4; i++) //change to length of array later <--
	{
		pokemon.push(new Object());
		console.log(data.results);
		console.log(pokemon);
		document.getElementById(i).children[0].textContent = data.results[i].name;
		pokemon[i].name = data.results[i].name;
		readPokemonInfo(data.results[i].url, i);
	}
});

function readPokemonInfo(Pokeurl, iter)
{
	fetch(Pokeurl).then((response) => response.json()).then(function(data)
	{
		console.log(data);
		document.getElementById("Image" + iter).src = data.sprites.front_default;
		document.getElementById(iter).children[1].textContent = data.types[0].type.name;
		pokemon[iter].type = data.types[0].type.name;
		document.getElementById(iter).children[2].textContent = "HP = " +  data.stats[5].base_stat;
		pokemon[iter].hp = data.stats[5].base_stat;
		document.getElementById(iter).children[3].textContent = "Attack = " +  data.stats[4].base_stat;
		pokemon[iter].attack = data.stats[4].base_stat;
		document.getElementById(iter).children[4].textContent = "Defence = " +  data.stats[3].base_stat;
		pokemon[iter].defence = data.stats[3].base_stat;
		document.getElementById(iter).children[5].textContent = "Special Attack = " +  data.stats[2].base_stat;
		pokemon[iter].SPAttack = data.stats[2].base_stat;
		document.getElementById(iter).children[6].textContent = "Special Defence = " +  data.stats[1].base_stat;
		pokemon[iter].SPDefence = data.stats[1].base_stat;
		document.getElementById(iter).children[7].textContent = "Speed = " +  data.stats[0].base_stat;
		pokemon[iter].speed = data.stats[0].base_stat;
		if (data.types[1] != null)
		{
			document.getElementById(iter).children[1].textContent = data.types[0].type.name + " - " + data.types[1].type.name;
			pokemon[iter].type = data.types[0].type.name + data.types[1].type.name;
		}
	});
}