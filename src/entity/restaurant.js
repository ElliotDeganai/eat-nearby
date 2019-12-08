class Restaurant {
    constructor(id, name, address, lat, long, city = "", zip_code = null, averageRating = 0, ratingNumber = 0, ratings = [], placeId, photos = [], photoPresentation) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.lat = lat;
        this.long = long;
        this.city = city;
        this.zip_code = zip_code;
        this.streetViewUrl = "https://maps.googleapis.com/maps/api/streetview?key=AIzaSyAKy_eNWWf9MXRvRezeuA_WlHFTVproHl8&location=" + lat + "," + long + "&size=150x100"
        this.ratings = ratings;
        this.averageRating = averageRating;
        this.ratingNumber = ratingNumber;
        this.placeId = placeId;
        this.photos = photos;
        this.photoPresentation = photoPresentation;
    }
    addRatings(rating) {
        if (this.ratingNumber !== 0) {
            let previousRatingNumber = this.ratingNumber;
            let previousAverageRating = this.averageRating;
            this.ratings.push(rating);
            this.averageRating = Number(((previousRatingNumber * previousAverageRating) + rating.star) / (previousRatingNumber + 1));
            this.ratingNumber = previousRatingNumber + 1;
        } else {
            this.ratings.push(rating);
            this.averageRating = rating.star;
            this.ratingNumber = 1;
        }

    }

    clearRatings() {
        this.ratings = [];
        this.averageRating = 1;
        this.ratingNumber = 0;
    }

    calculateAverageRating() {
        let sumRatingsStars = 0
        for (let rating of this.ratings) {
            sumRatingsStars = Number(sumRatingsStars) + Number(rating.star)
        }
        this.averageRating = 0
        this.averageRating = sumRatingsStars / this.ratings.length
        this.averageRating = Number(this.averageRating.toFixed(1))

    }
}
export default Restaurant;