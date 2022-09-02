// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById('missionTarget')
    missionTarget.innerHTML = `

                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">`

}

function validateInput(testInput) {
    if (testInput === "" || testInput === null) {
        return `Empty`
    } else if ((!isNaN(Number(testInput)))) {
        return `Is a Number`
    } else {
        return 'Not a Number'
    }
}


function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById('pilotStatus')
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let launchStatus = document.getElementById('launchStatus');
    let cargoStatus = document.getElementById('cargoStatus');
    if (validateInput(pilot) === `Empty` || validateInput(copilot) === `Empty` ||
        validateInput(fuelLevel) === `Empty` || validateInput(cargoLevel) === `Empty`) {
        console.log(`All fields are required`);
    }
    else if (validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {
        console.log(`Please enter numerical values for Fuel Level and Cargo Mass`);
    } else if (validateInput(pilot) === `Is a Number` || validateInput(copilot) === `Is a Number`) {
        console.log('Please do not enter numbers for name of pilot or co-pilot');
    }
    else {

        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        list.style.visibility = 'hidden';
    }

    if (Number(fuelLevel) < 10000 && Number(cargoLevel) > 10000) {
        fuelStatus.innerHTML = `Not enough fuel for journey`;
        cargoStatus.innerHTML = `Cargo mass too heavy for launch`
        list.style.visibility = 'visible';
        launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
        launchStatus.style.color = `rgb(199, 37, 78)`;
    } else if (Number(cargoLevel) > 10000 && Number(fuelLevel) >= 10000) {
        cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
        fuelStatus.innerHTML = "Enough fuel for journey"
        list.style.visibility = `visible`;
        launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
        launchStatus.style.color = `rgb(199, 37, 78)`;

    } else if (Number(fuelLevel) < 10000 && Number(cargoLevel) <= 10000) {
        cargoStatus.innerHTML = `Cargo light enough for takeoff`
        fuelStatus.innerHTML = "Not enough fuel for journey"
        list.style.visibility = 'visible';
        launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
        launchStatus.style.color = `rgb(199, 37, 78)`;
    }

    else {
        list.style.visibility = `visible`;
        fuelStatus.innerHTML = `Enough fuel for journey`;
        cargoStatus.innerHTML = `Cargo light enough for takeoff`;
        launchStatus.innerHTML = `Shuttle Ready for Launch`;
        launchStatus.style.color = `rgb(65, 159, 106)`;
    }

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json()
    });


    return planetsReturned;

}

function pickPlanet(planets) {
    let index = Math.floor(Math.random() * planets.length);
    return planets[index];

}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
