<?php
/**
 * Plugin Name:       Jumbotron
 * Description:       A jumbotron
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       jumbotron
 *
 * @package           blaze
 */

function blaze_jumbotron_block_init()
{
    register_block_type(__DIR__ . '/build');
}
add_action('init', 'blaze_jumbotron_block_init');
