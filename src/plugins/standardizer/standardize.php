<?php
/**
 * Plugin Name: Standardizer
 * Description: Disable some annoying generated content
 * Version:     1.0.1
 */

// Remove wp_head() injected Recent Comment styles
function remove_recent_comments_style() {
    global $wp_widget_factory;
    remove_action('wp_head', array(
        $wp_widget_factory->widgets['WP_Widget_Recent_Comments'],
        'recent_comments_style'
    ));
}
add_action('widgets_init', 'remove_recent_comments_style'); 

function add_slug_body_class($classes) {
    global $post;
    if (isset($post)) {
        $classes[] = $post->post_name;
    }

    return $classes;
}
add_filter('body_class', 'add_slug_body_class');

// Change absolute image path to relative
function switch_to_relative_url($html, $id, $caption, $title, $align, $url, $size, $alt) {
    $imageurl = wp_get_attachment_image_src($id, $size);
    $relativeurl = wp_make_link_relative($imageurl[0]);   
    $html = str_replace($imageurl[0],$relativeurl,$html);
      
    return $html;
}
add_filter('image_send_to_editor','switch_to_relative_url', 10, 8);

// Display the XHTML generator that is generated on the wp_head hook, WP version
remove_action('wp_head', 'wp_generator'); 
// Display the links to the extra feeds such as category feeds
remove_action('wp_head', 'feed_links_extra', 3); 
// Display the links to the general feeds: Post and Comment Feed
remove_action('wp_head', 'feed_links', 2); 
// Display the link to the Really Simple Discovery service endpoint, EditURI link
remove_action('wp_head', 'rsd_link');
// Display the link to the Windows Live Writer manifest file.
remove_action('wp_head', 'wlwmanifest_link');
// Disable automatical wrapping text into paragraph
remove_filter('the_content', 'wpautop');
?>