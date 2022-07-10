import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { Icon, arrowLeft } from "@wordpress/icons";

// Internal Dependencies
import AttributesContext from "./AttributesContext";
import SidebarSettings from "./SidebarSettings";
import useComponentDidMount from "./useComponentDidMount";

import "./editor.scss";

export default function Edit({ attributes, setAttributes, isSelected }) {
	function updateAttribute(attribute) {
		return (newValue) =>
			setAttributes({
				[attribute]: newValue,
			});
	}

	const {
		height,
		width,
		padding,
		isSectionOpened,
		backButtonBackground,
		backButtonIconColor,
		backButtonTransitionDuration,
		backButtonTransitionEasing,
		backButtonEnterFrom,
		backButtonSize,
		style, // this attribute is automatically added by the "supports" API
	} = attributes;

	useComponentDidMount(() => {
		window.addEventListener("sectionOpened", () => {
			updateAttribute("isSectionOpened")(true);
		});
		window.addEventListener("sectionClosed", () => {
			updateAttribute("isSectionOpened")(false);
		});
	}, [isSectionOpened]);

	return (
		<AttributesContext.Provider
			value={{
				attributes,
				setAttributes,
				isSelected,
				updateAttribute,
			}}
		>
			<div
				{...useBlockProps({
					className: `jumbotron ${isSectionOpened ? "is-section-opened" : ""}`,
				})}
				style={getCSSvariables()}
			>
				<button
					className={`jumbotron__back-button`}
					onClick={handleBackButtonClick}
				>
					<Icon icon={arrowLeft} size={getBackButtonSize(backButtonSize)} />
				</button>
				<div className="jumbotron__sections-wrapper">
					<InnerBlocks allowedBlocks={["blaze/section"]} />
				</div>
			</div>
			<SidebarSettings />
		</AttributesContext.Provider>
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

	function handleBackButtonClick() {
		window.dispatchEvent(new Event("sectionClosed"));
	}
}
