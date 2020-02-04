
//controller
const renderer=new Renderer()
const tempManager=new TempManager()

const loadPage= async function(){
    await tempManager.getDataFromDB()
    renderer.renderData(tempManager.cityData)

}

const handleSearch = async function(){
    const cityInput = $('#city-Input').val()
    await tempManager.getCityData(cityInput)
    renderer.renderData(tempManager.cityData)

}

 $('#search').on('click',function(){
    handleSearch()
    $("#city-Input").val("")
    

})

$('.results').on('click','#saveBtn',function(){//it has to be dynamic
 const cityName=$(this).siblings('.name').html()
 tempManager.saveCity(cityName)
 renderer.renderData(tempManager.cityData)
 

})

$('.results').on('click','#dltBtn',function(){//it has to be dynamic
    const cityName=$(this).siblings('.name').html()
    tempManager.removeCity(cityName)
    renderer.renderData(tempManager.cityData)
    // console.log(tempManager.cityData)

})
$('.results').on('click','#rfrBtn',function(){
    const cityName=$(this).siblings('.name').html() 
    tempManager.updateCity(cityName)
    renderer.renderData(tempManager.cityData)
})
loadPage()