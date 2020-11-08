import React from 'react'
import config from '../config'
import { Link } from 'react-router-dom'
import './AddAdopter.css'

export default class AddAdopter extends React.Component {

  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  
  handleAddAdopter = e => {
    e.preventDefault()
    const newAdopter = {
      name: e.target.name.value, 
    }

    fetch(`${config.API_ENDPOINT}/people`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newAdopter)
    })
    .then(res => {
      if(!res.ok)
      return res.json().then(e => Promise.reject(e))
    })
    .then( 
      this.props.history.push('/adopt')
    )
    .catch(error => {
      console.error({ error })
    })
  }

  render() {

    return (
      <form  onSubmit={this.handleAddAdopter}>
      
        <div>
          <label htmlFor='name' placeholder='Your name..'>Name: </label>
          <input type='text' name='name' minLength='5' required />
        </div>
        <div>
        <Link to={`/adopt`}>
          <button type='reset'>
            Cancel
          </button>
        </Link>
        <button type='submit'>
            Save
        </button>
       </div>
      </form>

    )
  }
}