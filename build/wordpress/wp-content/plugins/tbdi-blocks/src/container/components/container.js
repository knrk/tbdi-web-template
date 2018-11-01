/**
 * Container wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

/**
 * Create a Button wrapper Component
 */
export default class Container extends Component {
	render() {
		// Setup the attributes
		const { attributes: { containerColumns, containerFullWidth, containerBackgroundColor } } = this.props;

		return (
			<article
				style={ {
					backgroundColor: containerBackgroundColor
				} }
				className={ classnames(
					this.props.className,
					'page-content',
					'grid-container',
					containerFullWidth === true ? 'full-width' : '',
					containerColumns > 1 ? `col-${containerColumns}` : ''
				) }
			>{ this.props.children }</article>
		);
	}
}
