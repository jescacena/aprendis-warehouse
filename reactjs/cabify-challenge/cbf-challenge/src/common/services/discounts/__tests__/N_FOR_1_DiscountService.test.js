import N_FOR_1_DiscountService from '../N_FOR_1_DiscountService';

describe('BulkDiscountService class', () => {
    it('getPriceCalculation returns valid values', () => {
        let result;
        result = N_FOR_1_DiscountService.getPriceCalculation(2, 10, 2);
        expect(result).toBe(10);

        result = N_FOR_1_DiscountService.getPriceCalculation(3, 10, 2);
        expect(result).toBe(20);

        result = N_FOR_1_DiscountService.getPriceCalculation(3, 10, 9);
        expect(result).toBe(30);
    });
});
