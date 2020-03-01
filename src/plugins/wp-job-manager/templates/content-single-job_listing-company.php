<?php
/**
 * Single view Company information box
 *
 * Hooked into single_job_listing_start priority 30
 *
 * This template can be overridden by copying it to yourtheme/job_manager/content-single-job_listing-company.php.
 *
 * @see         https://wpjobmanager.com/document/template-overrides/
 * @author      Automattic
 * @package     wp-job-manager
 * @category    Template
 * @since       1.14.0
 * @version     1.32.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! get_the_company_name() ) {
	return;
}
?>
<div class="company">

    <picture>
        <source srcset="<?= get_theme_root_uri()?>/NWS/assets/media/OurStory/osHeadSmall.png"
                media="(max-width: 767px)">
        <source srcset="<?= get_theme_root_uri()?>/NWS/assets/media/OurStory/osHeadLowRes.png"
                media="(max-width: 1024px)">
        <img src="<?= get_theme_root_uri()?>/NWS/assets/media/OurStory/osHead2K.png" alt="Why are we here... Just to suffer..." />
    </picture>

    <div class="title"><h3>A bit about Net World Sports</h3></div>
	<p class="tagline">Join Net World Sports on our mission to become the world’s leading sports equipment retailer. Nothing excites us more than finding hungry, talented individuals and unleashing them in a team capable of achieving incredible things.</p>

	<?php the_company_video(); ?>
</div>
