$(window).load(function(){
    $('body').show();
});

$('.field').each(function(){

    $(this).on('click', function (){
        $(this).addClass('floatTop');
    });

});


$('.close-button').on('click', function(){

    $('.field').removeClass('floatTop');
});


$('.wpcf7-submit').on('click', function(){



    $('.field').removeClass('floatTop');

});




$('.wpcf7').on('wpcf7mailsent', function() {

    $('#contactSuccess').foundation('open');
    console.log('done');
});


