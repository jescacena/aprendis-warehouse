import BULK_DiscountService from '../BULK_DiscountService';

describe('BulkDiscountService class', () => {
    it('getPriceCalculationBulk returns valid values', () => {
        let result;
        result = BULK_DiscountService.getPriceCalculation(2, 10, 5, 20);
        expect(result).toBe(20);

        result = BULK_DiscountService.getPriceCalculation(5, 10, 5, 20);
        expect(result).toBe(40);

        result = BULK_DiscountService.getPriceCalculation(7, 10, 5, 20);
        expect(result).toBe(56);
    });
});
