# Requirements

- node version ^12.4.0
- npm version ^6.9.0
- composer ^1.5.5

# Pre Install

- Run `npm install`
- Create directory in `./config/wordpress` for custom environment
- Copy `./config/wordpress/wp-cli.yml` into new directory
- Add relevant config into `./config/wordpress/<environment>/wp-cli.yml` - `path` can be set to relative path for http directory from the project root

# Install

- Run `npm start install`

Optional - add `-- --env=<environment>` to specify custom environment config.

# Post Install

- Setup theme in `./src/themes/`
- Run `npm start build`

# Theme Structure

Files listed are required.

```
src
    themes
        {Theme Name}
            frontend
                index.php
            functions
            skin
                fonts
                images
                    screenshot.png (1200px X 900px)
                js
                sass
                    style.scss
            config.json
```

## config.json

```
{
  "theme": {
    "themeName"   : "",
    "themeURI"    : "",
    "author"      : "",
    "authorURI"   : "",
    "description" : "",
    "version"     : "",
    "license"     : "",
    "licenseURI"  : "",
    "textDomain"  : "",
    "tags"        : "",
    "domainPath"  : ""
  }
}
```

# Tasks

`npm start <command>`

- `buildSass` | Compiles and deploys all themes' SASS into CSS
- `buildFunctions` | Deploys all themes' functions and generates Wordpress functions.php
- `buildJquery` | Deploys updated jQuery to all themes
- `buildJs` | Compiles and deploys all themes' JavaScript 
- `buildFonts` | Deploys any custom fonts to all themes' assets folder
- `buildFrontend` | Deploys template files to themes' root
- `buildFavicons` | Deploys themes' favicons to assets folder
- `buildScreenshot` | Deploys themes' preview screenshot
- `buildImages` | Deploys images to themes' assets/media folder
- `buildPlugins` | Deploys plugin overwrites from `./src/plugins` directory
- `buildLight` | Runs tasks `buildSass`, `buildFunctions`, `buildJs`, `buildFonts`, `buildFrontend`, `buildImages`
- `build` | Runs tasks `buildLight`, `buildJquery`, `buildFavicons`, `buildScreenshot`, `buildPlugins`
- `buildConfig` | Sets up Wordpress config file for database
- `install` | Runs `composer install`, downloads Wordpress, builds wp-config.php, creates database and installs data, and adds multisite config if necessary. 