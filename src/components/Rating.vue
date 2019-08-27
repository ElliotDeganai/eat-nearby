<template>
  <div class="rating">

  <h3>{{ author }}</h3>
  <p> {{ comment }} </p>
  <div> {{ stars }} </div>
      
  </div>
</template>

<script>
import rating from '../entity/rating.js'
export default {
    data(){
        return {
            author: rating.author,
            stars: rating.stars,
            comment: rating.comment
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
