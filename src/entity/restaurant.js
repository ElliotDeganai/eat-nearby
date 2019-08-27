class Restaurant{
    constructor(name, address, lat, long){
        this.name = name;
        this.address = address;
        this.lat = lat;
        this.long = long;
        this.ratings = [];
    }
    addRatings(rating){
        this.ratings.push(rating)
    }


}
export default Restaurant;