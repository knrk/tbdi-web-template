/**
 * BLOCK: Atomic Blocks Container
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import Container from './components/container';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Components
const { __ } = wp.i18n; 

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const {
	BlockControls,
	InnerBlocks,
} = wp.editor;


const blockAttributes = {
	containerColumns: {
		type: 'number',
		default: 1,
	},
	containerFullWidth: {
		type: 'boolean',
		default: false,
	},
	containerBackgroundColor: {
		type: 'string',
	},
	containerImgURL: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: 'img',
	},
	containerImgID: {
		type: 'number',
	},
	containerImgAlt: {
		type: 'string',
		source: 'attribute',
		attribute: 'alt',
		selector: 'img',
	},
	containerDimRatio: {
		type: 'number',
		default: 50,
	},
};

class ContainerBlock extends Component {
	render() {
		// Setup the attributes
		const { 
			attributes: { 
				// containerColumns,
				// containerWidth, 
				// containerBackgroundColor, 
				containerImgURL,
				// containerImgID,
				containerImgAlt,
				containerDimRatio,
			}, 
			// attributes,
			// isSelected,
			// editable,
			// className,
			setAttributes,
		} = this.props;

		// const onSelectImage = img => {
		// 	setAttributes( {
		// 		containerImgID: img.id,
		// 		containerImgURL: img.url,
		// 		containerImgAlt: img.alt,
		// 	} );
		// };

		return [
			// Show the alignment toolbar on focus
			<BlockControls key="block-controls" />,
			// Show the block controls on focus
			<Inspector key="block-inspector"
				{ ...{ setAttributes, ...this.props } }
			/>,
			// Show the container markup in the editor
			<Container { ...this.props } key="block-container">
				{ containerImgURL && !! containerImgURL.length && (
					<div className="container-image-wrap">
						<img
							className={ classnames(
								'container-image',
								dimRatioToClass( containerDimRatio ),
								{
									'has-background-dim': containerDimRatio !== 0,
								}
							) }
							src={ containerImgURL }
							alt={ containerImgAlt }
						/>
					</div>
				) }

				<div className="page-content">
					<InnerBlocks />
				</div>
			</Container>,
		];
	}
}

// Register the block
registerBlockType( 'tbdi/grid-container', {
	title: __( 'Container' ),
	description: __( 'Add a container block to wrap several blocks in a parent container.' ),
	icon: 'editor-table',
	category: 'tbdi-blocks',
	attributes: blockAttributes,

	getEditWrapperProps( { containerWidth } ) {
		if ( 'left' === containerWidth || 'right' === containerWidth || 'full' === containerWidth ) {
			return { 'data-align': containerWidth };
		}
	},

	// Render the block components
	edit: ContainerBlock,

	// Save the attributes and markup
	save: function( props ) {
		// Setup the attributes
		const {
			// containerColumns,
			// containerBackgroundColor, 
			containerImgURL,
			// containerImgID,
			containerImgAlt,
			containerDimRatio,
		} = props.attributes;

		// Save the block markup for the front end
		return (
			<Container { ...props }>

				{ containerImgURL && !! containerImgURL.length && (
					<div className="container-image-wrap">
						<img
							className={ classnames(
								'container-image',
								dimRatioToClass( containerDimRatio ),
								{
									'has-background-dim': containerDimRatio !== 0,
								}
							) }
							src={ containerImgURL }
							alt={ containerImgAlt }
						/>
					</div>
				) }

				<InnerBlocks.Content />

			</Container>
		);
	},
} );

function dimRatioToClass( ratio ) {
	return ( ratio === 0 || ratio === 50 ) ?
		null :
		'has-background-dim-' + ( 10 * Math.round( ratio / 10 ) );
}

// function backgroundImageStyles( url ) {
// 	return url ?
// 		{ backgroundImage: `url(${ url })` } :
// 		undefined;
// }