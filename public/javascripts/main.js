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
      var getCell = event.path[1].cellIndex
      var getRow = event.path[2].rowIndex
      // get the targetd icons
      var rowpath = document.getElementsByTagName("tr")[getRow];
      var celltag = rowpath.getElementsByTagName("td")[getCell]
      var cellClass = celltag.getElementsByClassName(getClass)[0].classList.value

      if (cellClass === "fas fa-plus") {
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
          celltag.getElementsByClassName(getClass)[0].classList.value = "fas fa-minus"
          this.addToArray(selectedForMenu)
        }
      } else if (cellClass === "fas fa-minus") {
        celltag.getElementsByClassName(getClass)[0].classList.value = "fas fa-plus"
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
      for (i = 0; i < this.selected.length; i++) {
        this.carbs += this.selected[i].carbs
        this.protein += this.selected[i].protein
        this.calories += this.selected[i].calories
        this.fat += this.selected[i].fat
      }
      this.selected = []
    }
  }
})


