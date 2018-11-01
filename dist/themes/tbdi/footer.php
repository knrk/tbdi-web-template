<?php
/**
 * The template for displaying the footer
 * Contains the footer and the rest
 *
 * @package WordPress
 * @subpackage TBDI
 */
?>
	<footer role="contentinfo">

			<?php if ( has_nav_menu( 'social' ) ) : ?>
				<aside>
					<nav role="navigation" aria-label="<?php esc_attr_e( 'Footer Social Links Menu', 'twentysixteen' ); ?>">
						<?php
							wp_nav_menu( array(
								'theme_location' => 'social',
								'menu_class'     => 'social-links-menu',
								'depth'          => 1,
								'link_before'    => '<span class="screen-reader-text">',
								'link_after'     => '</span>',
							) );
						?>
					</nav>
				</aside>
			<?php endif; ?>

			<aside>Copyright &copy; 2017 <?php bloginfo( 'name' ); ?></aside>
	</footer>

	<?php wp_footer(); ?>
</body>
</html>