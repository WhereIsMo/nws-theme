
<?php
/*
 * Template Name: Single
 */
get_header();
?>



<div class="backgroundImg">
    <picture>
        <source srcset="<?= get_theme_root_uri()?>/NWS/assets/media/jobs/jobsHead.png"
                media="(max-width: 767px)">
        <source srcset="<?= get_theme_root_uri()?>/NWS/assets/media/jobs/jobsHead2x.png"
                media="(max-width: 1024px)">
        <img class="headerFit" src="<?= get_theme_root_uri()?>/NWS/assets/media/jobs/jobsHead2x.png" alt="dab" />
    </picture>
    <div class="backgroundOverlay"></div>
</div>


<div class="off-canvas-content" data-off-canvas-content>

    <div class="body-content">

        <main class="site-main">

            <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

            <h1><?php the_title(); ?></h1>
            <p><?php the_content(); ?></p>

            <?php endwhile;  endif;?>
        </main>
    </div>
    <?php get_footer(); ?>
</div>
