import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { Icon, arrowLeft } from "@wordpress/icons";

export default function Save({ attributes }) {
	const {
		height,
		width,
		padding,
		backButtonBackground,
		backButtonIconColor,
		backButtonTransitionDuration,
		backButtonTransitionEasing,
		backButtonEnterFrom,
		backButtonSize,
		style, // this attribute is automatically added by the "supports" API
	} = attributes;

	return (
		<div
			{...useBlockProps.save({ className: "jumbotron" })}
			style={getCSSvariables()}
		>
			<button className="jumbotron__back-button">
				<Icon icon={arrowLeft} size={getBackButtonSize(backButtonSize)} />
			</button>
			<div className="jumbotron__sections-wrapper">
				<InnerBlocks.Content />
			</div>
		</div>
	);

	function getCSSvariables() {
		return {
			"--height": height,
			"--width": width,
			"--padding": padding,
			"--background": style?.color.background,
			"--back-button-background": backButtonBackground,
			"--back-button-icon-color": backButtonIconColor,
			"--back-button-transition-duration": backButtonTransitionDuration,
			"--back-button-transition-easing": backButtonTransitionEasing,
			"--back-button-transform": getBackButtonTransform(backButtonEnterFrom),
		};
	}

	function getBackButtonSize(sizeString) {
		return {
			small: 20,
			medium: 24,
			large: 36,
		}[sizeString];
	}

	function getBackButtonTransform(entryDirection) {
		return {
			top: "translateY(-20vh)",
			right: "translateX(20vw)",
			bottom: "translateY(95vh)",
			left: "translateX(-95vw)",
		}[entryDirection];
	}
}
