// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

export default class ImageTextContainer extends Component {
	render() {
		// Setup the attributes
		const { cardBackgroundColor } = this.props.attributes;

		return (
			<section
				className={ classnames(
					this.props.className,
					// cardStyle,
					'tbdi-image-text',
				) }
				style={ {
					// color: cardTextColor,
					backgroundColor: cardBackgroundColor,
				} }
			>
				{ this.props.children }
			</section>
		);
	}
}
