/**
 * Testimonial Block Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

/**
 * Create a drop cap wrapper Component
 */
export default class Card extends Component {
	render() {
		// Setup the attributes
		const { cardBackgroundColor } = this.props.attributes;

		return (
			<div
				className={ classnames(
					this.props.className,
					// cardStyle,
					'swux-card',
				) }
				style={ {
					// color: cardTextColor,
					backgroundColor: cardBackgroundColor,
				} }
			>
				{ this.props.children }
			</div>
		);
	}
}
