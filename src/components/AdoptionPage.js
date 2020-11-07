import React from 'react'
import ApiService from '../ApiService'
import config from '../config'


export default class AdoptionPage extends React.Component {
  state = {
    cat: {},
    dog: {},
    people: [],
    loading: true
  }

  componentDidMount() {
    ApiService.getPets()
      .then(
        pets => {
          this.setState({
            cat: pets.cat,
            dog: pets.dog
          })
        }
      )
    ApiService.getPeople()
      .then(
        people => {
          this.setState({
            people, loading: false
          })
        }

      )
  }

  handleCatClick( cat) {
    console.log('YOU ADOPTED A CAT', cat)
    fetch(`${config.API_ENDPOINT}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: { 'type': 'cat'}  
    })
    .then(res => {
      if(!res.ok)
      return res.json().then(e => Promise.reject(e))
    })
    .then(() => {
      this.setState(cat)
    })
  }

  handleDogClick(type) {
    console.log('YOU ADOPTED A DOG', type)
  }

  renderPeople =() => {
    let people = this.state.people

    if( people.length > 1) {
      return people.map((person, index) => (
      <li key={index}>{person}</li>
      ))
    }
    
  }

  render() {
    const { cat, dog, loading } = this.state
    
    return (
        
      <>
      {loading ? <p> LOADING </p> :
        <div>
          <h1>Petful</h1>
          <h3>Take me to my "Furever" home!</h3>
          <ul>
            {this.renderPeople()}
          </ul>
          <section className="animal">
            <header>
              <h2 className="animal-name">
                {cat.name}
              </h2>
              <img src={cat.imageURL} alt='' />  
            </header>
            <main>
              <h3>More about {cat.name}</h3> 
              <ul className="animal-attributes"> 
                <li className="pet-age">{cat.age}</li>  
                <li className="pet-breed">{cat.breed}</li> 
                <li className="pet-descrip">{cat.description}</li>
                <li className="pet-story">{cat.story}</li>  
              </ul>
              <button
                className="adopter"
                type="button"
                onClick={() => this.handleCatClick(cat)}
              >Adopt Me!
              </button>
            </main>
          </section>
          <section className="animal">
            <header>
              <h2 className="animal-name">
                {dog.name}
              </h2>
              <img src={dog.imageURL} alt='' />
            </header>
            <main>
              <h3>More about {dog.name}</h3> 
              <ul className="animal-attributes">
                <li className="pet-age">{dog.age} years</li>  
                <li className="pet-breed">{dog.breed}</li> 
                <li className="pet-descrip">{dog.description}</li>
                <li className="pet-story">{dog.story}</li>  
              </ul>
              <button
                className="adopter"
                type="button"
                onClick={() => this.handleDogClick(dog)}
              >Adopt Me!
                
              </button>
            </main>
          </section>
      </div>}
      </>
    )
  }
}
