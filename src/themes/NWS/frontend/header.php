<?php
/**
 * The Header
 *
 * @package Networld
 */

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title><?= __('Networld Careers'); ?></title>
    <script src="https://use.fortawesome.com/05b5a15b.js"></script>

    <?php wp_head(); ?>

</head>

<body>

<header>

    <div class="header">
        <div class="osMenu">
            <script>


                function home() {

                    location.href = "<?= get_site_url()?>";
                };

            </script>
            <div class="osLogo" onclick="home()">
                <i class="nws-fa nws-fa-nws-logo"></i>

            </div>
            <div id="menu-toggle" data-toggle="offCanvas">
                <div id="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <?php require 'burger-menu.php' ?>


        </div>
    </div>



</header>