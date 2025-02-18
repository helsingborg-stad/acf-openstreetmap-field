<?php

/*
Plugin Name:    Acf OpenStreetMap Field
Description:    Open Street Map field for Advanced Custom Fields
Version:        1.0
Author:         Niclas Norin
*/

if (! defined('WPINC')) {
    die;
}

define('ACFOPENSTREETMAP_PATH', plugin_dir_path(__FILE__));
define('ACFOPENSTREETMAP_URL', plugins_url('', __FILE__));

if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require __DIR__ . '/vendor/autoload.php';
}

add_action( 'acf/include_field_types', 'addAcfOpenStreetMapField' );

function addAcfOpenStreetMapField() {
    require_once ACFOPENSTREETMAP_PATH . 'source/php/field.php';
}

?>