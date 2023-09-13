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
  const potato = params.potato*1
  const puppy = puppies.find(puppy => puppy.id === potato)
  console.log(puppies)

  if(!puppy){
    return null
  }
  else{
  return <>
  <h1> You Selected: {puppy.name} </h1>
    <ul>
      <li> Breed: {puppy.breed} </li>
      <li><img src={puppy.imageUrl}/></li>
    </ul>
    </>
  }

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
      <Route path='/puppies/:potato' element={<Puppy puppies = {puppies}/>}/>
     </Routes>
     
    </>
  )
}

export default App
