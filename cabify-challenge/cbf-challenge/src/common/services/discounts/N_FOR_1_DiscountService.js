const N_FOR_1_DiscountService = {
    getPriceCalculation(numItems, pricePerItem, groupCount) {
        const rest = numItems % groupCount;
        const result =
            (Math.floor(numItems / groupCount) + rest) * pricePerItem;
        return Math.round(result * 100) / 100
    },

    getDiscount(productCode, numItems, pricePerItem, groupCount) {
        const discount = this.getPriceCalculation(numItems, pricePerItem, groupCount) - numItems * pricePerItem
        return {
            code: productCode,
            label: `${groupCount}x1 ${productCode} offer`,
            value: Math.round(discount * 100) / 100
        };
    }
};

export default N_FOR_1_DiscountService;
