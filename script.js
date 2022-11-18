var pokeUrl = 'https://pokeapi.co/api/v2/pokemon/'

var submitButton = document.getElementById('submit');
var textField = document.getElementById('text');
var contentEl = document.getElementById('pokeContent');

var inputMon;
var exit = false;


submitButton.addEventListener('click', function()
{
    exit = false;
    inputMon = textField.value;

    fetch(pokeUrl + inputMon).then(function(response){
        console.log(response.status);
        
        if (response.status != 200)
        {
            alert("Please enter a valid pokemon name. Remove punctuation and replace spaces with dashes.");
            exit = true;
        }

        return response.json();
    }).then(function(data){
        if (exit)
            return;

        contentEl.innerHTML = "";
        
        var title = []
        var content = []
        for (var i = 0; i < 5; i++)
        {
            title.push(document.createElement('h3'));
            content.push(document.createElement('p'));
        }

        title[0].textContent = "NAME";
        content[0].textContent = data.name;
        title[1].textContent="Types";
        content[1].textContent="";
        for (var i = 0; i < data.types.length; i++)
        {
            content[1].textContent += data.types[i].type.name;
            content[1].textContent += " ";
        }

        
        title[2].textContent= "Ability 1: ";
        content[2].textContent = data.abilities[0].ability.name;
        title[3].textContent= "Height: ";
        content[3].textContent= data.height;
        title[4].textContent= "Weight: ";
        content[4].textContent= data.weight;

        for (var i = 0; i < 5; i++)
        {
            contentEl.appendChild(title[i]);
            contentEl.appendChild(content[i]);
        }
        var image = document.createElement('img');
        image.setAttribute('src',data.sprites.front_default);
        contentEl.appendChild(image);

        console.log(data);
    })
});

