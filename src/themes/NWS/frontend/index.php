<?php
/**
 * The main template file.
 * index.php
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 */

get_header();
?>
<div class="body-content">
    <main class="site-main">
<?php

if ( have_posts() ) : while ( have_posts() ) : the_post();

?>

 <h1><?php the_title(); ?></h1>
        <?php
get_template_part( 'content', get_post_format() );

endwhile;  endif;
?>
    </main>
</div>
    <?php
get_footer();


?>

</div>