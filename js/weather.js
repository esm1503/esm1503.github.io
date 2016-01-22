$(function (){

    // Trigger listener for city change
    $('#city').on('change', function() {
        if(checkID()){
            var id = $('#city').val();
            checkWeather(id);
            $('body').fadeIn();
        } else {
            resetForm();
        }
    });

    // Listener for Format Change

    $('.formats input:radio').on('change', function() {

        var id = $('#city').val();
        if(checkID()) {
            checkWeather(id);
        } else {
            resetForm();
        }

    })

    //function to run ajax call to open weather API

    function checkWeather(id){
//        console.log(id);

        //run ajax call
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?appid=b212cbfd0ea5741132e77711a3368f7f',
            type: 'GET',
            dataType: 'json',
            data: {id: id}
        })
            .done(function (data) {
                updateName(data); //call function pass data set
                updateTemp(data);
                updateIcon(data);


            })
            .fail(function () {

                console.log("error");
            })
            .always(function () {
                console.log("complete");
            });


        //process data
    }

    //update city name and location

    function updateName(data) {
        var name = data.name;
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        var link = lat + "," + lon;

        $('#cityName').html(name);
        $('#location').html("<a href='https://www.google.com/maps/?q=" + link + "'" + "target='_blank'>" + link + "</a>");
    }

    //update temp
    function updateTemp(data) {
        var newtemp = '';
        var temp = data.main.temp;
        var format = $('.formats input:radio[name=tempFormat]:checked').val();
        if(format == 'F') {
            newtemp = convertF(temp);
        } else {
            newtemp = convertC(temp);
        }
        $('#cityTemp').html(newtemp.toFixed(1) + "&deg;");
    }

    //update weather icon
    function updateIcon(data) {
        var iconCode = data.weather[0].icon;
        var imgsrc = "http://openweathermap.org/img/w/" + iconCode + ".png";

        var desc = data.weather[0].description;
        var img = $('#icon img');
        img.attr('src', imgsrc);
        img.attr('alt', desc);
        img.addClass('.hasSrc');

        updateDesc(desc); //updates function below
        changeBackground(data);

    }

    //change background depending on weather icon code
    function changeBackground(data){
        var iconCode = data.weather[0].icon;
        console.log(iconCode);


        if (iconCode == '01d')
        $( "body").removeClass().addClass( "clear" );

        else if (iconCode == '02d' )
            $( "body").removeClass().addClass( "fewClouds" );

        else if (iconCode == '03d' )
            $( "body").removeClass().addClass( "sClouds" );

        else if (iconCode == '04d' )
            $( "body").removeClass().addClass( "clouds" );

        else if (iconCode == '09d' || iconCode == '10d')
        $( "body").removeClass().addClass( "rain" );

        else if (iconCode == '11d')
            $( "body").removeClass().addClass( "storm" );

        else if (iconCode == '50d')
        $("body").removeClass().addClass("mist");

    }

    //update description of weather
    function updateDesc(desc) {
        $('#description').text("Go outside to see the " + desc);
    }

    //convert to F
    function convertF(temp) {
        var newtemp = (temp - 273.15)* 1.8000 + 32.00;
        return newtemp;
    }
    //convert to C
    function convertC(temp) {
        var newtemp = (temp - 273.15);
        return newtemp;

    }
// check for city id to be populated
    function checkID(){
        var id = $('#city').val();
        if (id !='') {
            return true;
        } else {
            return false;
        }

    }

    // restore to defaults
    function resetForm() {
        // return to default state
        $('#cityTemp').html('-- &deg;');
        $('#cityName').text('City Weather');
        $('#icon img').attr('src', 'http://openweathermap.org/img/w/01d.png');
        $('#description').text("It's beautiful somewhere.");
        $('#location').empty();
        $("body").removeClass();

    }

});

