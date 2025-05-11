import type { Schema, Struct } from '@strapi/strapi';

export interface MoleculeButton extends Struct.ComponentSchema {
  collectionName: 'components_molecule_buttons';
  info: {
    displayName: 'button';
    icon: 'play';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

export interface MoleculeIconDescription extends Struct.ComponentSchema {
  collectionName: 'components_molecule_icon_descriptions';
  info: {
    displayName: 'IconDescription';
    icon: 'seed';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
  };
}

export interface SaleDiscount extends Struct.ComponentSchema {
  collectionName: 'components_sale_discounts';
  info: {
    displayName: 'Discount';
    icon: 'handHeart';
  };
  attributes: {
    endDate: Schema.Attribute.Date;
    interest: Schema.Attribute.Integer;
    price: Schema.Attribute.Decimal;
  };
}

export interface UiBanner extends Struct.ComponentSchema {
  collectionName: 'components_ui_banners';
  info: {
    displayName: 'banner';
    icon: 'pin';
  };
  attributes: {
    button: Schema.Attribute.Component<'molecule.button', false>;
    text: Schema.Attribute.Text;
  };
}

export interface UiHero extends Struct.ComponentSchema {
  collectionName: 'components_ui_heroes';
  info: {
    description: '';
    displayName: 'hero';
    icon: 'bold';
  };
  attributes: {
    button: Schema.Attribute.Component<'molecule.button', false>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    main: Schema.Attribute.Media<'images'>;
  };
}

export interface UiIconDescription extends Struct.ComponentSchema {
  collectionName: 'components_ui_icon_descriptions';
  info: {
    description: '';
    displayName: 'IconDescriptionComponent';
    icon: 'dashboard';
  };
  attributes: {
    heading: Schema.Attribute.String;
    items: Schema.Attribute.Component<'molecule.icon-description', true>;
  };
}

export interface UiImageDescription extends Struct.ComponentSchema {
  collectionName: 'components_ui_image_descriptions';
  info: {
    description: '';
    displayName: 'ImageDescription';
    icon: 'picture';
  };
  attributes: {
    description: Schema.Attribute.RichText & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    position: Schema.Attribute.Enumeration<['left', 'right']>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UiImageShortDescription extends Struct.ComponentSchema {
  collectionName: 'components_ui_image_short_descriptions';
  info: {
    description: '';
    displayName: 'ImageShortDescription';
    icon: 'filter';
  };
  attributes: {
    description: Schema.Attribute.Text;
    left: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    right: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'molecule.button': MoleculeButton;
      'molecule.icon-description': MoleculeIconDescription;
      'sale.discount': SaleDiscount;
      'ui.banner': UiBanner;
      'ui.hero': UiHero;
      'ui.icon-description': UiIconDescription;
      'ui.image-description': UiImageDescription;
      'ui.image-short-description': UiImageShortDescription;
    }
  }
}
