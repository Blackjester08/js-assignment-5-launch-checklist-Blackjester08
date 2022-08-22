// Write your JavaScript code here!

window.addEventListener("load", function () {

    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
     
    }).then(function () {
;
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let planet = pickPlanet(listedPlanets)
        let destination = addDestinationInfo(document,
            planet.name,
            planet.diameter,
            planet.star,
            planet.distance,
            planet.moons,
            planet.image)
    })



});