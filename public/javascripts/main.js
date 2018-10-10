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
    showselected: false,
    inputs: true
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
        this.data.push(this.food[i])
        this.show = true
        this.inputs = false
      }
    },
    calculate: function(carbs, fat, protein, calories, name) {
      this.carbs -= carbs
      this.fat -= fat
      this.protein -= protein
      this.calories -= calories
      if (this.carbs < 0 || this.fat < 0 || this.protein < 0 || this.calories < 0) {
        alert("No more for you, fat boy")
        this.carbs += carbs
        this.fat += fat
        this.protein += protein
        this.calories += calories
      } else {
        this.addToArray(carbs, fat, protein, calories, name)
      }
    },
    addToArray: function(carbs, fat, protein, calories, name) {
      this.selected.push({"carbs": carbs, "fat": fat, "protein": protein, "calories": calories, "name": name})
      this.showselected = true
    },
    remove: function(index) {
      var selectedForDeletion = this.selected.slice(index)
      this.selected.splice(index, 1)
      if(this.selected.length <= 0) {
        this.showselected = false
      }
      this.carbs += selectedForDeletion[0].carbs
      this.protein += selectedForDeletion[0].protein
      this.calories += selectedForDeletion[0].calories
      this.fat += selectedForDeletion[0].fat
      this.chooseMe()
    }
  }
})


