<?php

require __DIR__ . '/../vendor/autoload.php';

define('WPINC', 'wp-includes');

$actions = [];
$calls = [];

function plugin_dir_path($file) { return dirname($file) . '/'; }
function plugins_url($path = '', $plugin = '') { return 'https://example.test/plugins/example' . ($path ? '/' . $path : ''); }
function add_action($hook, $callback, $priority = 10, $acceptedArgs = 1) {
    global $actions;
    $actions[$hook][] = $callback;
    return true;
}
function determine_locale() { return 'sv_SE'; }
function load_textdomain($domain, $mofile, $locale = null) {
    global $calls;
    $calls['textdomain'] = [$domain, $mofile, $locale];
    return true;
}
function __($text, $domain) { return $text; }
function wp_cache_get($key, $group = '', $force = false, &$found = null) { return []; }
function wp_register_style($handle, $src, $deps = [], $ver = false, $media = 'all') {
    global $calls;
    $calls['style'] = [$handle, $src, $deps];
    return true;
}
function wp_enqueue_style($handle, $src = '', $deps = [], $ver = false, $media = 'all') {
    global $calls;
    $calls['enqueuedStyle'] = $handle;
}
function wp_register_script($handle, $src, $deps = [], $ver = false, $args = []) {
    global $calls;
    $calls['script'] = [$handle, $src, $deps, $args];
    return true;
}
function wp_enqueue_script($handle, $src = '', $deps = [], $ver = false, $args = []) {
    global $calls;
    $calls['enqueuedScript'] = $handle;
}
function wp_localize_script($handle, $objectName, $data) {
    global $calls;
    $calls['localization'] = [$handle, $objectName, $data];
    return true;
}

function check($condition, $message) {
    if (!$condition) {
        throw new RuntimeException($message);
    }
}

require __DIR__ . '/../acf-openstreetmap-field.php';

check(isset($actions['init'], $actions['acf/include_field_types'], $actions['admin_enqueue_scripts'], $actions['enqueue_block_editor_assets']), 'Plugin hooks were not registered');
check(ACFOPENSTREETMAP_URL === 'https://example.test/plugins/example', 'Plugin URL changed');
$actions['init'][0]();
check($calls['textdomain'] === ['acf-openstreetmap-field', ACFOPENSTREETMAP_PATH . 'languages/acf-openstreetmap-field-sv_SE.mo', null], 'Text domain was not loaded');

check(str_contains(ACFOPENSTREETMAP_PATH, '/wp-content/plugins/'), 'Run this check from a WordPress plugins directory');
foreach (['admin_enqueue_scripts', 'enqueue_block_editor_assets'] as $hook) {
    $calls = [];
    $actions[$hook][0]();
    check($calls['style'] === ['css-maincss', 'https://example.test/plugins/example/assets/dist/css/main.css', []], "$hook: style registration changed");
    check($calls['enqueuedStyle'] === 'css-maincss', "$hook: style was not enqueued");
    check($calls['script'] === ['js-initjs', 'https://example.test/plugins/example/assets/dist/js/init.js', ['acf-input', 'jquery'], true], "$hook: script registration changed");
    check($calls['enqueuedScript'] === 'js-initjs', "$hook: script was not enqueued");
    check($calls['localization'][0] === 'js-initjs' && $calls['localization'][1] === 'language' && $calls['localization'][2]['unnamedImageOverlay'] === 'Unnamed image overlay', "$hook: script localization changed");
}

echo "wpservice integration OK\n";
