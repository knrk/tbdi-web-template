/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const {
	InspectorControls,
	ColorPalette,
} = wp.editor;

// Import Inspector components
const {
	ToggleControl,
	SelectControl,
	PanelBody,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	render() {
		// Setup the attributes
		const { quoteStyle, quoteTextColor, quoteBackgroundColor, quoteDecoration, quoteDecorationBackgroundColor } = this.props.attributes;

		// Drop cap style options
		const quotesDecorationOptions = [
			{ value: 'swux-quotebox-transparent', label: __( 'Transparent' ) },
			{ value: 'swux-quotebox-simple', label: __( 'Simple' ) },
			{ value: 'swux-quotebox-tiled', label: __( 'Tiled' ) },
		];

		return (
			<InspectorControls key="inspector">
				{/* <PanelBody>
					<SelectControl
						label={ __( 'Quote Tile Style' ) }
						description={ __( 'Choose style of the quotes.' ) }
						options={ quotesDecorationOptions }
						value={ quoteStyle }
						onChange={ ( value ) => this.props.setAttributes( { quoteStyle: value } ) }
					/>

					<p>Background Color</p>
					<ColorPalette
						value={ quoteBackgroundColor }
						onChange={ ( value ) => this.props.setAttributes( { quoteBackgroundColor: value } ) }
					/>
					<p>Text Color</p>
					<ColorPalette
						value={ quoteTextColor }
						onChange={ ( value ) => this.props.setAttributes( { quoteTextColor: value } ) }
					/>
					<br />
					<hr />
					<p><b>Decoration</b></p>
					<ToggleControl
						label={ __( 'Display' ) }
						checked={ quoteDecoration }
						onChange={ () => this.props.setAttributes( { quoteDecoration: ! quoteDecoration } ) }
					/>
					<ColorPalette
						value={ quoteDecorationBackgroundColor }
						onChange={ ( value ) => this.props.setAttributes( { quoteDecorationBackgroundColor: value } ) }
					/>
				</PanelBody> */}
			</InspectorControls>
		);
	}
}
