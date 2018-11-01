/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const {
  InspectorControls,
  BlockDescription,
  ColorPalette,
  MediaUpload,
} = wp.editor;

// Import Inspector components
const {
	Toolbar,
	Button,
	PanelBody,
	PanelRow,
	PanelColor,
	FormToggle,
	RangeControl,
	SelectControl,
	ToggleControl,
	IconButton,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );

		this.toggleFullWidth = this.toggleFullWidth.bind(this);
	}

	toggleFullWidth() {
		const { containerFullWidth } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes({ containerFullWidth: !containerFullWidth });
	}

	render() {

		// Setup the attributes
		const { 
			containerColumns, 
			containerFullWidth,
			containerBackgroundColor, 
			containerDimRatio, 
			containerImgURL, 
			containerImgID, 
			containerImgAlt } = this.props.attributes;
		const { setAttributes } = this.props;

		const onSelectImage = img => {
			setAttributes( {
				containerImgID: img.id,
				containerImgURL: img.url,
				containerImgAlt: img.alt,
			} );
		};

		const onRemoveImage = () => {
			setAttributes({
				containerImgID: null,
				containerImgURL: null,
				containerImgAlt: null,
			});
		}

		const containerColumnsOptions = [
			{ value: 1, label: __('One Column') },
			{ value: 2, label: __('Two Columns') },
			{ value: 3, label: __('Three Columns') },
			{ value: 4, label: __('Four Columns') },
		];

		return (
		<InspectorControls key="inspector">
			<PanelBody title={ __( 'Options' ) } initialOpen={ true }>
				<ToggleControl
					label={ __( 'Full Width' ) }
					checked={ containerFullWidth }
					onChange={ this.toggleFullWidth }
				/>
				<SelectControl
					label={__('Columns')}
					description={__('Choose how many columns should be on page')}
					options={containerColumnsOptions}
					value={containerColumns}
					onChange={(value) => this.props.setAttributes({containerColumns: value})}
				/>
			</PanelBody>

			<PanelBody title={ __( 'Background Options' ) } initialOpen={ false }>
				<p>{ __( 'Select a background image:' ) }</p>
				<MediaUpload
					onSelect={ onSelectImage }
					type="image"
					value={ containerImgID }
					render={ ( { open } ) => (
						<div>
							<IconButton
								className="ab-container-inspector-media"
								label={ __( 'Edit image' ) }
								icon="format-image"
								onClick={ open }
							>
								{ __( 'Select Image' ) }
							</IconButton>

							{ containerImgURL && !! containerImgURL.length && (
								<IconButton
									className="ab-container-inspector-media"
									label={ __( 'Remove Image' ) }
									icon="dismiss"
									onClick={ onRemoveImage }
								>
									{ __( 'Remove' ) }
								</IconButton>
							) }
						</div>
					) }
				>
				</MediaUpload>

				{ containerImgURL && !! containerImgURL.length && (
					<RangeControl
						label={ __( 'Image Opacity' ) }
						value={ containerDimRatio }
						onChange={ ( value ) => this.props.setAttributes( { containerDimRatio: value } ) }
						min={ 0 }
						max={ 100 }
						step={ 10 }
					/>
				) }

				<PanelColor
					title={ __( 'Background Color' ) }
					colorValue={ containerBackgroundColor }
					initialOpen={ false }
				>
					<ColorPalette
						label={ __( 'Background Color' ) }
						value={ containerBackgroundColor }
						onChange={ ( value ) => this.props.setAttributes( { containerBackgroundColor: value } ) }
					/>
				</PanelColor>
			</PanelBody>
		</InspectorControls>
		);
	}
}
