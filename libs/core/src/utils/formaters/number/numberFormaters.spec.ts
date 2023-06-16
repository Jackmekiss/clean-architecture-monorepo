import { formatNumberMakeFriendly } from './numberFormaters';

describe('Number formaters', () => {
  it('should format number in a friendly way', () => {
    expect(formatNumberMakeFriendly(168000)).toEqual('168 k');
  });
});
