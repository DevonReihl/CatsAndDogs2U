import React from 'react'
import ApiService from '../ApiService'
import config from '../config'
import { Link } from 'react-router-dom'


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
      .catch(error => {
        console.error({ error })
      })
    ApiService.getPeople()
      .then(
        people => {
          this.setState({
            people, loading: false
          })
        }

      )
      .catch(error => {
        console.error({ error })
      })
  }

  handleCatClick(cat) {
    const removeCat = {
       type: "cats"
    }
    fetch(`${config.API_ENDPOINT}/pets`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(removeCat)
    })
    .then(res => {
      if(!res.ok)
      return res.json().then(e => Promise.reject(e))
    })
    .then(() => {
      return this.componentDidMount()
      
    })
    .catch(error => {
      console.error({ error })
    })
  }

  handleDogClick(dog) {
    const removeDog = {
      type: "dogs"
   }
   fetch(`${config.API_ENDPOINT}/pets`, {
     method: 'DELETE',
     headers: {
       'content-type': 'application/json'
     },
     body: JSON.stringify(removeDog)
   })
   .then(res => {
     if(!res.ok)
     return res.json().then(e => Promise.reject(e))
   })
   .then(() => {
     return this.componentDidMount()
     
   })
   .catch(error => {
    console.error({ error })
  })
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
            <li><h4>Next in line is: </h4></li>
            {this.renderPeople()}
          </ul>
          <Link to ='/adopter'>Ready to Adopt?</Link>
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
                <li className="pet-age">Age: {cat.age}</li>  
                <li className="pet-breed">Breed: {cat.breed}</li> 
                <li className="pet-descrip">Descr: {cat.description}</li>
                <li className="pet-story">Story: {cat.story}</li>  
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
                <li className="pet-age">Age: {dog.age} years</li>  
                <li className="pet-breed">Breed: {dog.breed}</li> 
                <li className="pet-descrip">Descr: {dog.description}</li>
                <li className="pet-story">Story: {dog.story}</li>  
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
