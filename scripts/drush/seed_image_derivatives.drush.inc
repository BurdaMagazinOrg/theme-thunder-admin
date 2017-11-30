<?php

/**
 * @file
 * Implements hook_drush_command().
 *
 * Functionality provided by @jimconte:
 * https://gist.github.com/jimconte/44ed46c8551471bbce78d0b107a4751c - gist.
 */

use Drupal\Core\Database\Database;
use Drupal\image\Entity\ImageStyle;

/**
 * Register drush command.
 *
 * @return array
 *   Returns drush command definition.
 */
function seed_image_derivatives_drush_command() {

  $items = [
    'seed-image-derivatives' => [
      'category' => 'Custom Commands',
      'description' => "Create image derivatives",
      'options' => [
        'include' => [
          'description' => 'A comma separated list of all image styles needing generation, leaving this blank will use all styles',
          'example_value' => 'small,medium,thumbnail',
        ],
        'exclude' => [
          'description' => 'A comma separated list of all image styles to be excluded. Leaving this blank will use all styles from the "styles" parameter.',
          'example_value' => 'large',
        ],
        'dir' => [
          'description' => 'Set to the file path (relative to your public files directory) under which all files will have an image derivative created. Alternatively, set to "public" to just have your public files directory looked into with no recursion. With no option set, the default will run through every single file.',
          'example_value' => 'field/image',
        ],
        'purge' => [
          'description' => 'Flag to delete files if they already exist. This can be useful for replacing files that have the same name but updated content.',
        ],
      ],
      'examples' => [
        'drush seed:img:drv' => 'Creates image derivatives for every single image style for every file within the public file system.',
        'drush seed:img:drv --include=large,medium --dir=field' => 'Creates large and medium image derivatives for every single image stored underneath the "field" directory in the public file directory.',
        'drush seed:img:drv --exclude=thumbnail --dir=public' => 'Creates image derivatives for every single image style except "thumbnail" for every file within the public file system directory but not in subdirectories.',
        'drush seed:img:drv --include=thumbnail --dir=public --purge' => 'Creates image derivatives for the "thumbnail" style only and overwriting images if they exist, for every file within the public file system directory but not in subdirectories.',
      ],
      'core' => ['8'],
      'bootstrap' => DRUSH_BOOTSTRAP_DRUPAL_FULL,
      'callback' => 'seed_image_derivatives_drush_action',
      'aliases' => ['seed:img:drv'],
    ],
  ];

  return $items;
}

/**
 * Action for "seed-image-derivatives".
 */
function seed_image_derivatives_drush_action() {
  $purge = drush_get_option('purge', FALSE);
  $extensions = ['jpeg', 'jpg', 'gif', 'png'];
  $mimetypes = ['image/jpeg', 'image/jpg', 'image/gif', 'image/png'];

  $dir = rtrim(drush_get_option('dir'), '/');
  if ($dir == 'public') {
    // Finds anything that does not contain "/", should be fine.
    $file_pattern = "[^\/]*";
  }
  else {
    $file_pattern = $dir ? $dir . ".+" : ".+";
  }

  $regex = "^public:\/\/(" . $file_pattern . ")\.(" . implode($extensions, '|') . ")$";

  // Query the database for files that match this pattern.
  $query = Database::getConnection()
    ->select('file_managed', 'f');
  $andGroup = $query->andConditionGroup()
    ->condition('filemime', $mimetypes, 'IN')
    ->condition('uri', $regex, 'REGEXP');
  $query->condition($andGroup);

  $total_count = $query
    ->countQuery()
    ->execute()
    ->fetchField();

  drush_print(\Drupal::translation()->formatPlural($total_count,
    '1 entry is to have its image derivatives created.',
    '@count entries are to have their image derivatives created.')
  );

  // Select the files to have derivatives created..
  $files = $query->fields('f', ['fid', 'filename', 'uri'])
    ->execute()
    ->fetchAll();

  $excludes = explode(",", drush_get_option('exclude'));
  $includes = explode(",", drush_get_option('include'));
  $imageStyles = ImageStyle::loadMultiple();

  $display = [];

  /* @var string $name Name of Style */
  /* @var ImageStyle $style ImageStyle Object */
  foreach ($imageStyles as $name => $style) {
    if (!empty($excludes) && in_array($name, $excludes)) {
      drush_print('Excluding ' . $name);
      continue;
    }
    if (empty($includes[0]) || in_array($name, $includes)) {

      drush_print("Processing Style $name");
      $count = 1;
      foreach ($files as $file) {
        $destination = $style->buildUri($file->uri);
        if ($purge) {
          if (file_exists($destination)) {
            unlink($destination);
          }
        }
        if (!file_exists($destination)) {
          $style->createDerivative($file->uri, $destination);
        }
        __show_progress($display, $count, count($files), $name);
        $count++;

      }
      drush_print("Style $name Processed");
    }
  }
}

/**
 * Helper method to show progress.
 *
 * @param array $display
 *   Display containing array.
 * @param int $count
 *   Count.
 * @param int $total
 *   Total number.
 * @param string $name
 *   String name.
 */
function __show_progress(array &$display, $count, $total, $name) {
  if (!array_key_exists($name, $display)) {
    // Integer steps to display <= 100.
    $display[$name] = range(25, 100, 25);
  }
  $progress = ($count / $total) * 100;
  if (count($display[$name]) and $progress >= $display[$name][0]) {
    drush_print("Style $name progress " . $display[$name][0] . "%");
    array_shift($display[$name]);
  }
}
