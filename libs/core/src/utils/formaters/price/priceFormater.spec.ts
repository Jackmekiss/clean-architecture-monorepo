import { formatPrice } from './priceFormater';

describe('Price formater', () => {
  it('should format price', () => {
    expect(formatPrice(120)).toEqual('120€');
  });
});
