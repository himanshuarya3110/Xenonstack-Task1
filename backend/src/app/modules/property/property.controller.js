import { properties } from "../../Shared/data.js";
  
  // Dummy browsing history for user
 
  const recommnend =(req ,res)=>{
    const viewedProperties =   req.body;
    console.log(req.body)
    console.log(viewedProperties)
    if (!viewedProperties || viewedProperties.length === 0) {
      return res.json([]); // No recommendations if no properties are viewed
    }
  
    // Extract locations and categories from viewed properties
    const viewedLocations = new Set(viewedProperties.map(property => property.location));
    const viewedCategories = new Set(viewedProperties.map(property => property.category));
  
    // Find recommendations based on location or category
    const recommendations = properties.filter(property =>
      (viewedLocations.has(property.location) || viewedCategories.has(property.category)) &&
      !viewedProperties.some(viewed => viewed.id === property.id) // Exclude currently viewed properties
    );
  
    res.json(recommendations);
  
  }
 
  export const  PropertyController = {
    recommnend
  }