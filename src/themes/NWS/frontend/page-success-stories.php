<?php
/*
 * Template Name: Success Template
 */

get_header();
?>


<div class="backgroundImg">
    <picture>
        <source srcset="<?= get_theme_root_uri()?>/NWS/assets/media/GradScheme/gsHEADLOWRES.png"
                media="(max-width: 767px)">
        <source srcset="<?= get_theme_root_uri()?>/NWS/assets/media/GradScheme/gsHEADLOWRES.png"
                media="(max-width: 1024px)">
        <img src="<?= get_theme_root_uri()?>/NWS/assets/media/GradScheme/gsHEAD2K.png" alt="yikes, it broke" />
    </picture>
    <div class="backgroundOverlay"></div>
</div>


<div class="off-canvas-content" data-off-canvas-content>

    <div class="gs-body-content">

        <main class="gs-site-main">


            <?php echo siteorigin_panels_render() ?>

        </main>
    </div>
    <?php get_footer() ?>

</div>



