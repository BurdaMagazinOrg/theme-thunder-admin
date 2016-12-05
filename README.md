# Thunder Admin Theme

## Development workflow

run ``yarn install`` or ``npm install`` if you do not have yarn installed, but it's highly recommended so check it out: [yarn documentation](https://yarnpkg.com/)

build scripts and watch scripts are run with npm, for development run ``npm run dev``

#### The build tasks that will be executed are:
* live-reloading dev server with browser-sync ([link_css](http://drupal.org/project/link_css) Drupal module required)
* SCSS processing and autoprefixing (folder: sass to css)
* image minification (folder: images-originals to images)
* svg sprite creation (folder: images/icons to images/icon-sprite.svg)
* JS linting (folder: js)
