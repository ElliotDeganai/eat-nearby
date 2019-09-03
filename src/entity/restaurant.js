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

    calculateAverageRating(){
        let average = 0
        for(let rating of this.ratings){
            average = average + rating.star
        }
        average = average / (this.ratings.length + 1)
        return average
    }


}
export default Restaurant;