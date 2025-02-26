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
        wp_register_style(
            'css-main',
            ACFOPENSTREETMAP_URL . '/dist/' .
            $this->cacheBust->name('css/main-map.css')
        );

        wp_register_script(
            'js-init-map',
            ACFOPENSTREETMAP_URL . '/dist/' .
            $this->cacheBust->name('js/init-map.js'),
            array('acf-input', 'jquery'),
        );

        wp_enqueue_script('js-init-map');
        wp_enqueue_style('css-main');
    }

    /**
     * Render the field input
     */
    public function render_field($field) {
        $id = $this->mapId . '-' . self::$mapIndex;

        ?>
        <div class="acf-openstreetmap" data-js-openstreetmap-field>
            <input type="hidden" name="<?php echo esc_attr($field['name']); ?>" data-js-hidden-field value="<?php echo esc_attr($field['value']); ?>" id="acf-openstreetmap-hidden-<?php echo $id ?>"></input>

            <?php $this->addEditOverlay($id) ?>
            <?php $this->addMap($id) ?>
            <?php $this->addOptions() ?>
        </div>
        <?php

        self::$mapIndex++;
    }

    private function addMap($id = '')
    {
        ?>
            <div 
                class="acf-openstreetmap__map openstreetmap" 
                data-js-openstreetmap-map 
                id="map-<?php $id ?>"
                style="position: unset; height: 500px; background: #f0f0f0;">
            </div>
        <?php
    }

    private function addOptions()
    {
        ?>
            <div class="acf-openstreetmap__options">
                <div>
                    <div class="acf-openstreetmap__button" acf-openstreetmap-option role="button" data-js-value="set_start_position">Set start position</div>
                </div>
                <div>
                    <div class="acf-openstreetmap__button" acf-openstreetmap-option role="button" data-js-value="create_marker">Create marker</div>
                    <ul class="acf-openstreetmap__option-list" data-js-markers-list>
                    </ul>
                </div>
                <div>
                    <div class="acf-openstreetmap__button" acf-openstreetmap-option role="button" data-js-value="create_layer_group">Create layer</div>
                    <ul class="acf-openstreetmap__option-list" data-js-layer-group-list>
                    </ul>
                </div>
            </div>
        <?php
    }

    private function addEditOverlay($id = '')
    {
        ?>
            <div class="acf-openstreetmap__marker-edit-overlay" data-js-marker-edit-overlay data-js-marker-id>
                <div style="display: none;" data-js-marker-edit-title>
                    <label for="marker-text-<?php $id ?>">Title</label>
                    <input type="text" id="marker-text-<?php $id ?>" name="title"></input>
                </div>
                <div style="display: none;" data-js-marker-edit-url>
                    <label for="marker-url-<?php $id ?>">URL</label>
                    <input type="url" id="marker-url-<?php $id ?>" name="url"></input>
                </div>
                <div style="display: none;" data-js-marker-edit-description>
                    <label for="marker-description-<?php $id ?>">Description</label>
                    <textarea name="description" id="marker-description-<?php $id ?>" cols="30" rows="10"></textarea>
                </div>
                <div class="acf-openstreetmap__marker-edit-buttons">
                    <div class="acf-openstreetmap__button acf-openstreetmap__button--save" data-js-marker-edit-save role="button">Save</div>
                    <div class="acf-openstreetmap__button acf-openstreetmap__button--cancel" data-js-marker-edit-cancel role="button">Cancel</div>
                    <div class="acf-openstreetmap__button acf-openstreetmap__button--delete" data-js-marker-edit-delete role="button">Delete</div>
                </div>
            </div>
        <?php
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