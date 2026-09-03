<?php

/*
Plugin Name:    Acf OpenStreetMap Field
Description:    Open Street Map field for Advanced Custom Fields
Version:        1.0
Author:         Niclas Norin
*/

use WpService\Implementations\NativeWpService;
use WpUtilService\WpUtilService;

if (! defined('WPINC')) {
    die;
}

$wpService = new NativeWpService();
$wpUtils = new WpUtilService($wpService);

define('ACFOPENSTREETMAP_PATH', $wpService->pluginDirPath(__FILE__));
define('ACFOPENSTREETMAP_URL', $wpService->pluginsUrl('', __FILE__));

if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require __DIR__ . '/vendor/autoload.php';
}

$wpService->addAction('init', function () use ($wpService) {
    $domain = 'acf-openstreetmap-field';
    $locale = $wpService->determineLocale();
    $mofile = $wpService->pluginDirPath(__FILE__) . 'languages/' . $domain . '-' . $locale . '.mo';

    $wpService->loadTextdomain($domain, $mofile);
});

$wpService->addAction( 'acf/include_field_types', 'addAcfOpenStreetMapField');


foreach (['admin_enqueue_scripts', 'enqueue_block_editor_assets'] as $hook) {
    $wpService->addAction($hook, function() use ($wpUtils, $hook) {
        loadScriptsAndStyle($wpUtils, $hook);
    });
}


function addAcfOpenStreetMapField() {
    require_once ACFOPENSTREETMAP_PATH . 'source/php/field.php';
}

/**
 * Enqueue scripts and styles in the admin
 */
function loadScriptsAndStyle(WpUtilService $wpUtils, string $hook) {
    $array = \AcfOpenStreetMap\Lang::getLang();
    $wpUtils
        ->enqueue(__DIR__)
        ->add('css/main.css')
        ->add('js/init.js', ['acf-input', 'jquery'])
        ->with()
        ->translation('language', $array);
}