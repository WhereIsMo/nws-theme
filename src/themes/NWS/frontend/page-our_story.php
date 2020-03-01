
<?php
/*
 * Template Name: Our Story
 */

get_header();
?>



<div class="backgroundImg">
    <picture>
        <source srcset="<?= get_theme_root_uri()?>/NWS/assets/media/OurStory/osHeadSmall.png"
                media="(max-width: 767px)">
        <source srcset="<?= get_theme_root_uri()?>/NWS/assets/media/OurStory/osHeadLowRes.png"
                media="(max-width: 1024px)">
        <img src="<?= get_theme_root_uri()?>/NWS/assets/media/OurStory/osHead2K.png" alt="order by 9pm fuckwits" />
    </picture>
    <div class="backgroundOverlay"></div>
</div>


<div class="off-canvas-content" data-off-canvas-content>

<div class="os-body-content">

    <main class="os-site-main">


        <?php echo siteorigin_panels_render() ?>

    </main>
</div>
<?php get_footer() ?>

</div>