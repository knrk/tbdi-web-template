/**
 * BLOCK: tbdi Blockquotes Blocks
 */

// Import block dependencies and components
import Inspector from './components/inspector';
import Card from './components/card';
import icons from './components/icons';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Internationalization
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const {
	RichText,
	MediaUpload,
} = wp.editor;

// Register Inspector components
const {
	Button,
} = wp.components;

class CardBlock extends Component {
	render() {
		// Setup the attributes
		const { attributes: { cardImgId, cardImgUrl, cardContent, cardTitle, cardText, cardTextColor }, setAttributes } = this.props;

		return [
			null,
			// Show the block controls on focus
			<Inspector key="card-inspector"
				{ ...this.props }
			/>,
			// Show the block markup in the editor
			<Card { ...this.props } key="card-content">
				<MediaUpload
					buttonProps={ {
						className: 'change-image',
					} }
					onSelect={ ( img ) => setAttributes( { cardImgId: img.id, cardImgUrl: img.url } ) }
					type="image"
					value={ cardImgId }
					render={ ( { open } ) => (
						<Button onClick={ open }>
							{ ! cardImgId ? icons.upload : <img
								className="card-image"
								src={ cardImgUrl }
								alt="section card avatar"
							/> }
						</Button>
					) }
				/>

				<RichText
					tagName="h3"
					placeholder={ __( 'Add title' ) }
					keepPlaceholderOnFocus
					value={ cardTitle }
					className="tbdi-card-title"
					formattingControls={ [] }
					onChange={ ( value ) => setAttributes( { cardTitle: value } ) }
				/>
				<RichText
					tagName="p"
					placeholder={ __( 'Add text...' ) }
					keepPlaceholderOnFocus
					value={ cardText }
					formattingControls={ [] }
					className="tbdi-card-text"
					// style={ { color: cardTextColor } }
					onChange={ ( value ) => setAttributes( { cardText: value } ) }
				/>
			</Card>,
		];
	}
}

// Register the block
registerBlockType( 'tbdi/card', {
	title: __( 'Card Container' ),
	description: __( 'Add a card like container.' ),
	icon: 'format-quote',
	category: 'tbdi-blocks',
	attributes: {
		// cardStyle: {
		// 	type: 'string',
		// },
		// cardTextColor: {
		// 	type: 'string',
		// 	default: 'black',
		// },
		cardBackgroundColor: {
			type: 'string',
		},
		cardContent: {
			type: 'array',
			selector: '.tbdi-card',
			source: 'children',
		},
		cardImgUrl: {
			type: 'string',
			source: 'attribute',
			attribute: 'src',
			selector: 'img',
		},
		cardImgId: {
			type: 'number',
		},
		cardTitle: {
			type: 'array',
			selector: '.tbdi-card-title',
			source: 'children',
		},
		cardText: {
			type: 'array',
			selector: '.tbdi-card-text',
			source: 'children',
		},
	},

	// Render the block components
	edit: CardBlock,

	// Save the attributes and markup
	save: function( props ) {
		const { attributes: { cardTitle, cardContent, cardText, cardImgUrl }, setAttributes } = props;

		// Save the block markup for the front end
		return (
			<Card { ...props }>
				{ cardImgUrl && !! cardImgUrl.length && (
					<img
						className="card-image"
						src={ cardImgUrl }
						alt="section card avatar"
					/>
				) }

				{ cardTitle && (
					<RichText.Content
						tagName="h3"
						value={ cardTitle }
						className="tbdi-card-title"
					/>
				) }

				{ cardText && (
					<RichText.Content
						tagName="p"
						className="tbdi-card-text"
						value={ cardText }
					/>
				) }
			</Card>
		);
	},
} );
