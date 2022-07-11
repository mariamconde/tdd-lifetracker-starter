import AccessForbidden from "components/AccessForbidden/AccessForbidden"
import NutritionFeed from "components/NutritionFeed/NutritionFeed"
import * as React from "react"
import { Link } from "react-router-dom"
import "./NutritionOverview.css"
import { useNutritionContext } from "../../contexts/nutrition"
import Loading from "components/Loading/Loading"
import { useState } from "react"

export default function NutritionOverview({nutrition}) {
  const {nutritions, isLoading, error} = useNutritionContext()
  const [copy, setCopy] = useState(nutritions)
  console.log("copy", copy)

  const handleFilter = (event) => {
    if(event.target.value == "less"){
      setCopy(nutritions.filter(item =>  item.calories < 100))
    }
    else if(event.target.value == "more"){
      setCopy(nutritions.filter(item =>  item.calories > 500))
    }
    else if(event.target.value == "all"){
      setCopy(nutritions)
    }
    else{
      setCopy(nutritions.filter(item => item.calories >= 100 && item.calories <= 500))
    }
    console.log(copy)
  }

  return (
    <div className="nutrition-overview">
        <h1>Overview</h1>
        {error? <p className="error">{error}</p> : null}
        <Link to="/nutrition/create"><button id="record">Record Nutrition</button></Link>
         
  
        {isLoading? <Loading/> : <NutritionFeed nutritions={copy}></NutritionFeed>}
    </div>
  )
}