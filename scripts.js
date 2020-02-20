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
	favourite: false,
	comparing: false
}
];

$(function() 
{
var html = ''

for(var i=0; i<= 19; i++){
 html+=  '<div class="col-md-2"><div class="thumbnail"><img src="" alt = "Pokemon" id = "Image'+ i + '" class="img-fluid"> <div class="caption" id = ' + i + '><p class="Big" id = "Name0">Pokemon</p><p class="Small">Type</p>'
 html+=  '<p class="Small">BaseHP</p>'
 html+=  '<p class="Small">BaseAttack</p>'
 html+=  '<p class="Small">BaseDefence</p>'
 html+=  '<p class="Small">SpecialAttack</p>'
 html+=  '<p class="Small">SpecialDefence</p>'
 html+=  '<p class="Small">Speed</p>'
 html+=  '  <div class = text-center>  <div class="btn-group btn-group-lg"> <button type="button" class="btn btn-primary" data-toggle="tooltip" title="Add to favourite Pokemon list!" onClick="favouritePokemon(' + i + ');"> Favourite? </button>';
 html+=  '<button type="button" class="btn btn-primary" data-toggle="tooltip" title="Compare two Pokemon!" onClick="addToCompare(' + i + ');"> Compare? </button> </div> </div>'
 html+= '</div></a></div></div>';
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
		document.getElementById('List' + id).remove();
	}
	else
	{
		pokemon[id].favourite = true;
		document.getElementById(id).parentElement.classList.add("Fave");
		var html = '<li class="list-group-item list-group-item-warning" id = "List'+ id + '" >' + pokemon[id].name + '</li>'
		$('#FavouriteList').append(html);
	}
}

function addToCompare(id)
{
	let numComparing = 0;
	if (pokemon[id].comparing)
	{
		pokemon[id].comparing = false;
		document.getElementById(id).parentElement.classList.remove("Compare");
		$('.StatsComparison').remove();
		for(let i = 0; i < numberOfPokemon; i++)
		{
			if (pokemon[i].comparing)
			{
				document.getElementById(i).parentElement.classList.add("Compare");
				var html = '<li class="list-group-item list-group-item-success" id = "Compare'+ i + '" >' + pokemon[i].name + '</li>'
		     	$('#ComparingList').append(html);
			}
		}
		document.getElementById('Compare' + id).remove();
	}
	else
	{
		numComparing = 0;
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
		var html = '<li class="list-group-item list-group-item-success" id = "Compare'+ id + '" >' + pokemon[id].name + '</li>'
		$('#ComparingList').append(html);
	}
	for(let i = 0; i < numberOfPokemon; i++)
	{
		if (pokemon[i].comparing && i != id && numComparing === 1)
		{
			comparePokemon(id,i)
		}
	}
}

function comparePokemon(id, id2)
{
	document.getElementById('Compare' + id).remove();
	document.getElementById('Compare' + id2).remove();
	console.log("Compare");
	var html = '<p class = "Small text-center StatsComparison">' + pokemon[id].name + ' VS ' + pokemon[id2].name + '</p>'
	$('#ComparingList').append(html);
	var html = '<li class="list-group-item list-group-item-success text-center StatsComparison">' + pokemon[id].hp + ' HP | ' + pokemon[id2].hp + ' HP ' + '</li>'
	$('#ComparingList').append(html);
	var html = '<li class="list-group-item list-group-item-success text-center StatsComparison">' + pokemon[id].attack + ' Attack | ' + pokemon[id2].attack + ' Attack ' + '</li>'
	$('#ComparingList').append(html);
	var html = '<li class="list-group-item list-group-item-success text-center StatsComparison">' + pokemon[id].defence + ' Defence | ' + pokemon[id2].defence + ' defence ' + '</li>'
	$('#ComparingList').append(html);
	var html = '<li class="list-group-item list-group-item-success text-center StatsComparison">' + pokemon[id].SPAttack + ' Special Attack | ' + pokemon[id2].SPAttack + ' Special Attack ' + '</li>'
	$('#ComparingList').append(html);
	var html = '<li class="list-group-item list-group-item-success text-center StatsComparison">' + pokemon[id].SPDefence + ' Special Defence | ' + pokemon[id2].SPDefence + ' Special Defence ' + '</li>'
	$('#ComparingList').append(html);
	var html = '<li class="list-group-item list-group-item-success text-center StatsComparison">' + pokemon[id].speed + ' Speed | ' + pokemon[id2].speed + ' Speed ' + '</li>'
	$('#ComparingList').append(html);
	if (pokemon[id].hp > pokemon[id2].hp)
	{
		var html = '<li class="list-group-item list-group-item-success text-center StatsComparison"> <strong> ' + pokemon[id].name + ' </strong> wins for HP ' + '</li>'
		$('#ComparingList').append(html);
	}
	else if (pokemon[id].hp == pokemon[id2].hp)
	{
		var html = '<li class="list-group-item list-group-item-success text-center StatsComparison">' + ' They are equal for HP ' + '</li>'
		$('#ComparingList').append(html);
	}
	else
	{
		var html = '<li class="list-group-item list-group-item-success text-center StatsComparison"> <strong>' + pokemon[id2].name + ' </strong> wins for HP ' + '</li>'
		$('#ComparingList').append(html);
	}
	if (pokemon[id].attack > pokemon[id2].attack)
	{
		var html = '<li class="list-group-item list-group-item-success text-center StatsComparison"> <strong>' + pokemon[id].name + '</strong> wins for attack ' + '</li>'
		$('#ComparingList').append(html);
	}
	else if (pokemon[id].attack == pokemon[id2].attack)
	{
		var html = '<li class="list-group-item list-group-item-success text-center StatsComparison">' + ' They are equal for attack ' + '</li>'
		$('#ComparingList').append(html);
	}
	else
	{
		var html = '<li class="list-group-item list-group-item-success text-center StatsComparison"> <strong>' + pokemon[id2].name + '</strong> wins for attack ' + '</li>'
		$('#ComparingList').append(html);
	}
	if (pokemon[id].defence > pokemon[id2].defence)
	{
		var html = '<li class="list-group-item list-group-item-success text-center StatsComparison" > <strong>' + pokemon[id].name + ' </strong> wins for defence ' + '</li>'
		$('#ComparingList').append(html);
	}
	else if (pokemon[id].defence == pokemon[id2].defence)
	{
		var html = '<li class="list-group-item list-group-item-success text-center StatsComparison"> <strong>' + ' They are equal for defence ' + '</strong> </li>'
		$('#ComparingList').append(html);
	}
	else
	{
		var html = '<li class="list-group-item list-group-item-success text-center StatsComparison"> <strong>' + pokemon[id2].name + '</strong> wins for defence ' + '</li>'
		$('#ComparingList').append(html);
	}
	if (pokemon[id].SPAttack > pokemon[id2].SPAttack)
	{
		var html = '<li class="list-group-item list-group-item-success text-center StatsComparison"> <strong>' + pokemon[id].name + '</strong> wins for Special Attack ' + '</li>'
		$('#ComparingList').append(html);
	}
	else if (pokemon[id].SPAttack == pokemon[id2].SPAttack)
	{
		var html = '<li class="list-group-item list-group-item-success text-center StatsComparison">' + ' They are equal for Special Attack ' + '</li>'
		$('#ComparingList').append(html);
	}
	else
	{
		var html = '<li class="list-group-item list-group-item-success text-center StatsComparison"> <strong>' + pokemon[id2].name + '</strong> wins for Special Attack ' + '</li>'
		$('#ComparingList').append(html);
	}
	if (pokemon[id].SPDefence > pokemon[id2].SPDefence)
	{
		var html = '<li class="list-group-item list-group-item-success text-center StatsComparison"> <strong>' + pokemon[id].name + '</strong> wins for Special Defence ' + '</li>'
		$('#ComparingList').append(html);
	}
	else if (pokemon[id].SPDefence == pokemon[id2].SPDefence)
	{
		var html = '<li class="list-group-item list-group-item-success text-center StatsComparison">' + ' They are equal for Special Defence ' + '</li>'
		$('#ComparingList').append(html);
	}
	else
	{
		var html = '<li class="list-group-item list-group-item-success text-center StatsComparison"> <strong>' + pokemon[id2].name + '</strong> wins for Special Defence ' + '</li>'
		$('#ComparingList').append(html);
	}
	if (pokemon[id].speed > pokemon[id2].speed)
	{
		var html = '<li class="list-group-item list-group-item-success text-center StatsComparison"> <strong>' + pokemon[id].name + '</strong> wins for speed ' + '</li>'
		$('#ComparingList').append(html);
	}
	else if (pokemon[id].speed == pokemon[id2].speed)
	{
		var html = '<li class="list-group-item list-group-item-success text-center StatsComparison">' + ' They are equal for speed ' + '</li>'
		$('#ComparingList').append(html);
	}
	else
	{
		var html = '<li class="list-group-item list-group-item-success text-center StatsComparison"> <strong>' + pokemon[id2].name + '</strong> wins for speed ' + '</li>'
		$('#ComparingList').append(html);
	}
}