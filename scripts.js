const url = "https://pokeapi.co/api/v2/pokemon/";

fetch(url).then((response) => response.json()).then(function(data)
{
	for (let i = 0; i < 4; i++) //change to length of array later <--
	{
		console.log(data.results)
		document.getElementById("Name" + i).textContent = data.results[i].name;
		readPokemonInfo(data.results[i].url, i);
	}
	
		  // $.each(data.results, function(i, result) {
		  // console.log(result);
      // $('#data').append(
          // $('<div class="col-md-3 thumbnail" id = a>').text(result.name)
        // );
				  // $('#a').attr("id",result.name);
	   // $(result.name).append(
           // $('<a href="" target="_blank"><img alt="Pokemon" height="300em" src="">').text(result.name)
         // );
    // });
});

function readPokemonInfo(Pokeurl, iter)
{
	fetch(Pokeurl).then((response) => response.json()).then(function(data)
	{
		console.log(data);
		document.getElementById("Image" + iter).src = data.sprites.front_default;
		document.getElementById("Species" + iter).textContent = "nothing" //todo
		document.getElementById("Type" + iter).textContent = data.types[0].type.name;
		if (data.types[1] != null)
		{
			document.getElementById("Type" + iter).textContent = data.types[0].type.name + " - " + data.types[1].type.name;
		}
	});
}