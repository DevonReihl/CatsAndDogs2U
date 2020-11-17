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
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ name,}),
    })
      .then(res =>
          (!res.ok) 
              ? res.json().then((e) => Promise.reject(e)) 
              : name
      )
  },
  //refactor to do cat or dog??
  removePersonAndPet(type) {
    const animalToRemove = {
      type: `${type}`
    }
    return fetch(`${config.API_ENDPOINT}/pets`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(animalToRemove)
    })
    

  }


}

export default ApiService