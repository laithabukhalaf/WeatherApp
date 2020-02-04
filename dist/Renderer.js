//view

class Renderer {


    renderData(cityData) {

        const source = $('#weather-template').html()
        const template = Handlebars.compile(source)
        const newHTML = template(cityData)
        $('.results').empty().append(newHTML);

    }
}
