<?php
/**
 * Plugin Name: Blocks — Gutenberg Blocks
 * Description: 
 * Version: 1.0.0
 *
 * @package TBDI
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
