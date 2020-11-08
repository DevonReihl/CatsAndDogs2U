import config from './config'

const ApiService = {
  getPets() {
    return fetch(`${config.API_ENDPOINT}/pets`)
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
        )

  },
  getPeople() {
    return fetch(`${config.API_ENDPOINT}/people`)
    .then(res => 
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
      )
  },

  addPerson(name) {
    return fetch(`${config.API_ENDPOINT}/people`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({person: name,}),
    })
        .then(res =>
            (!res.ok) 
                ? res.json().then((e) => Promise.reject(e)) 
                : res.json()
        )
  },
  
  //Can refactor to put POST and DELETE in here for better use and code later


}

export default ApiService