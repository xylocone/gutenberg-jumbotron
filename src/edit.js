import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import {
	Panel,
	PanelBody,
	PanelRow,
	TabPanel,
	__experimentalUnitControl as UnitControl,
	ToggleControl,
	ColorPalette,
	__experimentalRadioGroup as RadioGroup,
	__experimentalRadio as Radio,
} from "@wordpress/components";
import { Icon, arrowLeft } from "@wordpress/icons";
import { useState } from "@wordpress/element";

import "./editor.scss";

export default function Edit(props) {
	const {
		height,
		width,
		backButtonBackground,
		backButtonIconColor,
		backButtonTransitionDuration,
		backButtonTransitionEasing,
		backButtonEnterFrom,
		backButtonSize,
		style, // this attribute is automatically added by the "supports" API
	} = props.attributes;

	// Object containing utility variables (that aren't attributes)
	const utilVars = {
		backButtonTransform: "none",
		backButtonSize: 24,
	};

	switch (backButtonEnterFrom) {
		case "top":
			utilVars.backButtonTransform = "translateY(-20vh)";
			break;
		case "right":
			utilVars.backButtonTransform = "translateX(20vw)";
			break;
		case "bottom":
			utilVars.backButtonTransform = "translateY(95vh)";
			break;
		case "left":
			utilVars.backButtonTransform = "translateX(-95vw)";
			break;
	}

	switch (backButtonSize) {
		case "small":
			utilVars.backButtonSize = 20;
			break;
		case "medium":
			utilVars.backButtonSize = 24;
			break;
		case "large":
			utilVars.backButtonSize = 36;
			break;
	}

	const generateCSSVariables = () => {
		return {
			"--height": height,
			"--width": width,
			"--background": style?.color.background,
			"--back-button-background": backButtonBackground,
			"--back-button-icon-color": backButtonIconColor,
			"--back-button-transition-duration": backButtonTransitionDuration,
			"--back-button-transition-easing": backButtonTransitionEasing,
			"--back-button-transform": utilVars.backButtonTransform,
		};
	};

	// Utility function to change the array output of useState to an object
	const generateStateObject = (state) => {
		return {
			value: state[0],
			handler: state[1],
		};
	};

	/* STATE DECLARATION */
	const state = {
		showNow: generateStateObject(useState(false)),
	};
	const setState = (key) => state[key].handler;

	return (
		<div
			{...useBlockProps({ className: "jumbotron" })}
			style={{ ...generateCSSVariables() }}
		>
			<button
				className={`back-button ${state.showNow.value ? "revealed" : ""}`}
			>
				<Icon icon={arrowLeft} size={utilVars.backButtonSize} />
			</button>
			<div className="jumbotron__sections-wrapper">
				<InnerBlocks allowedBlocks={["blaze/section"]} />
			</div>
			<SidebarSettings
				{...props}
				parentState={state}
				setParentState={setState}
			/>
		</div>
	);
}

/**
 * Returns the controls for the Settings Sidebar
 * @param {Object} props Properties
 * @returns <InspectorControls /> representing the controls in the Settings Sidebar
 */
function SidebarSettings({
	attributes,
	setAttributes,
	parentState,
	setParentState,
}) {
	const handleAttributeChange = (attribute) => (newValue) =>
		setAttributes({ [attribute]: newValue });

	return (
		<InspectorControls key="settings">
			<Panel>
				<PanelBody title="Dimensions" initialOpen={false}>
					<PanelRow>
						<fieldset>
							<legend>{__("Height")}</legend>
							<UnitControl
								onChange={handleAttributeChange("height")}
								value={attributes.height}
							/>
						</fieldset>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<legend>{__("Width")}</legend>
							<UnitControl
								onChange={handleAttributeChange("width")}
								value={attributes.width}
							/>
						</fieldset>
					</PanelRow>
				</PanelBody>
			</Panel>
			<PanelBody title="Back Button" initialOpen={false}>
				<TabPanel
					tabs={[
						{
							name: "normal",
							title: __("Normal"),
							className: "jumbotron__back-button-controls-normal",
						},
						{
							name: "visible",
							title: __("Visible"),
							className: "jumbotron__back-button-controls-visible",
						},
					]}
				>
					{(tab) => {
						if (tab.name == "normal")
							return (
								<>
									<PanelRow>
										<fieldset>
											<ToggleControl
												checked={parentState.showNow.value}
												onChange={() =>
													setParentState("showNow")(!parentState.showNow.value)
												}
												label={__("Show now?")}
											/>
										</fieldset>
									</PanelRow>
									<PanelRow>
										<fieldset>
											<legend>{__("Background Color")}</legend>
											<ColorPalette
												value={attributes.backButtonBackground}
												onChange={handleAttributeChange("backButtonBackground")}
											/>
										</fieldset>
									</PanelRow>
									<PanelRow>
										<fieldset>
											<legend>{__("Icon Color")}</legend>
											<ColorPalette
												value={attributes.backButtonIconColor}
												onChange={handleAttributeChange("backButtonIconColor")}
											/>
										</fieldset>
									</PanelRow>
									<PanelRow>
										<fieldset>
											<legend>{__("Size")}</legend>
											<RadioGroup
												onChange={handleAttributeChange("backButtonSize")}
												label={__("Back button size")}
												checked={attributes.backButtonSize}
											>
												<Radio value="small">{__("Small")}</Radio>
												<Radio value="medium">{__("Medium")}</Radio>
												<Radio value="large">{__("Large")}</Radio>
											</RadioGroup>
										</fieldset>
									</PanelRow>
								</>
							);
						else if (tab.name == "visible")
							return (
								<>
									<PanelRow>
										<fieldset>
											<legend>{__("Enter from")}</legend>
											<Dropdown
												options={[
													{ value: "top", title: __("Top") },
													{
														value: "right",
														title: __("Right"),
													},
													{
														value: "bottom",
														title: __("Bottom"),
													},
													{
														value: "left",
														title: __("Left"),
													},
												]}
												value={attributes.backButtonEnterFrom}
												onChange={handleAttributeChange("backButtonEnterFrom")}
											/>
										</fieldset>
									</PanelRow>
									<PanelRow>
										<fieldset>
											<legend>{__("Transition Duration")}</legend>
											<UnitControl
												units={[
													{
														value: "s",
														label: "s",
														default: 1,
													},
													{
														value: "ms",
														label: "ms",
														default: 500,
													},
												]}
												value={attributes.backButtonTransitionDuration}
												onChange={handleAttributeChange(
													"backButtonTransitionDuration"
												)}
											/>
										</fieldset>
									</PanelRow>
									<PanelRow>
										<fieldset>
											<legend>{__("Transition Easing")}</legend>
											<Dropdown
												options={[
													{
														value: "ease-in",
														title: __("Ease-in"),
													},
													{
														value: "ease-out",
														title: __("Ease-out"),
													},
													{
														value: "ease-in-out",
														title: __("Ease-in-out"),
													},
												]}
												value={attributes.backButtonTransitionEasing}
												onChange={handleAttributeChange(
													"backButtonTransitionEasing"
												)}
											/>
										</fieldset>
									</PanelRow>
								</>
							);
					}}
				</TabPanel>
			</PanelBody>
		</InspectorControls>
	);
}

/**
 * Render a Dropdown menu with the given options
 * @param {Object} props Properties
 * @returns A JSX Dropdown menu
 */
function Dropdown({ options, value, onChange }) {
	return (
		<select onChange={(e) => onChange(e.currentTarget.value)}>
			{options.map((option) => (
				<option value={option.value} selected={option.value == value}>
					{option.title}
				</option>
			))}
		</select>
	);
}
