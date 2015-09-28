console.log('Pet stuff')

$(document).on('ready', function() {

// request("/animals", "get").done(appendAnimals(response));

    $("#create-animal").on("submit", createPet);

})

function createPet(e){
    e.preventDefault;
    var data = $(e.target).serialize();
    request("/animals", "post", data).done(appendPets)
}

function request(url, method, data) {
    return $.ajax({
        url: url,
        method: method,
        dataType: "json",
        data: data
    })
}

// function appendPets(animals) {
//     animalTemplate = 
// }

function request(url, method, data) {
    return $.ajax({
        url: url,
        method: method,
        dataType: "json",
        data: data
    })
}
