
    <div class="off-canvas position-left reveal-for-large" id="offCanvas" data-off-canvas>


        <button class="close-button" aria-label="Close menu" type="button" data-close>
            <span class="the-button" aria-hidden="true">&times;</span>
        </button>

        <div class="osMenuItems">
            <ul>
                <li><a href="<?= get_site_url()?>">Vacancies</a></li>

                <li><a href="<?= get_site_url()?>/success-stories">Success stories</a></li>
                <li><a href="<?= get_site_url()?>/grad-scheme">Graduate Scheme</a></li>
                <li><a href="<?= get_site_url()?>/recruitment-agencies-policy/">Recruitment Policy</a></li>
                <li><a id="contactButton" href="#" data-open="contact">Contact</a></li>
                <li><a href="<?= get_site_url()?>/our-story">Our Story</a></li>
            </ul>
        </div>



    </div>

    <div id="contact" class="reveal" data-reveal>
        <div class="text-area">
            <h3>get in touch</h3>
            <p>Our direct number is 01691 683 807. Feel free to get in touch, and we’ll be more that happy to answer your questions or help you with your application. We are in the office between 9 - 5am on weekdays.</p>
        </div>

            <?php
            /**
             *  The Shortcode for Contact Form 7
             */
            echo do_shortcode('[contact-form-7 id="168" title="Contact Us"]');


            ?>
        <button class="close-button" data-close aria-label="Close modal" type="button">
            <span aria-hidden="true">&times;</span>
        </button>

    </div>

    <div id="contactSuccess" class="reveal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
        <h2 id="modalTitle">Thank You</h2>
        <p class="lead">A member of our support team will contact you shortly to answer your questions.</p>
        <div class="successTick"></div>

        <button class="close-button" data-close aria-label="Close modal" type="button">
            <span aria-hidden="true">&times;</span>
    </div>