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
    private $mapId = null;
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
        $id = $this->getMapId() . '-' . self::$mapIndex++;

        ?>
        <div class="acf-openstreetmap openstreetmap" data-js-openstreetmap-field>
            <?php $this->addSettings($id) ?>
            <style data-js-style></style>
            <input type="hidden" name="<?php echo esc_attr($field['name']); ?>" data-js-hidden-field value="<?php echo esc_attr($field['value']); ?>" id="acf-openstreetmap-hidden-<?php echo $id; ?>"></input>

            <?php $this->addEditOverlay($id) ?>
            <?php $this->addMap($id) ?>
            <?php $this->addOptions() ?>
        </div>
        <?php

        self::$mapIndex++;
    }

    private function getMapId() {
        if ($this->mapId) {
            return $this->mapId;
        }

        $this->mapId = uniqid();
        return $this->mapId;
    }

    private function addMap($id = '')
    {
        ?>
            <div 
                class="acf-openstreetmap__map" 
                data-js-openstreetmap-map 
                id="map-<?php echo $id; ?>"
                style="position: unset; height: 700px; background: #f0f0f0;">
            </div>
        <?php
    }

    private function addSettings($id = '') 
    {
        ?>
        <h2 style="padding: .5rem 0; font-weight: bold;">General Settings</h2>
            <div class="acf-openstreetmap__settings">
                <div class="acf-openstreetmap__setting" data-js-setting-map-style>
                    <label class="title" for="setting-map-style-<?php echo $id; ?>">Map style</label>
                    <select id="setting-map-style-<?php echo $id; ?>" name="map-style">
                        <option value="default">Default</option>
                        <option value="dark">Dark</option>
                        <option value="pale">Pale</option>
                        <option value="color">Color</option>
                    </select>
                </div>
                <div class="acf-openstreetmap__setting acf-openstreetmap__option-start-position">
                    <div class="acf-openstreetmap__option-start-position-label"><label for="setting-start-position-<?php echo $id; ?>">Start position</label><span role="button" data-js-map-start-position>My start</span></div>
                    <div style="text-align: center" class="button button-primary" acf-openstreetmap-set-start-position role="button" data-js-value="set_start_position" id="setting-start-position-<?php echo $id; ?>">Set map start position</div>
                </div>
            </div>

            <h2 style="margin-top: 2rem; padding: .5rem 0; font-weight: bold;">Filter Settings</h2>
            <div class="acf-openstreetmap__settings">
                <div class="acf-openstreetmap__setting" data-js-setting-layer-filter>
                    <span class="title">Allow layer filter</span>
                    <label class="switch" for="setting-layer-filter-<?php echo $id; ?>" title="Allow layer filter">
                        <input type="checkbox" id="setting-layer-filter-<?php echo $id; ?>">
                        <span class="slider round"></span>
                    </label>
                </div>
                <div class="acf-openstreetmap__setting" data-js-setting-layer-filter-title style="display: none;">
                    <label class="title" for="setting-layer-filter-title-<?php echo $id; ?>">Layer filter title</label>
                    <input type="text" id=setting-layer-filter-title-<?php echo $id; ?>"></input>
                </div>
            </div>
        <?php
    }

    private function addOptions()
    {
        ?>
            <div class="acf-openstreetmap__options">
                <div class="acf-openstreetmap__option acf-openstreetmap__option-layer-group">
                    <ul class="acf-openstreetmap__option-list acf-openstreetmap__option-list-layer-group" data-js-layer-group-list>
                        <li class="button button-primary" default-layer-group>Default layer<div class="line-horizontal arrow-right"></div>
                        </li>
                    </ul>
                    <span class="acf-openstreetmap__button-add" acf-openstreetmap-option role="button" data-js-value="create_layer_group">Add layer [+]</span>
                </div>
                <div class="acf-openstreetmap__markers-and-image-overlay-container">
                    <div class="acf-openstreetmap__option acf-openstreetmap__option-marker">
                        <ul class="acf-openstreetmap__option-list acf-openstreetmap__option-list-marker" data-js-markers-list>
                        </ul>
                        <span>*To add a pin: Click on the map</span>
                    </div>
                    <div class="acf-openstreetmap__option acf-openstreetmap__option-image-overlay">
                        <span class="button button-large acf-openstreetmap__option-image-overlay-button" acf-openstreetmap-option role="button" data-js-value="create_image_overlay">Add image overlay <span>[+]</span></span>
                        <ul data-js-image-overlay-list class="acf-openstreetmap__option-list acf-openstreetmap__option-list-image-overlay" data-js-image-overlay-list></ul>
                    </div>
                </div>
            </div>
        <?php
    }

    private function addEditOverlay($id = '')
    {
        ?>
            <div class="acf-openstreetmap__field-edit-overlay" data-js-field-edit-overlay>
                <div class="acf-openstreetmap__field" data-js-field-edit-title>
                    <label for="field-text-<?php echo $id; ?>">Title</label>
                    <input type="text" id="field-text-<?php echo $id; ?>" name="title"></input>
                </div>
                <div class="acf-openstreetmap__field" data-js-field-edit-url>
                    <label for="field-url-<?php echo $id; ?>">URL</label>
                    <input type="url" id="field-url-<?php echo $id; ?>" name="url"></input>
                </div>
                <div class="acf-openstreetmap__field" data-js-field-edit-description>
                    <label for="field-description-<?php echo $id; ?>">Description</label>
                    <textarea name="description" id="field-description-<?php echo $id; ?>" cols="30" rows="10"></textarea>
                </div>
                <div class="acf-openstreetmap__field" data-js-field-edit-color>
                    <label for="field-color-<?php echo $id; ?>">Color</label>
                    <input type="color" id="field-color-<?php echo $id; ?>" name="color"></input>
                </div>
                <div class="acf-openstreetmap__field" data-js-field-edit-icon>
                    <label for="field-icon-<?php echo $id; ?>">Icon</label>
                    <span>Add an icon name from your library. ex. (<a target="_blank" href="https://fonts.google.com/icons">Material Symbols</a>)</span>
                    <input type="text" id="field-icon-<?php echo $id; ?>" name="icon"></input>
                </div>
                <div class="acf-openstreetmap__field" data-js-field-edit-layer>
                    <label for="field-layer-<?php echo $id; ?>">Layer</label>
                    <select id="field-layer-<?php echo $id; ?>" name="layer">
                        <option value="">Default (on the map)</option>
                    </select>
                </div>
                <div class="acf-openstreetmap__field acf-openstreetmap__setting" style="flex: unset;"  data-js-field-edit-preselected>
                    <span class="title">Show as default when filtering</span>
                    <label class="switch" for="field-preselected-<?php echo $id; ?>">
                        <input type="checkbox" id="field-preselected-<?php echo $id; ?>" name="preselected">
                        <span class="slider round"></span>
                    </label>
                </div>
                
                <div class="acf-openstreetmap__field" data-js-field-edit-image>
                    <label for="field-icon-<?php echo $id; ?>">Image</label>
                    <div style="text-align: center;" class="button button-secondary" data-js-field-edit-image-button role="button" id="field-icon-<?php echo $id; ?>">Set image</div>
                    <div data-js-field-edit-image-preview></div>
                    <input style="display: none;" type="url" name="icon"></input>
                </div>
                <div class="acf-openstreetmap__field-edit-buttons">
                    <div class="acf-openstreetmap__field-edit-buttons-cancel" data-js-field-edit-cancel role="button">Cancel &#10005;</div>
                    <div class="button button-primary button-large" data-js-field-edit-save role="button">Save</div>
                    <div class="button button-secondary button-large" data-js-field-edit-delete role="button">Delete</div>
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