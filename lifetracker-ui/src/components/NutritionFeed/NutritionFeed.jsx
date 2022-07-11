// import NutritionCard from "components/NutritionCard/NutritionCard"
import * as React from "react"
import "./NutritionFeed.css"
import { Link } from "react-router-dom"
import { useNutritionContext } from "../../contexts/nutrition"

export default function NutritionFeed(props) {
    console.log(props.nutritions, "nutrition")

  return (
    <div className="nutrition-feed">
        {props.nutritions?.length ? null : (<p className="empty-message">Nothing here yet..</p>)}
        {props.nutritions ? props.nutritions.map((item, idx) => {return(
            <Link to={`id/`+item.id } key={idx}>
                <NutritionCard key={item.name}  quantity={item.quantity} name={item.name} calories={item.calories} image_url={item.image_url} category={item.category} createdAt={item.createdAt} id={item.id}/>
            </Link>
            
        )}) : null}
    </div>
  )
}