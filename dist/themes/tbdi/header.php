<?php
/**
 * The template for displaying the header
 *
 * Displays all of the head element and everything up until the <header>.
 *
 * @package WordPress
 * @subpackage TBDI
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	
	<meta name="keywords" content="TB development, investmet, TBDI, nemovitosti, webové aplikace, developerská činnost, investiční záměry" />
	<meta name="copyright" content="TB development &amp; investment s.r.o." />

	<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<link rel="icon" href="/favicon.png">
	<link href="https://fonts.googleapis.com/css?family=Poppins:400,700&amp;subset=latin-ext" rel="stylesheet">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<?php get_template_part( 'template-parts/content', 'sprite.svg' ); ?>

<nav role="navigation" aria-label="<?php esc_attr_e( 'Primary Menu', 'tbdi' ); ?>">
	<div class="container">
			<div class="logo">
					<svg>
							<use xlink:href="#logo"></use>
					</svg>
			</div>

			<?php if ( has_nav_menu( 'primary' ) ) : ?>
			<div class="menu">
				<?php
					wp_nav_menu( array(
						'theme_location' => 'primary',
						'menu_class'     => 'primary-menu',
						'walker'				 => new My_Nav_Menu_Walker()
						) );
				?>
			</div>
			<?php endif; ?>

	</div>
</nav>