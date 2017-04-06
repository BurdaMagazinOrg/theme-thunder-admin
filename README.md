# Thunder Admin Theme

Administration theme for the Thunder Distribution that extends and modifies 
Sevens styles for authoring UX and an integrated look and feel of the 
contributed modules used in the distribution.

## Development work in progress
This theme started as an admin theme shipped with the first RCs of the thunder
distribution and was based on Seven as a base theme merely containing fixes 
and improvements of the visual presentation regarding the modules in the
distribution.

End of 2016 the Thunder core team started a sub project regarding research and
a concept for improving the authoring UX and a 
[roadmap](https://www.drupal.org/node/2828095) was created that did naturally 
emcompass a lot of theming modifications that go far beyond mere "tweaks" of
Seven. As of now   Thunder Admin is based upon Classy as a base theme and a
fair amount of CSS and theme hooks are copied over from Seven to reduce the
number of overrides in the theme inheritance.

Currently the above history leads to the fact that there are a lot of assets
that will/might need refactoring in future development.

### Things that need refactoring:
* Asset folder structure needs to be improved to follow a clear concept
* image and icon assets need to be consolidated and reworked according to a 
  unified visual language and color scheme
* CSS that was initially only copied into SCSS needs refactoring for clarity
  and consistent use of variables
* Visual styles copied over from Seven need to be refactored to be aligned with
  Thunder Admin's design in more areas than the current focus which is content
  authoring

## Development workflow

run ``yarn install`` or ``npm install`` if you do not have yarn installed, but
it's highly recommended so check it out:
[yarn documentation](https://yarnpkg.com/)

build scripts and watch scripts are run with npm, for development run 
``npm run dev``

#### The build tasks that will be executed are:
* live-reloading dev server with browser-sync 
  ([link_css](http://drupal.org/project/link_css) Drupal module required)
* SCSS processing and autoprefixing (folder: sass to css)
* image minification (folder: images-originals to images)
* svg sprite creation (folder: images/icons to images/icon-sprite.svg)
* JS linting (folder: js)
