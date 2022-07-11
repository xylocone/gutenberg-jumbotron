import {
	registerBlockType
} from '@wordpress/blocks';

import './style.scss';

import Edit from "./edit";
import Save from "./save";

registerBlockType("blaze/jumbotron", {
	edit: Edit,
	save: Save,
});
