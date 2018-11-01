<?php get_header(); ?>

<!-- site-content -->
<div class="site-content page">
	<div class="contents">
		<?php
		if ( have_posts() ) :
			while ( have_posts() ) :
				the_post();
				get_template_part( 'content', 'page' );
			endwhile;
			else :
				get_template_part( 'content', 'none' );
			endif;
		?>
	</div>
</div>
<!-- /site-content -->

<?php get_footer(); ?>
