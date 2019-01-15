'use strict';

const reqResource = new XMLHttpRequest();

const requestResourceButton = document.querySelector('#requestResourceButton');
const resourceType = document.querySelector('#resourceType');
const resourceId = document.querySelector('#resourceId');

let characterName = document.createElement('h2');

function getCharacterSpecies() {
  const reqSpeciesData = JSON.parse(this.responseText);
  console.log('reqSpeciesData', reqSpeciesData);

  let characterSpecies = document.createElement('p');
  characterSpecies.className = 'characterSpecies';
  characterSpecies.innerHTML = reqSpeciesData.name;
  characterName.appendChild(characterSpecies);
}

function reqResourceHandler() {
  const reqData = JSON.parse(this.responseText);

  console.log('reqData', reqData);
  const contentContainer = document.querySelector('#contentContainer');

  characterName.className = 'characterName';
  characterName.innerHTML = reqData.name;
  contentContainer.appendChild(characterName);

  let characterGender = document.createElement('p');
  characterGender.className = 'characterGender';
  characterGender.innerHTML = reqData.gender;
  characterName.appendChild(characterGender);

  const reqCharacterSpecies = new XMLHttpRequest();
  reqCharacterSpecies.addEventListener('load', getCharacterSpecies);
  reqCharacterSpecies.open('GET', reqData.species);
  reqCharacterSpecies.send();

  reqData.forEach(planet => {
    let planetItemList = document.createElement('li');
    planetItemList.className = 'planetList';
    contentContainer.appendChild(planetItemList);

    let planetName = document.createElement('h2');
    planetName.className = 'planetName';
    planetName.innerHTML = reqData.Name;
    planetItemList.appendChild(planetName);

    let planetTerrain = document.createElement('p');
    planetTerrain.className = 'planetTerrain';
    plannetTerrain.innerHTML = reqData.terrain;
    planetItemList.appendChild(planetTerrain);

    let planetPopulation = document.createElement('p');
    planetPopulation.className = 'planetPopulation';
    planetPopulation.innerHTML = reqData.population;
    planetItemList.appendChild(planetPopulation);

    let planetFilmName = document.createElement('ul');
    planetFilmName.className = 'planetFilmName';
    planetItemList.appendChild(planetFilmName);
  });

  reqData.forEach(starship => {
    let starshipList = document.createElement('li');
    starshipList.className = 'starshipList';
    contentContainer.appendChild(starshipList);

    let starshipName = document.createElement('h2');
    starshipName.className = 'starshipName';
    starshipName.innerHTML = reqData.Name;
    starshipList.appendChild(starshipName);

    let starshipMan = document.createElement('p');
    starshipMan.className = 'starshipMan';
    starshipMan.innerHTML = reqData.manufacturer;
    starshipName.appendChild(starshipMan);

    let starshipClass = document.createElement('p');
    starshipClass.className = 'starshipClass';
    starshipClass.innerHTML = reqData.starship_class;
    starshipName.appendChild(starshipClass);

    let starshipFilmName = document.createElement('ul');
    starshipFilmName.className = 'starshipFilmName';
    starshipList.appendChild(starshipFilmName);
  });
}

requestResourceButton.addEventListener('click', function() {
  reqResource.addEventListener('load', reqResourceHandler);
  reqResource.open(
    'GET',
    `https://swapi.co/api/${resourceType.value}/${resourceId.value}`
  );
  reqResource.send();
});
