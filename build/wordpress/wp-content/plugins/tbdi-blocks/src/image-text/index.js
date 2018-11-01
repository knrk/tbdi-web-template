/**
 * BLOCK: tbdi Blockquotes Blocks
 */

// Import block dependencies and components
import Inspector from './components/inspector';
import ImageTextContainer from './components/image-text';
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
	URLInput,
} = wp.editor;

// Register Inspector components
const {
	Button,
	IconButton,
	Dashicon,
} = wp.components;

class ImageTextBlock extends Component {
	render() {
		// Setup the attributes
		const { 
			attributes: { 
				cardImgId, cardImgUrl, cardContent, cardTitle, cardTitleUrl, cardText, cardTextColor, cardLinkText,
			},
			setAttributes,
			isSelected,
		} = this.props;

		return [
			null,
			// Show the block controls on focus
			<Inspector key="card-inspector"
				{ ...this.props }
			/>,
			// Show the block markup in the editor
			<ImageTextContainer { ...this.props } key="card-content">
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
					className="tbdi-image-text-title"
					formattingControls={ [] }
					onChange={ ( value ) => setAttributes( { cardTitle: value } ) }
				/>
				<RichText
					tagName="p"
					placeholder={ __( 'Add text...' ) }
					keepPlaceholderOnFocus
					value={ cardText }
					formattingControls={ [] }
					className="tbdi-image-text-content"
					// style={ { color: cardTextColor } }
					onChange={ ( value ) => setAttributes( { cardText: value } ) }
				/>
				{
					isSelected && (
						<form
							key="form-link"
							// className={ `blocks-button__inline-link ab-button-${buttonAlignment}`}
							onSubmit={ event => event.preventDefault() }
							// style={ {
							// 	textAlign: buttonAlignment,
							// } }
						>
							<Dashicon icon={ 'admin-links' } />
							<URLInput
								className="button-url"
								value={ cardTitleUrl }
								onChange={ ( value ) => setAttributes( { cardTitleUrl: value } ) }
							/>
							<IconButton
								icon="editor-break"
								label={ __( 'Apply' ) }
								type="submit"
							/>
						</form>
					)
				}
				<RichText
					tagName="a"
					placeholder={ __( 'Add link text...' ) }
					keepPlaceholderOnFocus
					value={ cardLinkText }
					formattingControls={ [] }
					className="tbdi-image-text-link"
					// style={ { color: cardTextColor } }
					onChange={ ( value ) => setAttributes( { cardLinkText: value } ) }
				/>
			</ImageTextContainer>,
		];
	}
}

// Register the block
registerBlockType( 'tbdi/image-text', {
	title: __( 'Image Text' ),
	description: __( 'Standardized block with image and text' ),
	icon: 'format-quote',
	category: 'tbdi-blocks',
	attributes: {
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
			selector: '.tbdi-image-text-title',
			source: 'children',
		},
		cardTitleUrl: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'href',
		},
		cardText: {
			type: 'array',
			selector: '.tbdi-image-text-content',
			source: 'children',
		},
		cardLinkText: {
			type: 'array',
			selector: '.tbdi-image-text-link',
			source: 'children',
		},
	},

	// Render the block components
	edit: ImageTextBlock,

	// Save the attributes and markup
	save: function( props ) {
		const { attributes: { cardTitle, cardTitleUrl, cardText, cardImgUrl, cardLinkText }, setAttributes } = props;

		// Save the block markup for the front end
		return (
			<ImageTextContainer { ...props }>
				{ cardImgUrl && !! cardImgUrl.length && (
					<figure>
						<img
							className="tbdi-image-text-image"
							src={ cardImgUrl }
							alt="section card avatar"
						/>
					</figure>
				) }

				<aside>
					{ cardTitle && (
						<h3 className="tbdi-image-text-title">
							<RichText.Content
								value={ cardTitle }
							/>
						</h3>
					) }

					{ cardText && (
						<RichText.Content
							tagName="p"
							className="tbdi-image-text-content"
							value={ cardText }
						/>
					) }

					{ cardLinkText && (
						<a href={ cardTitleUrl } className="tbdi-image-text-link">{ cardLinkText }</a>
					) }
				</aside>
			</ImageTextContainer>
		);
	},
} );
