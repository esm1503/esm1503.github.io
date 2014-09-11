$(document).ready(function() {

    var tag = '';
    getSearch();
    slideTransition();

    function getSearch(){
        $('form').on('submit', function(event) {
            event.preventDefault();
            getUrl();
            $('#counter').show();
            //reset
            $('#pSearch').val('');
            $('#imageList').empty();
            $("#current").text("1");
        })
    };

    function addValue(){ //gathering data from input
        var tag = $('#pSearch').val();
            console.log(tag);
        var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2701794e0b4da06138d1de3ba7ba12a0&tags=' + tag + '&per_page=50&page=1&format=json&jsoncallback=?';
            console.log(url);
        return url
    }

    function getUrl(){
        var tag = $('#pSearch').val();
        var url = addValue();
        console.log(url);
        $.getJSON(url, function(data){

            data.photos.photo.forEach(function(o){
                console.log(getFlickrUrl(o));
                $('#imageList').append("<img class='sImage' src='" + getFlickrUrl(o) +  "'>");
            })

            $('.sImage:gt(0)').hide(); //hide all images after first
            getCount();
             if($('img').length == 0){
                 $('#imageList').html('<h3>Sorry! There are no matches for ' + '"' + tag + '".</h3>');
                 $('#counter').hide();
             }
        })
    }


    function getFlickrUrl(obj) {
        return 'https://c2.staticflickr.com'
            + '/' + obj.farm
            + '/' + obj.server
            + '/' + obj.id
            + '_' + obj.secret
            + '_' + 'z' +'.jpg'
    }

    //counter for number of images
    function getCount(){
        var countT = $('#imageList').find('img').length;
        $('#total').text(countT); //displays total number of images
        console.log(countT);
    }

//click image to transition to next and return to first once the last image is clicked
    function slideTransition(){

        $('#imageList').on("click", '.sImage', function(){
            var $current = $(this);
            var $slides = $('.sImage');

            if($current.is($slides.last())) {
                $("#current").text("1");
                $current.hide();
                $slides.first().fadeIn().show();
            } else {
                $("#current").text($current.next().index()+1);
                $current.hide().next().fadeIn().show();
            }
        });

    }

});