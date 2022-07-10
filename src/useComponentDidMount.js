import {
	useEffect,
	useRef
} from "@wordpress/element";

/**
 * Run a function onComponentDidMount
 * @param {Function} callback The callback function to be executed onComponentDidMount
 * @param {Array} dependencies List of dependencies
 */
export default function useComponentDidMount(callback, dependencies) {
	const isFirstTime = useRef(true);
	useEffect(() => {
		if (isFirstTime.current) {
			isFirstTime.current = false;
			callback();
		}
	}, dependencies)
}
