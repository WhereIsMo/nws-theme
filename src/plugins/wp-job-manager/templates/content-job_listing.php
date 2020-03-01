

<?php
/**
 * Job listing in the loop.
 *
 * This template can be overridden by copying it to yourtheme/job_manager/content-job_listing.php.
 *
 * @see         https://wpjobmanager.com/document/template-overrides/
 * @author      Automattic
 * @package     wp-job-manager
 * @category    Template
 * @since       1.0.0
 * @version     1.27.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

global $post;
?>


<li <?php job_listing_class(); ?> data-longitude="<?php echo esc_attr( $post->geolocation_lat ); ?>" data-latitude="<?php echo esc_attr( $post->geolocation_long ); ?>">


    <div class="position">
        <div class="top_data">
        <h3><?php wpjm_the_job_title(); ?></h3>

        <?php if ( get_option( 'job_manager_enable_types' ) ) { ?>
        <?php $types = wpjm_get_the_job_types(); ?>
        <?php if ( ! empty( $types ) ) : foreach ( $types as $type ) : ?>
    <p class="job-type <?php echo esc_attr( sanitize_title( $type->slug ) ); ?>"><?php echo esc_html( $type->name ); ?></p>
<?php endforeach; endif; ?>
<?php } ?>

        </div>
    </div>
    <div class="description">

        <?php


         the_text();
        ?>


    </div>
    <a href="<?php the_job_permalink() ?>" class="submit-button"> APPLY</a>

    <ul class="meta">
        <?php do_action( 'job_listing_meta_start' ); ?>


        <li class="date"><?php the_job_publish_date(); ?></li>

        <?php do_action( 'job_listing_meta_end' ); ?>
    </ul>

</li>

