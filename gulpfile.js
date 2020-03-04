    'use strict';

/* Variables */

var gulp = require('gulp');
var sass = require('gulp-sass');
var gap = require('gulp-append-prepend');
var glob = require("glob");
var fs = require("fs");
var concat = require("gulp-concat");
var minify = require('gulp-minify');
var shell = require('gulp-shell');
var util = require('gulp-util');
var path = require('path');
var del = require('del');
var exec = require('child_process').exec;
var read_yaml = require('read-yaml');

/*
Note:   buildFrontend will delete everything in the theme excluding the array below
        The path should be from the root of the theme
 */
var excludeFrontend = [
    "/assets{,**/*}",
    "/functions{,.php,**/*}",
    "/{screenshot.png,style.css}"
];

sass.compiler = require('node-sass');

var config = {
    wpThemes: "./http/wp-content/themes",
    jQuery: "./node_modules/jquery/dist/jquery.min.js",
    jQueryMigrate: "./node_modules/jquery-migrate/dist/jquery-migrate.min.js",
    foundation: "./node_modules/foundation-sites",
    slick: "./node_modules/slick-carousel",
    wp_cli: "./vendor/wp-cli/wp-cli/bin/wp",
    srcThemes: "./src/themes",
    srcPlugins: "./src/plugins"
};

const themeFolder = glob.sync(config.srcThemes + "/*");
var THEMES = [];
themeFolder.forEach(function(theme) {
    THEMES.push(theme.split("/").slice(-1).pop());
});

const env = util.env.env || process.env.NODE_ENV || "development";
const multisite = util.env.multisite || null;

/* Tasks */


gulp.task('buildWebFonts', function (done) {
    var completed = 0;
    THEMES.forEach(function(theme) {
        util.log('Start fonts for ' + theme + ' theme.');
        gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
            .pipe(gulp.dest(config.wpThemes + '/' + theme + '/assets/fonts'))
            .on('end', function () {
                util.log('End fonts for ' + theme + ' theme.');
                completed ++;
                if(completed === THEMES.length) {
                    done();
                }
            });
    });
});




gulp.task('buildSass', function(done){
    var completed = 0;
    THEMES.forEach(function(theme) {
        deleteFile(config.wpThemes + "/" + theme + "/style.css");

        gulp.src(config.srcThemes + "/" + theme + '/skin/sass/style.scss')
            .pipe(sass({outputStyle: 'compressed'})
                .on('error', sass.logError))
            .pipe(gulp.dest(config.wpThemes + '/' + theme))
            .on('end', function(){
                gulp.src(config.wpThemes + '/' + theme + '/style.css')
                    .pipe(gap.prependText(getThemeConfig(theme)))
                    .pipe(gulp.dest(config.wpThemes + '/' + theme))
                    .on('end', function(){
                        completed++;
                        if(completed === THEMES.length) {
                            done();
                        }
                    });
            });
    });
});

gulp.task('buildFunctions', function(done){
    var completed = 0;
    THEMES.forEach(function(theme) {
        deleteFolderRecursive(config.wpThemes + "/" + theme + "/functions");
        deleteFile(config.wpThemes + "/" + theme + "/functions.php");

        var output = "<?php\n";
        var functions = glob.sync(config.srcThemes + "/" + theme + "/functions/**/*.php");

        functions.forEach(function(func) {
            output += "include \"" + func.replace(".\/src\/themes\/" + theme + "\/", "") + "\";\n";
        });

        fs.writeFileSync(config.wpThemes + '/' + theme + '/functions.php', output);

        gulp.src(config.srcThemes + '/' + theme + '/functions/**/*.php')
            .pipe(gulp.dest(config.wpThemes + '/' + theme + '/functions'))
            .on('end', function(){
                completed++;
                if(completed === THEMES.length) {
                    done();
                }
            });
    });
});

gulp.task('buildJquery', function(done){
    var completed = 0;
    THEMES.forEach(function(theme) {
        gulp.src([config.jQuery, config.jQueryMigrate])
            .pipe(gulp.dest(config.wpThemes + "/" + theme + "/assets/js"))
            .on('end', function(){
                completed++;
                if(completed === THEMES.length) {
                    done();
                }
            });
    });
});

gulp.task('baseJs', function(done){
    var completed = 0;
    var foundationJs = config.foundation + '/dist/js/plugins/foundation.';
    var baseFiles = [
        foundationJs + "core.js",
        foundationJs + "util.*.js",
        foundationJs + "abide.js",
        foundationJs + "accordion.js",
        foundationJs + "accordionMenu.js",
        foundationJs + "drilldown.js",
        foundationJs + "dropdown.js",
        foundationJs + "dropdownMenu.js",
        foundationJs + "equalizer.js",
        foundationJs + "interchange.js",
        foundationJs + "magellan.js",
        foundationJs + "offcanvas.js",
        foundationJs + "orbit.js",
        foundationJs + "responsiveMenu.js",
        foundationJs + "responsiveToggle.js",
        foundationJs + "reveal.js",
        foundationJs + "slider.js",
        foundationJs + "sticky.js",
        foundationJs + "tabs.js",
        foundationJs + "toggler.js",
        foundationJs + "tooltip.js",
        config.slick + "/slick/slick.min.js"
    ];

    THEMES.forEach(function(theme){
        deleteFile(config.wpThemes + "/" + theme + "/assets/js/base.js");

        gulp.src(baseFiles)
            .pipe(concat("base.js"))
            .pipe(minify())
            .pipe(gulp.dest(config.wpThemes + "/" + theme + "/assets/js"))
            .on('end', function(){
                completed++;
                if(completed === THEMES.length) {
                    done();
                }
            });
    });
});

gulp.task('buildJs', function(done){
    var completed = 0;
    THEMES.forEach(function(theme) {
        deleteFile(config.wpThemes + "/" + theme + "/assets/js/scripts.js");
        deleteFile(config.wpThemes + "/" + theme + "/assets/js/scripts-min.js");

        gulp.src(config.srcThemes + "/" + theme + "/skin/js/*.js")
            .pipe(concat("scripts.js"))
            .pipe(minify())
            .pipe(gulp.dest(config.wpThemes + "/" + theme + "/assets/js"))
            .on('end', function(){
                completed++;
                if(completed === THEMES.length) {
                    done();
                }
            });
    });
});

gulp.task('buildFonts', function(done){
    var completed = 0;
    THEMES.forEach(function(theme) {
        deleteFolderRecursive(config.wpThemes + "/" + theme + "/assets/fonts");

        gulp.src(config.srcThemes + "/" + theme + "/skin/fonts/**/*")
            .pipe(gulp.dest(config.wpThemes + "/" + theme + "/assets/fonts"))
            .on('end', function(){
                completed++;
                if(completed === THEMES.length) {
                    done();
                }
            });
    });
});

gulp.task('buildFrontend', function(done){
    var completed = 0;
    THEMES.forEach(function(theme) {
        var delArr = [config.wpThemes + "/" + theme + "/**/*"];

        excludeFrontend.forEach(function(path){
            delArr.push("!" + config.wpThemes + "/" + theme + path);
        });
        del(delArr);

        gulp.src(config.srcThemes + "/" + theme + "/frontend/**/*")
            .pipe(gulp.dest(config.wpThemes + "/" + theme))
            .on('end', function(){
                completed++;
                if(completed === THEMES.length) {
                    done();
                }
            });
    });
});

gulp.task('buildFavicons', function(done){
    var completed = 0;
    THEMES.forEach(function(theme) {
        deleteFolderRecursive(config.wpThemes + "/" + theme + "/assets/favicons");

        gulp.src(config.srcThemes + "/" + theme + "/skin/images/favicons/*")
            .pipe(gulp.dest(config.wpThemes + "/" + theme + "/assets/favicons"))
            .on('end', function(){
                completed++;
                if(completed === THEMES.length) {
                    done();
                }
            });
    });
});

gulp.task('buildScreenshot', function(done){
    var completed = 0;
    THEMES.forEach(function(theme) {
        deleteFile(config.wpThemes + "/" + theme + "/screenshot.png");

        gulp.src(config.srcThemes + "/" + theme + "/skin/images/screenshot.png")
            .pipe(gulp.dest(config.wpThemes + "/" + theme))
            .on('end', function(){
                completed++;
                if(completed === THEMES.length) {
                    done();
                }
            });
    });
});

gulp.task('buildImages', function(done){
    var completed = 0;
    THEMES.forEach(function(theme) {
        deleteFolderRecursive(config.wpThemes + "/" + theme + "/assets/media");

        gulp.src([
            config.srcThemes + "/" + theme + "/skin/images/**/*",
            "!" + config.srcThemes + "/" + theme + "/skin/images/{favicons,favicons/**,screenshot.png}"
        ])
            .pipe(gulp.dest(config.wpThemes + "/" + theme + "/assets/media"))
            .on('end', function(){
                completed++;
                if(completed === THEMES.length) {
                    done();
                }
            });
    });
});

gulp.task('composerInstall', shell.task('composer install'));

gulp.task('composerUpdate', shell.task('composer update'));

gulp.task('wordpressDownload', shell.task("WP_CLI_CONFIG_PATH=" + getConfigPath() + " " + config.wp_cli + ' core download --path=' + getWordpressPath() + ' --locale=en_GB --skip-content --force'));

gulp.task('wordpressConfig', shell.task("WP_CLI_CONFIG_PATH=" + getConfigPath() + " " + config.wp_cli + ' config create --skip-check --force --path=' + getWordpressPath()));

gulp.task('setupDb', function(done){
    exec("WP_CLI_CONFIG_PATH=" + getConfigPath() + " " + config.wp_cli + ' db create --path=' + getWordpressPath(), function(err, stdout, stderr){
        if(err){
            console.log("Database already exists.");
        }else{
            console.log("Database does not exist. Created database.");
        }

        console.log(stdout);
        console.log(stderr);
    });

    done();
});

gulp.task('installWordpress', function(done){
    var command = "WP_CLI_CONFIG_PATH=" + getConfigPath() + " " + config.wp_cli + ' core ';

    if(multisite){
        command += "multisite-";
    }

    command += 'install --skip-email --path=' + getWordpressPath();

    exec(command, function(err, stdout, stderr){
        console.log(stdout);
        console.log(stderr);
        done(err);
    });
});

gulp.task('multisiteConfig', function(done){
    if(multisite){
        gulp.src('./config/content/**/*')
            .pipe(gulp.dest('./http/wp-content/'));

        var configSet = [
            'SUNRISE true --raw',
            'MULTISITE_SAME_LEVEL_SUBDOMAINS true --raw',
            'WP_ALLOW_MULTISITE true --raw',
            'MULTISITE true --raw',
            'SUBDOMAIN_INSTALL true --raw',
            'DOMAIN_CURRENT_SITE ' + removeUrlProtocol(getWordpressUrl()),
            'PATH_CURRENT_SITE /',
            'SITE_ID_CURRENT_SITE 1 --raw',
            'BLOG_ID_CURRENT_SITE 1 --raw'
        ];

        var commands = [];
        configSet.forEach(function(conf){
            commands.push(config.wp_cli + " config set " + conf + " --path=" + getWordpressPath());
        });

        var command = commands.join(" && ");

        exec(command, function(err, stdout, stderr){
            console.log(stdout);
            console.log(stderr);
            done(err);
        });
    }else{
        console.log('This is NOT a multisite installation so nothing was done.');
    }
    done();
});

gulp.task('buildPlugins', function(){
    return gulp.src(config.srcPlugins + "/**/*")
        .pipe(gulp.dest('./http/wp-content/plugins/'));
});

gulp.task('buildLight', gulp.series('buildSass', gulp.parallel('buildFunctions', 'buildJs', 'buildFonts', 'buildFrontend', 'buildImages', 'buildWebFonts')));

gulp.task('build', gulp.series('buildLight', gulp.parallel('buildJquery', 'baseJs', 'buildFavicons', 'buildScreenshot', 'buildPlugins')));

gulp.task('deploy', gulp.series('composerUpdate', 'wordpressConfig', 'build'));

gulp.task('install', gulp.series('composerInstall', 'wordpressDownload', 'wordpressConfig', 'setupDb', 'installWordpress', 'multisiteConfig'));

/* Functions */

function getThemeConfig(theme){
    var themeConfig = getThemeConfigObj(theme);
    var output = "/*\n";

    Object.keys(themeConfig.theme).forEach(function(key) {
        var val = themeConfig.theme[key];
        key = key.replace( /([a-z])([A-Z])/g, "$1 $2" );
        key = key.charAt(0).toUpperCase() + key.slice(1);

        output += key + ": " + val + "\n";
    });

    output += "*/";

    return output;
}

function getThemeConfigObj(theme){
    return JSON.parse(fs.readFileSync(config.srcThemes + '/' + theme + '/config.json'));
}

function getConfigPath(){
    var wpConfigPath = "./config/wordpress/" + env + "/wp-cli.yml";

    if(!fs.existsSync(wpConfigPath)){
        if(env !== "development"){
            console.log("No config file for " + env + ". Using default.");
        }

        wpConfigPath = "./config/wordpress/wp-cli.yml";
    }

    return path.resolve(wpConfigPath);
}

function getWpCliConfig(){
    return read_yaml.sync(getConfigPath());
}

function getWordpressPath(){
    return getWpCliConfig().path;
}

function getWordpressUrl(){
    return getWpCliConfig().url;
}

function removeUrlProtocol(url){
    var protocols = ['http://', 'https://'];

    protocols.forEach(function(prot){
        url = url.replace(prot, '');
    });

    return url;
}

function deleteFolderRecursive(path) {
    if(fs.existsSync(path)){
        fs.readdirSync(path).forEach(function(file){
            var curPath = path + "/" + file;

            if(fs.lstatSync(curPath).isDirectory()){
                deleteFolderRecursive(curPath);
            }else{
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

function deleteFile(path){
    if(fs.existsSync(path)){
        fs.unlinkSync(path);
    }
}