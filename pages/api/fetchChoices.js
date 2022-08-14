const defaultEndpoint = "https://swapi.dev/api/";

export async function getPlanets(id) {
    const res = await fetch(defaultEndpoint + "/planets/" + id);
    if (!res.ok) {
        return Promise.reject("An error occured, please refresh the page!")
    }

    return await res.json();

}

export async function getSpecies(id) {
    const res = await fetch(defaultEndpoint + "/species/" + id);
    if (!res.ok) {
        return Promise.reject("An error occured, please refresh the page!")
    }

    return await res.json();
}

export async function getFilms(id) {
    const res = await fetch(defaultEndpoint + "/films/" + id);
    if (!res.ok) {
        return Promise.reject("An error occured, please refresh the page!")
    }

    return await res.json();
}

export async function getPerson(person) {
    const res = await fetch("https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api/id/" + person + ".json");
    if (!res.ok) {
        return Promise.reject("An error occured, please refresh the page!")
    }

    return await res.json();
}

