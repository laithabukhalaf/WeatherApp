

//model
class TempManager {
  constructor() { this.cityData = [] }

  async getDataFromDB() {
    const DBdata = await $.get('/cities')
    if (DBdata.length >= 1) { DBdata.forEach(d => this.cityData.push(d)) }
  }

  async getCityData(cityName) {
    let city = await $.get(`/city/${cityName}`)
    // console.log(city)

    this.cityData.push({
      name: city.name,
      temperature: city.main.temp,
      condition: city.weather[0].main,
      conditionPic: `http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`,
      
    })
  }

  async saveCity(cityName) {
    const citytosave = this.cityData.find(c => c.name === cityName)
    if (citytosave) { await $.post('/city/', citytosave) }
  }




  removeCity(cityName) {
    for (let i = 0; i < this.cityData.length; i++) {
      if (cityName === this.cityData[i].name) {
        this.cityData.splice(i, 1)
      }
    }
    $.ajax({
      method: "DELETE",
      url: '/city/' + cityName,
      type: JSON,
      success: function (url) { console.log(url) },
      error: function (xhr, text, error) { console.log(text) }
    })
  }

  
  

   updateCity(cityName) {
    $.ajax({
      url: `/city/${cityName}`,
      method: 'PUT',
      Type:JSON
    })
      .then(   (data) =>{
        let index = this.cityData.findIndex(c => c.name == cityName)//because it has to search for the index of that city
        this.cityData[index].temperature = data.main.temp
        this.cityData[index].condition = data.weather[0].description
        // console.log(data.weather[0].icon)
        this.cityData[index].conditionPic = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        console.log(data)
      }
      )
      .catch(function(err){
        
      })
    
  }

}
















        //   this.cityData.forEach(c => c.updatedAt = new Date(c.updatedAt))        











