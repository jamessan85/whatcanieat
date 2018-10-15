new Vue({
  el: '#food',
  data: {
    carbs: 1000,
    protein: 1000,
    fat: 1000,
    calories: 1000,
    food: [],
    data: [],
    show: false,
    selected: [],
    showselected: false,
    inputs: true,
    active_el: 0
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
      // set the vars of the clicked icon
      var getClass = event.path[0].className
      var getCell = event.path[0].cellIndex
      var getRow = event.path[1].rowIndex
      // get the targetd icons
      var rowpath = document.getElementsByTagName("tr")[getRow];
      var celltag = rowpath.getElementsByTagName("td")[getCell].className
      if (celltag === "fas fa-plus") {
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
          rowpath.getElementsByTagName("td")[getCell].className = "fas fa-minus"
          this.addToArray(selectedForMenu)
        }
      } else if (celltag === "fas fa-minus") {
        rowpath.getElementsByTagName("td")[getCell].className = "fas fa-plus"
        this.removeFromArray(index)
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
    removeFromArray: function(index) {
      var name = this.data[index].Name
      var x = this.selected.findIndex(a => a.name === name)
      var selectedForDeletion = this.selected[x]
      this.selected.splice(x, 1)
      if(this.selected.length <= 0) {
        this.showselected = false
      }
      this.carbs += selectedForDeletion.carbs
      this.protein += selectedForDeletion.protein
      this.calories += selectedForDeletion.calories
      this.fat += selectedForDeletion.fat
    },
    clearAll: function() {
      minusTag = document.getElementsByTagName('td')
      for (i = 0; i < minusTag.length; i++) {
        if (minusTag[i].className === "fas fa-minus") {
          minusTag[i].className ="fas fa-plus"
        }
      }
      for (i = 0; i < this.selected.length; i++) {
        this.carbs += this.selected[i].carbs
        this.protein += this.selected[i].protein
        this.calories += this.selected[i].calories
        this.fat += this.selected[i].fat
      }
      this.selected = []
    },
    reset: function() {
      if (this.show === true) {
        this.show = false
        this.carbs = 0
        this.calories = 0
        this.protein = 0
        this.fat = 0
      }
    }
  }
})


