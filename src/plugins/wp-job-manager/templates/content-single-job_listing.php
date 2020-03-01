<?php
/**
 * Single job listing.
 *
 * This template can be overridden by copying it to yourtheme/job_manager/content-single-job_listing.php.
 *
 * @see         https://wpjobmanager.com/document/template-overrides/
 * @author      Automattic
 * @package     wp-job-manager
 * @category    Template
 * @since       1.0.0
 * @version     1.28.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

global $post;
?>


<div class="single_job_listing">
    <?php if ( get_option( 'job_manager_hide_expired_content', 1 ) && 'expired' === $post->post_status ) : ?>
        <div class="job-manager-info"><?php _e( 'This listing has expired.', 'wp-job-manager' ); ?></div>
    <?php else : ?>
        <?php
        /**
         * single_job_listing_start hook
         *
         * @hooked job_listing_meta_display - 20
         * @hooked job_listing_company_display - 30
         */
        do_action( 'single_job_listing_start' );
        ?>




        <div class="job_description">
            <br>
            <br>
            <?php wpjm_the_job_description(); ?>

        </div>



        <p><button id="applyButton" class="button" data-open="app">Apply</button></p>

        <div id="app" class="reveal" data-reveal>
            <div class="text-area">
            <h3>Apply For Role</h3>
            <p>Sign Up to Hear from Us</p>
            </div>
            <?php
            /**
             *  The Shortcode for Contact Form 7
             */
            echo do_shortcode('[contact-form-7 id="284" title="Job Apply"]');


            ?>
            <script id="getFormData" type="text/javascript">
                $('#applyButton').on('click', function(){
                    document.getElementById("jobTitle").value = "<?= wpjm_get_the_job_title() ?>";
                    document.getElementById("jobUrl").value = "<?= get_the_job_permalink() ?>";
                });

            </script>
            <button class="close-button" data-close aria-label="Close modal" type="button">
                <span aria-hidden="true">&times;</span>
            </button>


        </div>

        <div id="applySuccess" class="reveal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
            <h2 id="modalTitle">Thank You</h2>
            <p class="lead">We Will contact you if you have been successful!</p>
            <div class="successTick"></div>

            <button class="close-button" data-close aria-label="Close modal" type="button">
                <span aria-hidden="true">&times;</span>
        </div>
        <?php
        /**
         * single_job_listing_end hook
         */
        do_action( 'single_job_listing_end' );
        ?>
    <?php endif; ?>





</div>





