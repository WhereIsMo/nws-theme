(function($) {
    "use strict"

    $(function() {
        var $job_types_select = $('<select class="job_types_select"></select>');
        var $job_types_ul = $('form.job_filters ul.job_types');
        var $job_type_hidden = $('<input type="hidden" name="filter_job_type[]"/>');
        $job_types_ul.find('li').each(function() {
            var $li = $(this);
            var label_text = $li.find('label').text();
            var value = $li.find('input:checkbox').val();
            var $option = $('<option></option>');
            $option.text(label_text);
            $option.attr({value: value});
            $job_types_select.append($option);
        });
        $job_types_select.change(function() {
            var value = $(this).val();
            $('input:hidden[name="filter_job_type[]"]').val(value);
            var target   = $( this ).closest( 'div.job_listings' );
            target.triggerHandler( 'update_results', [ 1, false ] );
        });
        $job_types_ul.after($job_type_hidden);
        $job_types_ul.replaceWith($job_types_select);
    });
})(jQuery);


$('.search_keywords ').each(function(){

    $(this).on('click', function (){
        $(this).addClass('labelFloat');
    });

});

$(document).ready(function(){

    $('.search_keywords input').removeAttr('placeholder');

});


$(document).ready(function() {

    $('body').on('click', '.job_listings li', function() {
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $('.job_listings li').removeClass('active');
            $(this).addClass('active');
        }
    });

    $('window').on('load', function () {



        $('#jobTitle').val('<?php wpjm_the_job_title(); ?>');
        $('#jobUrl').val('<?php the_job_permalink() ?>');

    });
});


$('.wpcf7').on('wpcf7mailsent', function() {

    $('#applySuccess').foundation('open');
    console.log('done');
});


/*For the Apply Contact Form */

(function($) {
    /*Brought click function of fileupload button when text field is clicked*/
    $("#uploadtextfield").click(function() {
        $('#fileuploadfield').click()
    });

    /*Brought click function of fileupload button when browse button is clicked*/
    $("#uploadbrowsebutton").click(function() {
        $('#fileuploadfield').click()
    });

    /*To bring the selected file value in text field*/
    $('#fileuploadfield').change(function() {
        $('#uploadtextfield').val($(this).val());
    });

})(jQuery);