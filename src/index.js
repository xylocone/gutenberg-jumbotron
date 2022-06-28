import {
	registerBlockType
} from '@wordpress/blocks';

import './style.scss';

import Edit from './edit';
import Save from './save';


registerBlockType("blaze/jumbotron", {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	save: Save,
});
