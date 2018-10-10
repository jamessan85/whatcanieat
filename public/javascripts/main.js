new Vue({
  el: '#food',
  data: {
    carbs: '',
    protein: '',
    fat: '',
    calories: '',
    food: [],
    data: [],
    show: false,
    selected: [],
    showselected: false
  },
  mounted() {
    axios.get('/info')
      .then(response => {
      this.food = response.data;
    })
  }, 
  methods: {
    chooseMe: function() {
      this.data = []
      for (var i = 0; i < this.food.length; i++) {
        if (
          this.carbs > this.food[i].Carbs && 
          this.fat > this.food[i].Fat &&
          this.protein > this.food[i].Protein &&
          this.calories > this.food[i].Calories
        ) {
          this.data.push(this.food[i])
          this.show = true
        }
      }
    },
    calculate: function(carbs, fat, protein, calories, name) {
      this.carbs -= carbs
      this.fat -= fat
      this.protein -= protein
      this.calories -= calories
      this.chooseMe()
      this.addToArray(carbs, fat, protein, calories, name)
    },
    addToArray: function(carbs, fat, protein, calories, name) {
      this.selected.push({"carbs": carbs, "fat": fat, "protein": protein, "calories": calories, "name": name})
      this.showselected = true
    },
    remove: function(index) {
      var selectedForDeletion = this.selected.slice(index)
      console.log(index)
      this.selected.splice(index, 1)
      if(this.selected.length <= 0) {
        this.showselected = true
      }
      this.carbs += selectedForDeletion[0].carbs
      this.protein += selectedForDeletion[0].protein
      this.calories += selectedForDeletion[0].calories
      this.fat += selectedForDeletion[0].fat
      this.chooseMe()
    }
  }
})


