import React from 'react'
import PetService from '../../PetService'
import './AdoptionPage.css'



export default class AdoptionPage extends React.Component {
  state = {
    cat: {},
    dog: {},
    people: [],
    name: '',
    adopter: '',
    adopted: false,
    loading: false,
    
  }

  componentDidMount() {
    this.setState({ loading: true })

    PetService.getPets()
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
    PetService.getPeople()
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


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleAddToQueue = (e) => {
    e.preventDefault();
    PetService.addPerson(this.state.name).then((res) => {
      this.setState({
        people: [...this.state.people, res],
        adopter: res,
        name: '',
      })
    })
    

    this.timeout = setInterval(() => {
      let dogOrCat = Math.floor(Math.random()* 2)
      let type= ''
      if (dogOrCat ===0) {
        type = 'dogs'
      }else {
        type = 'cats'
      }

      PetService.removePersonAndPet(type)
      .then((res) => {
        PetService.getPets()
        .then((res) => {
          this.setState({
            dog: res.dog,
            cat: res.cat,
          })
        })
        .catch(error => {
          console.error({ error })
        })
        PetService.getPeople()
        .then((res) => {
          this.setState({
            people: res
          })
        })
        .catch(error => {
          console.error({ error })
        })
      })
    }, 2000)
  }

  addPeopleToQueue() {
    let addNewPeopleTimer = setTimeout(() => {
      if (this.state.people === 5) {
        clearTimeout(addNewPeopleTimer)
      }

      const randomPeople = [
        'Dean',
        'Charlie',
        'Cass',
        'Sam',
        'Crowley',
        'Ruby',
        'Jo',
        'Ellen',
        'Gabriel',
        'Jack',
        'Lucifer'
      ]

      const randomPerson = 
        randomPeople[Math.floor(Math.random() * randomPeople.length)]

        if (this.state.people.length < 5) {
          PetService.addPerson(randomPerson)
          .then((res) => {
            this.setState({
              people: [...this.state.people, res]
            })
          })
          .catch(error => {
            console.error({ error })
          })
        }
    }, 3000)
  }

  handleAdoption = (type) => {
    PetService.removePersonAndPet(type)
      .then((res) => {
        this.setState({adopted: true})
        PetService.getPets()
        .then((res) => {
          this.setState({
            dog: res.dog,
            cat: res.cat,
          })
        })
        .catch(error => {
          console.error({ error })
        })
        PetService.getPeople()
        .then((res) => {
          this.setState({
            people: res
          })
        })
        .catch(error => {
          console.error({ error })
        })
      })
  }

  renderPeople =() => {
    let people = this.state.people

    if( people.length >= 1) {
      return people.map((person, index) => (
      <li className='people-list' key={index}>{person}</li>
      ))
    }
    
    if(this.state.people.length ===1) {
      this.addPeopleToQueue()
    }
    
  }

  adoptedRender() {
      return (
        <h1>Congrats you just adopted your very own pet!</h1>
        )
  }


  render() {
    const { cat, dog, people, adopter, loading } = this.state

    if ((dog.length === 0 || cat.length === 0) && !loading) {
      return <div> All pets have found a home!!! Please try again another day</div>
    } else if( adopter === people[0]) {
      this.addPeopleToQueue();
      clearInterval(this.timeout);
    }
     else if ( people.length > 5) {
      clearInterval(this.addNewPeopleTimer)
    }
    
    return (
        
      <>
        {this.state.loading ? (
          <p>Loading!!!</p>
        ): (
        <div>
          <header className='pageHeader'>
            <h1>Cats And Dogs 2U</h1>
            <h3>Take me to my "Furever" home!</h3>
          </header>
          <ul className='people'>
            <li><h4>Next in line is:</h4></li>
            {this.renderPeople()}
          </ul>
          <form
                className="add-to-list"
                onSubmit={(e) => this.handleAddToQueue(e)}
              >
                <label htmlFor="name-input">Enter your name to get in line!</label>
                <br />
                <input
                  type="text"
                  name="name"
                  id="name-input"
                  onChange={this.handleChange}
                  value={this.state.name}
                  required
                ></input>
                <br />
                <button className="button" type="submit">
                  Ready to Adopt?
                </button>
          </form>

              {this.state.adopted ? (<div>{this.adoptedRender()}<br /></div>): (
          <section className="animal">
            <div className='cat'>
              <div>
                <h2 className="animal-name">
                  {cat.name}
                </h2>
                <img src={cat.imageURL} alt='' />  
              </div>
              <div>
                <h3>More about {cat.name}</h3> 
                <ul className="animal-attributes"> 
                  <li className="pet-age">Age: {cat.age}</li>  
                  <li className="pet-breed">Breed: {cat.breed}</li> 
                  <li className="pet-descrip">Desc: {cat.description}</li>
                  <li className="pet-story">Story: {cat.story}</li>  
                </ul>
                {this.state.adopter === this.state.people[0] && (
                    <button
                      className="button"
                      type="button"
                      onClick={(e) => this.handleAdoption('cats')}
                    >
                      Adopt Me!
                    </button>
                  )}
              </div>
            </div>
      
            <div className='dog'>
              <div>
                <h2 className="animal-name">
                  {dog.name}
                </h2>
                <img src={dog.imageURL} alt='' />
              </div>
              <div>
                <h3>More about {dog.name}</h3> 
                <ul className="animal-attributes">
                  <li className="pet-age">Age: {dog.age} years</li>  
                  <li className="pet-breed">Breed: {dog.breed}</li> 
                  <li className="pet-descrip">Desc: {dog.description}</li>
                  <li className="pet-story">Story: {dog.story}</li>  
                </ul>
                {this.state.adopter === this.state.people[0] && (
                    <button
                      className="button"
                      type="button"
                      onClick={(e) => this.handleAdoption('dogs')}
                    >
                      Adopt Me!
                    </button>
                  )}
              </div>
            </div>
          </section>)}
        </div>
        )}
      </>
    )
  }
}
