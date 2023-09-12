import { useState, useEffect } from 'react'
import axios from 'axios'
import {Link, Routes, Route, useParams} from 'react-router-dom'

const Home = () => {
  return <h1> Welcome to the PUPPY BOWL</h1>
}
const Puppies = ({puppies}) => {
  return (
  <>
    <h1>Here are all the puppies!</h1>
    <ul>
      {puppies.map((puppy) => {
        return <li key={puppy.id}><Link to={`/puppies/${puppy.id}`}>{puppy.name}</Link> </li>
      })}
    </ul>
  </>
  )
}

const Puppy = ({puppies}) => {
  const params = useParams()
  const id = params*1
  const puppy = puppies.find(puppy => puppy.id =id)
  return (
    <>
    <h1> This is the puppy you selected:</h1>
    <h2> {puppy.name} </h2>
    

    </>
  )
}


function App() {
  const [puppies, setPuppies] = useState([]);

  useEffect(() => {
    const fetchPuppies = async () => {
    const response = await axios.get('https://fsa-puppy-bowl.herokuapp.com/api/2307/players')
    const allPuppies = response.data.data.players
    setPuppies(allPuppies)
    console.log(puppies)
    
    }
    fetchPuppies()
  }, [])
  

  return (
    <>
     <nav> 
      <h3> <Link to ='/'> Home </Link></h3>
      <h3> <Link to ='/puppies'> Puppies </Link></h3>
     </nav>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/puppies' element={<Puppies puppies = {puppies}/>}/>
      <Route path='/puppies/:id' element={<Puppy puppies = {puppies}/>}/>
     </Routes>
     
    </>
  )
}

export default App
