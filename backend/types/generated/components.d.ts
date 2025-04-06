import type { Schema, Struct } from '@strapi/strapi';

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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sale.discount': SaleDiscount;
    }
  }
}
