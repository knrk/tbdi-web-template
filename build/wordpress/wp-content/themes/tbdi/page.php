
<?php get_header(); ?>
        

<header></header>

<main role="main">

<?php
    // Start the loop.
    while ( have_posts() ) : the_post();

        the_content();

        // End of the loop.
    endwhile;
?>

</main>
        
<?php get_footer(); ?>