<?php
/**
 * TBDI functions and definitions
 *
 * @package WordPress
 * @subpackage Twenty_Sixteen
 * @since Twenty Sixteen 1.0
 */
require_once('template-parts/custom-menu.php');

if (!function_exists('tbdi_setup')):
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 *
 * Create your own tbdi_setup() function to override in a child theme.
 *
 * @since Twenty Sixteen 1.0
 */
function tbdi_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed at WordPress.org. See: https://translate.wordpress.org/projects/wp-themes/tbdi
	 * If you're building a theme based on Twenty Sixteen, use a find and replace
	 * to change 'tbdi' to the name of your theme in all the template files
	 */
	load_theme_textdomain( 'tbdi' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support('title-tag');

	// This theme uses wp_nav_menu() in two locations.
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'tbdi' ),
		'social'  => __( 'Social Links Menu', 'tbdi' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	/*
	 * Enable support for Post Formats.
	 *
	 * See: https://codex.wordpress.org/Post_Formats
	 */
	add_theme_support( 'post-formats', array(
		'aside',
		'svg',
		'image',
		'video',
		'quote',
		'link',
		'gallery',
		'status',
		'audio',
		'chat',
	) );

	
}
endif; // tbdi_setup
add_action( 'after_setup_theme', 'tbdi_setup' );

/**
 * Registers a widget area.
 *
 * @link https://developer.wordpress.org/reference/functions/register_sidebar/
 *
 * @since Twenty Sixteen 1.0
 */
function tbdi_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Sidebar', 'tbdi' ),
		'id'            => 'sidebar-1',
		'description'   => __( 'Add widgets here to appear in your sidebar.', 'tbdi' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

	register_sidebar( array(
		'name'          => __( 'Content Bottom 1', 'tbdi' ),
		'id'            => 'sidebar-2',
		'description'   => __( 'Appears at the bottom of the content on posts and pages.', 'tbdi' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

	register_sidebar( array(
		'name'          => __( 'Content Bottom 2', 'tbdi' ),
		'id'            => 'sidebar-3',
		'description'   => __( 'Appears at the bottom of the content on posts and pages.', 'tbdi' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'tbdi_widgets_init' );

/**
 * Enqueues scripts and styles.
 */
function tbdi_scripts() {
	// Theme stylesheet.
	wp_enqueue_style( 'tbdi-style', get_stylesheet_uri() );
}
add_action( 'wp_enqueue_scripts', 'tbdi_scripts' );

/**
 * Adds custom classes to the array of body classes.
 *
 * @since Twenty Sixteen 1.0
 *
 * @param array $classes Classes for the body element.
 * @return array (Maybe) filtered body classes.
 */
function tbdi_body_classes( $classes ) {
	// Adds a class of custom-background-image to sites with a custom background image.
	if ( get_background_image() ) {
		$classes[] = 'custom-background-image';
	}

	return $classes;
}
add_filter( 'body_class', 'tbdi_body_classes' );

function disable_wp_emojicons() {
  // all actions related to emojis
  remove_action( 'admin_print_styles', 'print_emoji_styles' );
  remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
  remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
  remove_action( 'wp_print_styles', 'print_emoji_styles' );
  remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
  remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
  remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
}
add_action( 'init', 'disable_wp_emojicons' );

function remove_recent_comments_style() {
    global $wp_widget_factory;
    remove_action('wp_head', array($wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style'));
}
add_action('widgets_init', 'remove_recent_comments_style');

remove_action( 'wp_head', 'feed_links', 2 );
remove_action( 'wp_head', 'wp_generator' );
remove_action( 'wp_head', 'rsd_link');
remove_action( 'wp_head', 'wlwmanifest_link');
remove_action( 'wp_head', 'index_rel_link');
remove_action( 'wp_head', 'parent_post_rel_link');
remove_action( 'wp_head', 'start_post_rel_link');
remove_action( 'wp_head', 'adjacent_posts_rel_link');
remove_action( 'wp_head', 'rest_output_link_wp_head' );
remove_action( 'wp_head', 'wp_oembed_add_discovery_links');
remove_action( 'wp_head', 'wp_resource_hints', 2 );

function my_deregister_footer_scripts() {
  wp_deregister_script( 'wp-embed' );
}
add_action( 'wp_footer', 'my_deregister_footer_scripts' );

/**
 * Functions:   Optimize and style Contact Form 7 - WPCF7
 */
 add_filter('wpcf7_form_elements', function($content) {
    $content = preg_replace('/<(span).*?class="\s*(?:.*\s)?wpcf7-form-control-wrap(?:\s[^"]+)?\s*"[^\>]*>(.*)<\/\1>/i', '\2', $content);

    return $content;
});
// Remove the default Contact Form 7 Stylesheet
function remove_wpcf7_stylesheet() {
    remove_action( 'wp_head', 'wpcf7_wp_head' );
}

// Add the Contact Form 7 scripts on selected pages
function add_wpcf7_scripts() {
    if ( is_page('contact') )
        wpcf7_enqueue_scripts();
}

// Change the URL to the ajax-loader image
function change_wpcf7_ajax_loader($content) {
    if ( is_page('contact') ) {
        $string = $content;
        $pattern = '/(<img class="ajax-loader" style="visibility: hidden;" alt="ajax loader" src=")(.*)(" \/>)/i';
        $replacement = "$1".get_template_directory_uri()."/images/ajax-loader.gif$3";
        $content =  preg_replace($pattern, $replacement, $string);
    }
    return $content;
}

// If the Contact Form 7 Exists, do the tweaks
if ( function_exists('wpcf7_contact_form') ) {
    if ( ! is_admin() && WPCF7_LOAD_JS )
        remove_action( 'init', 'wpcf7_enqueue_scripts' );

    add_action( 'wp', 'add_wpcf7_scripts' );
    add_action( 'init' , 'remove_wpcf7_stylesheet' );
    add_filter( 'the_content', 'change_wpcf7_ajax_loader', 100 );
}