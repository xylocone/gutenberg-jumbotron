import { useContext } from "@wordpress/element";
import { InspectorControls } from "@wordpress/block-editor";
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

// Internal dependencies
import AttributesContext from "./AttributesContext";
import Dropdown from "./Dropdown";

export default function SidebarSettings() {
	const { attributes, updateAttribute } = useContext(AttributesContext);
	return (
		<InspectorControls key="settings">
			<Panel>
				<PanelBody title={__("Dimensions")} initialOpen={false}>
					<PanelRow>
						<fieldset>
							<legend>{__("Height")}</legend>
							<UnitControl
								onChange={updateAttribute("height")}
								value={attributes.height}
							/>
						</fieldset>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<legend>{__("Width")}</legend>
							<UnitControl
								onChange={updateAttribute("width")}
								value={attributes.width}
							/>
						</fieldset>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<legend>{__("Padding")}</legend>
							<UnitControl
								onChange={updateAttribute("padding")}
								value={attributes.padding}
							/>
						</fieldset>
					</PanelRow>
				</PanelBody>
			</Panel>
			<PanelBody title={__("Back Button")} initialOpen={false}>
				<TabPanel
					tabs={[
						{
							name: "normal",
							title: __("Normal"),
						},
						{
							name: "visible",
							title: __("Visible"),
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
												checked={attributes.isSectionOpened}
												onChange={() =>
													updateAttribute("isSectionOpened")(
														!attributes.isSectionOpened
													)
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
												onChange={updateAttribute("backButtonBackground")}
											/>
										</fieldset>
									</PanelRow>
									<PanelRow>
										<fieldset>
											<legend>{__("Icon Color")}</legend>
											<ColorPalette
												value={attributes.backButtonIconColor}
												onChange={updateAttribute("backButtonIconColor")}
											/>
										</fieldset>
									</PanelRow>
									<PanelRow>
										<fieldset>
											<legend>{__("Size")}</legend>
											<RadioGroup
												onChange={updateAttribute("backButtonSize")}
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
												onChange={updateAttribute("backButtonEnterFrom")}
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
												onChange={updateAttribute(
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
												onChange={updateAttribute("backButtonTransitionEasing")}
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
