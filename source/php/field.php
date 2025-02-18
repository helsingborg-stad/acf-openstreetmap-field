<?php

namespace AcfOpenStreetMap;

use AcfOpenStreetMap\CacheBust;

class Field extends \acf_field
{
    public $name;
    public $label;
    public $category;
    public $settings;
    private $cacheBust;
    private $mapId;
    private static $mapIndex = 0;

    public function __construct() {
        $this->name = 'openstreetmap';
        $this->label = 'OpenStreetMap';
        $this->category = 'basic';
        $this->cacheBust = new CacheBust();
        $this->settings = array(
            'path' => plugin_dir_path(__FILE__),
            'dir' => plugin_dir_url(__FILE__),
        );
        $this->mapId = uniqid();

        parent::__construct();
    }

    /**
     * Enqueue scripts and styles in the admin
     */
    public function input_admin_enqueue_scripts() {
        // wp_register_style(
        //     'css-openstreetmap',
        //     ACFOPENSTREETMAP_URL . '/dist/' .
        //     $this->cacheBust->name('css/openstreetmap.css')
        // );

        wp_register_script(
            'js-init-map',
            ACFOPENSTREETMAP_URL . '/dist/' .
            $this->cacheBust->name('js/init-map.js')
        );

        wp_enqueue_script('js-init-map');
        // wp_enqueue_style('css-openstreetmap');

        // wp_enqueue_style('acf-open-street-map', $this->settings['dir'] . 'css/open-street-map.css');
    }

    /**
     * Render the field input
     */
    public function render_field($field) {
        $lat = isset($field['value']['lat']) ? esc_attr($field['value']['lat']) : '';
        $lng = isset($field['value']['lng']) ? esc_attr($field['value']['lng']) : '';
        $id = $this->mapId . '-' . self::$mapIndex;

        /* <div class="acf-openstreetmap" style="position: relative; height: 400px; width: 400px;" data-js-openstreetmap="map-<?php echo $id ?>">
            <div class="acf-openstreetmap__map" id="map-<?php echo $id ?>" data-lat="<?php echo $lat; ?>" data-lng="<?php echo $lng; ?>" style="position: unset; height: 400px; background: #f0f0f0;">
            </div>
        </div> */
        ?>
            <div class="openstreetmap" data-js-openstreetmap-field id="map-<?php echo $id ?>" data-lng="<?php echo $lng; ?>" style="position: unset; height: 400px; background: #f0f0f0;">
            </div>
        <?php

        self::$mapIndex++;
    }

    /**
     * Add custom field settings for latitude and longitude
     */
    public function render_field_settings($field) {
        acf_render_field_setting($field, array(
            'label'        => __('Default Latitude', 'acf'),
            'instructions' => __('Set a default latitude', 'acf'),
            'type'         => 'text',
            'name'         => 'default_lat',
        ));
    
        acf_render_field_setting($field, array(
            'label'        => __('Default Longitude', 'acf'),
            'instructions' => __('Set a default longitude', 'acf'),
            'type'         => 'text',
            'name'         => 'default_lng',
        ));
    }
}

new Field();