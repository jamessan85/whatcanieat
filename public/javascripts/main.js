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
    inputs: true,
    active_el: -1
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
    calculate: function(index, event) {
      this.active_el = index
      var selectedForMenu = this.data[index]
      this.carbs -= selectedForMenu.Carbs
      this.fat -= selectedForMenu.Fat
      this.protein -= selectedForMenu.Protein
      this.calories -= selectedForMenu.Calories
      if (this.carbs < 0 || this.fat < 0 || this.protein < 0 || this.calories < 0) {
        alert("No more for you, fat boy")
        this.carbs += selectedForMenu.Carbs
        this.fat += selectedForMenu.Fat
        this.protein += selectedForMenu.Protein
        this.calories += selectedForMenu.Calories
      } else {
        this.addToArray(selectedForMenu)
      }
    },
    addToArray: function(selectedForMenu) {
      this.selected.push({
        "carbs": selectedForMenu.Carbs, 
        "fat": selectedForMenu.Fat, 
        "protein": selectedForMenu.Protein, 
        "calories": selectedForMenu.Calories, 
        "name": selectedForMenu.Name
      })
      this.showselected = true
    },
    remove: function(index) {
      var selectedForDeletion = this.selected[index]
      this.selected.splice(index, 1)
      if(this.selected.length <= 0) {
        this.showselected = false
      }
      this.carbs += selectedForDeletion.carbs
      this.protein += selectedForDeletion.protein
      this.calories += selectedForDeletion.calories
      this.fat += selectedForDeletion.fat
    }
  }
})


