<?php
/*
 * Template name: JobSearch
 */

get_header();
?>

<div class="backgroundImg">
    <picture>
        <source srcset="<?= get_theme_root_uri()?>/NWS/assets/media/jobs/jobsHead.png"
                media="(max-width: 767px)">
        <source srcset="<?= get_theme_root_uri()?>/NWS/assets/media/jobs/jobsHead2x.png"
                media="(max-width: 1024px)">
        <img class="headerFit" src="<?= get_theme_root_uri()?>/NWS/assets/media/jobs/jobsHead2x.png" alt="yikes, it broke" />
    </picture>
    <div class="backgroundOverlay"></div>
</div>


<div class="off-canvas-content" data-off-canvas-content>
    <div class="gs-body-content">

        <main class="gs-site-main">
            <div class="jobSearch">

                <h3>Can’t find your ideal job or just browsing?</h3>
                <p>Just enter your job search options and we’ll help you find the perfect job.</p>
    <?= do_shortcode('[jobs]'); ?>
            </div>

            <?php echo siteorigin_panels_render(); ?>
        </main>


    </div>
    <?php get_footer() ?>
</div>