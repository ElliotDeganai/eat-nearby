class Restaurant{
    constructor(name, address, lat, long){
        this.id = 0;
        this.name = name;
        this.address = address;
        this.lat = lat;
        this.long = long;
        this.streetViewUrl = "https://maps.googleapis.com/maps/api/streetview?key=AIzaSyAKy_eNWWf9MXRvRezeuA_WlHFTVproHl8&location=" + lat + "," + long + "&size=150x100"
        this.ratings = [];
        this.averageRating = 0;
        //this.visible = false
    }
    addRatings(rating){
        this.ratings.push(rating)
        this.calculateAverageRating()
    }

    calculateAverageRating(){
        let sumRatingsStars = 0
        for(let rating of this.ratings){
            sumRatingsStars = Number(sumRatingsStars) + Number(rating.star)
        }
        this.averageRating = 0
        this.averageRating = sumRatingsStars / this.ratings.length
        this.averageRating = Number(this.averageRating.toFixed(1))
    }
}
export default Restaurant;