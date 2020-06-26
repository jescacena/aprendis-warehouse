import { Checkout } from '../services/checkout';
import { PricingRule } from '../model/PricingRule.class';
import { DiscountModel } from '../model/DiscountModel.class';

const PRICING_RULES = [
    new PricingRule('P1', 10, new DiscountModel('N_FOR_1', 2)),
    new PricingRule('P2', 20, new DiscountModel('BULK', 5, 10)),
    new PricingRule('P3', 15, null)
];

let checkout;
let checkout2;
let checkout3;
let checkout4;

describe('Checkout class', () => {
    beforeEach(() => {
        checkout = new Checkout(PRICING_RULES);
        checkout2 = new Checkout(PRICING_RULES);
        checkout3 = new Checkout(PRICING_RULES);
        checkout4 = new Checkout(PRICING_RULES);
    });
    it('on create saves the pricingRules passed in', () => {
        expect(checkout.pricingRules.length).toBe(3);
    });
    it('scan saves the products', () => {
        const result = checkout
            .scan('P1')
            .scan('P2')
            .scan('P1');
        expect(result.products.length).toBe(3);
    });
    it('getDiscountsApplied returns valid values', () => {
        let result;

        const co = checkout2
            .scan('P1')
            .scan('P2')
            .scan('P1');
        result = co.getDiscountsApplied();
        expect(result.length).toBe(1);
    });
    it('total returns valid value', () => {
        let result;

        const co = checkout.scan('P3');
        result = co.total();
        expect(result).toBe(15.0);

        const co2 = checkout2
            .scan('P1')
            .scan('P2')
            .scan('P1');
        result = co2.total();
        expect(result).toBe(30.0);

        const co3 = checkout3
            .scan('P2')
            .scan('P2')
            .scan('P2')
            .scan('P2')
            .scan('P2')
            .scan('P3');
        result = co3.total();
        expect(result).toBe(105.0);

        const co4 = checkout4
            .scan('P2')
            .scan('P2')
            .scan('P2')
            .scan('P2')
            .scan('P2')
            .scan('P3')
            .scan('P1')
            .scan('P1')
            .scan('P1');
        result = co4.total();
        expect(result).toBe(125.0);
    });
});
