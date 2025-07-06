import React from 'react'
import {useParams} from "react-router-dom"
const MovieDetails = () => {
  const {id}=useParams();
  const [show,setShow]=useState(null);

  

  return (
    <div>
      
    </div>
  )
}

export default MovieDetails