import type { Schema, Struct } from '@strapi/strapi';

export interface MoleculeAddress extends Struct.ComponentSchema {
  collectionName: 'components_molecule_addresses';
  info: {
    displayName: 'Address';
    icon: 'check';
  };
  attributes: {
    address: Schema.Attribute.String;
    city: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    fullName: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    postCode: Schema.Attribute.String;
    region: Schema.Attribute.String;
  };
}

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
    description: '';
    displayName: 'IconDescription';
    icon: 'seed';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    illustration: Schema.Attribute.Enumeration<
      ['flask', 'leaf', 'pet', 'drop', 'face', 'diamond', 'clock', 'glass']
    >;
  };
}

export interface MoleculeItemIcon extends Struct.ComponentSchema {
  collectionName: 'components_molecule_item_icons';
  info: {
    displayName: 'ItemIcon';
    icon: 'bulletList';
  };
  attributes: {
    icon: Schema.Attribute.Enumeration<
      ['clock', 'map_pin', 'envelope', 'phone']
    >;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String;
    value: Schema.Attribute.Text;
  };
}

export interface MoleculeOrderItem extends Struct.ComponentSchema {
  collectionName: 'components_molecule_order_items';
  info: {
    displayName: 'OrderItem';
    icon: 'oneWay';
  };
  attributes: {
    price: Schema.Attribute.Decimal;
    product: Schema.Attribute.Relation<'oneToOne', 'api::product.product'>;
    quantity: Schema.Attribute.Integer;
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
      'molecule.address': MoleculeAddress;
      'molecule.button': MoleculeButton;
      'molecule.icon-description': MoleculeIconDescription;
      'molecule.item-icon': MoleculeItemIcon;
      'molecule.order-item': MoleculeOrderItem;
      'sale.discount': SaleDiscount;
      'ui.banner': UiBanner;
      'ui.hero': UiHero;
      'ui.icon-description': UiIconDescription;
      'ui.image-description': UiImageDescription;
      'ui.image-short-description': UiImageShortDescription;
    }
  }
}
