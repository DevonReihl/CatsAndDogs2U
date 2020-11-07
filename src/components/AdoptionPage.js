import React from 'react'
import config from '../config'


export default class AdoptionPage extends React.Component {
  state = {
    cats: null,
    dogs: null,
    people: null
  }

  componentDidMount() {
    Promise.all([
      `${config.API_ENDPOINT}/pets`,
      `${config.API_ENDPOINT}/people`
    ])
    .then(([dogsRes, catsRes, peopleRes]) => {
      if (!dogsRes.ok)
        return dogsRes.json().then(e => Promise.reject(e))
      if (!catsRes.ok)
        return catsRes.json().then(e => Promise.reject(e))
      if (!peopleRes.ok)
        return peopleRes.json().then(e => Promise.reject(e))
      return Promise.all([
        dogsRes.json(),
        catsRes.json(),
        peopleRes.json()
      ])
    })
    .then(([dogs, cats, people]) => {
      this.setState({ dogs, cats, people })    
    })
    .catch(error => {
      console.error({ error })
    })
    
  }

  handleCatClick() {

  }

  handleDogClick() {

  }

  render() {
    const { cats, dogs, people} = this.state

    return (
      <>
        
        <section className="animal">
          <header>
            <h2 className="animal-name">
                  {/* {cats.name} */}
            </h2>
            <img src='https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt='' />
          </header>
          <main>
              {/* <h3>More about {cats.name}</h3>  */}
            <ul className="animal-attributes">  
              {/* <li className="pet-sex">{cats.sex}</li>   */}
              <li className="pet-age">2 years</li>  {/* {cat.age} */}
              <li className="pet-breed">Bengal</li> {/* {cat.breed} */}
              <li className="pet-descrip">Orange bengal cat with black stripes lounging on concrete.</li>
              <li className="pet-story">Thrown on the street</li>  {/* {cat.story} */}
            </ul>
            <button 
              className="adopter"
              type="button"
              onClick={() => this.handleCatClick()}
            >
              
                `Current Adopter: You` {/*${this.state.usersQ[0].name} */
              }
            </button>
          </main>
        </section>
        <section className="animal">
          <header>
            <h2 className="animal-name">
                  Sam {/* {dog.name} */}
            </h2>
            <img src='https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' alt='' />
          </header>
          <main>
              <h3>More about Sam</h3> {/* {dog.name} */}
            <ul className="animal-attributes">  
              <li className="pet-sex">Male</li>  {/* {dog.sex} */}
              <li className="pet-age">3 years</li>  {/* {dog.age} */}
              <li className="pet-breed">Golden Retriever</li> {/* {dog.breed} */}
              <li className="pet-descrip">A smiling golden-brown golden retreiver listening to music.</li>
              <li className="pet-story">Owner Passed away</li>  {/* {dog.story} */}
            </ul>
            <button 
              className="adopter"
              type="button"
              onClick={() => this.handleCatClick()}
            >
              
                `Current Adopter: You` {/*${this.state.usersQ[0].name} */
              }
            </button>
          </main>
        </section>
      </>
    )
  }
}