$(window).load(function(){

    //sort boxes
    var $container = $('#wrapper');
    var toFilter = '*';

    $container.isotope({
        filter: toFilter,
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });

    $container.attr('data-current', toFilter); //highlight current active nav

    checkActive(); //highlight the all link

    //nav link sorting ability
    $('#portfolio-navigation a').click(function(){
        var title = $(this).attr('data-filter');
        var text = $(this).text();

        if(text == "Portfolio"){
            var selector = title;
        } else {
            var selector = "." + title;
        }

        $container.attr('data-current',selector); //define what the container is being filtered by

        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        checkActive();
        return false;
    });

    function checkActive(){

        $('#portfolio-navigation a').each(function(){

            $(this).css({ //set default color
                color: '#595959'
            });

            var title = $(this).attr('data-filter');
            title = '.'+title;

            if(title=='.*'){ //fix all issue
                title = '*';
            }

            var currentCat = $container.attr('data-current');

            if(title==currentCat){
                $(this).css({
                    color: '#368D86'
                });
            }

        });

    }


});

