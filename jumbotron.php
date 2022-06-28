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
    register_block_type(__DIR__ . '/build', array(
        "render_callback" => "jumbotron_render_callback",
    ));
}
add_action('init', 'blaze_jumbotron_block_init');

function jumbotron_render_callback($attributes)
{
    $height = $attributes['height'];
    $width = $attributes['width'];

    $background = isset($attributes['backgroundColor']) ? 'var(--wp--preset--color--' . $attributes['backgroundColor'] . ')' : $attributes['style']['color']['background'];
    $backButtonTranslate = '';
    switch ($attributes['backButtonEnterFrom']) {
        case "top":
            $backButtonTranslate = "translateY(-20vh)";
            break;
        case "right":
            $backButtonTranslate = "translateX(20vw)";
            break;
        case "bottom":
            $backButtonTranslate = "translateY(95vh)";
            break;
        case "left":
            $backButtonTranslate = "translateX(-95vw)";
            break;
        default:
            $backButtonTranslate = "translateX(-95vw)";
            break;
    }

    $cssVars = array(
        "--back-button-background" => $attributes['backButtonBackground'],
        "--back-button-text-color" => $attributes['backButtonTextColor'],
        "--back-button-transition-duration" => $attributes['backButtonTransitionDuration'],
        "--back-button-transition-easing" => $attributes['backButtonTransitionEasing'],
        "--back-button-translate" => $backButtonTranslate,
    );

    $style_string = "height: $height; width: $width; background: $background; ";

    foreach ($cssVars as $key => $value) {
        $style_string .= "$key: $value; ";
    }

    ob_start();
    ?>
	<div class="jumbotron" style="<?php echo $style_string; ?>">
		<button class="back-button">
			&lt;
		</button>
	</div>
<?php
return ob_get_clean();
}
