const BULK_DiscountService = {

    getPriceCalculation(numItems, pricePerItem, numItemsOff, percentageOff) {
        const result = (numItems < numItemsOff) ?
        numItems * pricePerItem
        :
        numItems * pricePerItem - (numItems * pricePerItem * (percentageOff / 100))
        
        return Math.round(result * 100) / 100
    },
    
    getDiscount(productCode, numItems, pricePerItem, numItemsOff, percentageOff) {
        const discount = this.getPriceCalculation(numItems, pricePerItem, numItemsOff, percentageOff) - (numItems * pricePerItem)
        return {
            code: productCode,
            label: `x${numItemsOff} ${productCode} offer`,
            value: Math.round(discount * 100) / 100
        }
    }
}

export default BULK_DiscountService