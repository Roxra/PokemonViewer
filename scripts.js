const url = "https://pokeapi.co/api/v2/pokemon/";
var numberOfPokemon;

var pokemon = 
[
{
	id: 0,
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

$(function() 
{
var html = '<div class = row>'

for(var i=0; i<= 19; i++){
 html+=  '<div class="col-md-2"><div class="thumbnail"><img src="" alt = "Pokemon" id = "Image'+ i + '" class="img-fluid"><div class="caption" id = ' + i + '><p class="Big" id = "Name0">Pokemon</p><p class="Small">Type</p>'
 html+=  '<p class="Small">BaseHP</p>'
 html+=  '<p class="Small">BaseAttack</p>'
 html+=  '<p class="Small">BaseDefence</p>'
 html+=  '<p class="Small">SpecialAttack</p>'
 html+=  '<p class="Small">SpecialDefence</p>'
 html+=  '<p class="Small">Speed</p>'
 // html+=  '<div class="progress pull-right"> <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:70%">  prog%</div></div>'
 html+=  '<button type="button" class="btn btn-primary btn-lg btn-block" onClick="favouritePokemon(' + i + ');"> Favourite? </button>';
 html+=  '<button type="button" class="btn btn-primary btn-lg btn-block" onClick="addToCompare(' + i + ');"> Compare? </button>	</div></a></div></div>';
}

$('#container').append(html);
});

fetch(url).then((response) => response.json()).then(function(data)
{
	for (let i = 0; i < data.results.length; i++) //change to length of array later <--
	{
		pokemon.push(new Object());
		console.log(data.results);
		console.log(pokemon);
		document.getElementById(i).children[0].textContent = data.results[i].name;
		pokemon[i].name = data.results[i].name;
		pokemon[i].id = i;
		numberOfPokemon = data.results.length;
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
		document.getElementById(iter).children[2].textContent = "HP: " +  data.stats[5].base_stat;
		pokemon[iter].hp = data.stats[5].base_stat;
		document.getElementById(iter).children[3].textContent = "Attack: " +  data.stats[4].base_stat;
		pokemon[iter].attack = data.stats[4].base_stat;
		document.getElementById(iter).children[4].textContent = "Defence: " +  data.stats[3].base_stat;
		pokemon[iter].defence = data.stats[3].base_stat;
		document.getElementById(iter).children[5].textContent = "Special Attack: " +  data.stats[2].base_stat;
		pokemon[iter].SPAttack = data.stats[2].base_stat;
		document.getElementById(iter).children[6].textContent = "Special Defence: " +  data.stats[1].base_stat;
		pokemon[iter].SPDefence = data.stats[1].base_stat;
		document.getElementById(iter).children[7].textContent = "Speed: " +  data.stats[0].base_stat;
		pokemon[iter].speed = data.stats[0].base_stat;
		if (data.types[1] != null)
		{
			document.getElementById(iter).children[1].textContent = data.types[0].type.name + " - " + data.types[1].type.name;
			pokemon[iter].type = data.types[0].type.name + data.types[1].type.name;
		}
	});
}

function favouritePokemon(id)
{
	console.log(id);
	if (pokemon[id].favourite)
	{
		pokemon[id].favourite = false;
		document.getElementById(id).parentElement.classList.remove("Fave");
	}
	else
	{
		pokemon[id].favourite = true;
		document.getElementById(id).parentElement.classList.add("Fave");
	}
}

function addToCompare(id)
{
	if (pokemon[id].comparing)
	{
		pokemon[id].comparing = false;
		document.getElementById(id).parentElement.classList.remove("Compare");
	}
	else
	{
		let numComparing = 0;
		for(let i = 0; i < numberOfPokemon; i++)
		{
			if (pokemon[i].comparing)
			{
				numComparing++;
			}
		}
		if (numComparing > 1)
		{
			return;
		}
		pokemon[id].comparing = true;
		document.getElementById(id).parentElement.classList.add("Compare");
	}
	for(let i = 0; i < numberOfPokemon; i++)
	{
		if (pokemon[i].comparing && i != id)
		{
			comparePokemon(id,i)
		}
	}
}

function comparePokemon(id, id2)
{
	console.log("Compare");
	if (pokemon[id].hp > pokemon[id2].hp)
	{
		console.log(pokemon[id].name);		
	}
	else if (pokemon[id].hp == pokemon[id2].hp)
	{
		console.log("They are equal in this stat");	
	}
	else
	{
		console.log(pokemon[id2].name)
	}
	if (pokemon[id].attack > pokemon[id2].attack)
	{
		console.log(pokemon[id].name);		
	}
	else if (pokemon[id].attack == pokemon[id2].attack)
	{
		console.log("They are equal in this stat");	
	}
	else
	{
		console.log(pokemon[id2].name)
	}
	if (pokemon[id].defence > pokemon[id2].defence)
	{
		console.log(pokemon[id].name);		
	}
	else if (pokemon[id].defence == pokemon[id2].defence)
	{
		console.log("They are equal in this stat");	
	}
	else
	{
		console.log(pokemon[id2].name)
	}
	if (pokemon[id].SPAttack > pokemon[id2].SPAttack)
	{
		console.log(pokemon[id].name);		
	}
	else if (pokemon[id].SPAttack == pokemon[id2].SPAttack)
	{
		console.log("They are equal in this stat");	
	}
	else
	{
		console.log(pokemon[id2].name)
	}
	if (pokemon[id].SPDefence > pokemon[id2].SPDefence)
	{
		console.log(pokemon[id].name);		
	}
	else if (pokemon[id].SPDefence == pokemon[id2].SPDefence)
	{
		console.log("They are equal in this stat");	
	}
	else
	{
		console.log(pokemon[id2].name)
	}
	if (pokemon[id].speed > pokemon[id2].speed)
	{
		console.log(pokemon[id].name);		
	}
	else if (pokemon[id].speed == pokemon[id2].speed)
	{
		console.log("They are equal in this stat");	
	}
	else
	{
		console.log(pokemon[id2].name)
	}
}