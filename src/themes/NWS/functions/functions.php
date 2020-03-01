<?php

function register_scripts() {
    wp_register_script( 'theme-scripts', get_theme_file_uri('assets/js/scripts-min.js'), array('theme-base'), '1.0', true );
    wp_deregister_script( 'jquery-core' );
    wp_register_script( 'jquery-core', get_theme_file_uri('assets/js/jquery.min.js'), array(), '3.4.1', true );

    wp_deregister_script( 'jquery-migrate' );
    wp_register_script( 'jquery-migrate', get_theme_file_uri('assets/js/jquery-migrate.min.js'), array(), '3.1.0', true );

    wp_register_script( 'theme-base', get_theme_file_uri('assets/js/base-min.js'), array('jquery'), '1.0', true );


    wp_enqueue_script('theme-scripts');
}

add_action( 'wp_enqueue_scripts', 'register_scripts' );

function register_styles() {

    wp_register_style( 'theme-style', get_theme_file_uri('style.css'), array(), '1.0' );

    wp_enqueue_style('theme-style');
}

add_action( 'wp_enqueue_scripts', 'register_styles' );


function remove_admin_login_header() {
    remove_action('wp_head', '_admin_bar_bump_cb');
}
add_action('get_header', 'remove_admin_login_header');


add_filter( 'wpcf7_autop_or_not', '__return_false' );



add_theme_support( 'custom-logo' );
function themename_custom_logo_setup() {
    $defaults = array(
        'height'      => 100,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
        'header-text' => array( 'site-title', 'site-description' ),
    );
    add_theme_support( 'custom-logo', $defaults );

}
add_action( 'after_setup_theme', 'themename_custom_logo_setup' );

function my_login_logo_one() {
    ?>
    <style type="text/css">
        body.login div#login h1 a {
            background-image: url(https://nwscdn.com/skin/frontend/networld/default/images/nws.png);
            background-size: inherit;
            width: 300px;
            height 20px;
            background-position: center;


            padding-bottom: 10px;
        }
    </style>
    <?php
} add_action( 'login_enqueue_scripts', 'my_login_logo_one' );

?>

<?php
function get_first_paragraph(){
    global $post;
    $str = wpautop( get_the_content() );
    $str = substr( $str, 0, strpos( $str, '</p>' ) + 4 );
    $str = strip_tags($str, '<a><strong><em><p><h3>');
    return '<p>' . $str . '</p>';
}

function the_text ()
{
    $theText = wpjm_get_the_job_description();


    echo get_first_paragraph();

    return $theText;
}