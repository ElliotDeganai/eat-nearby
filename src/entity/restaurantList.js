
class RestaurantList{
    constructor(){
        this.list = [];
    }

    getListOfLocations(restorants){
        let locations = []
        for(let restaurant of restorants){
            let position = {lat: restaurant.lat, lng: restaurant.long}
            let objectPosition = {position}
            locations.push(objectPosition)
          }
          return locations
    }

}
export default new RestaurantList();