import * as DiscountServiceList from './discounts'
export class Checkout {
    constructor(pricingRules) {
        this.products = []
        this.pricingRules = pricingRules;
    }

    scan(productCode) {
        const prObj = this.pricingRules.find(item => item.code === productCode)
        this.products.push(prObj)
        return this
    }


    getDiscountsApplied () {
        let result = []

        this.pricingRules.forEach(pr => {
            const foundProducts = this.products.filter(item => item.code === pr.code)
            
            if(foundProducts && foundProducts.length > 0) {
                if(pr.discount) {
                    const DiscountService = DiscountServiceList[pr.discount.id]
                    const discount = DiscountService.getDiscount(
                                                        pr.code,
                                                        foundProducts.length,
                                                        pr.price,
                                                        pr.discount.numItems,
                                                        pr.discount.percentage
                                                    )
                    if (discount.value < 0) {
                        result.push(discount)
                    }
                }
            }
        })

        return result
    }

    total() {
        let total = 0

        this.pricingRules.forEach(pr => {
            const foundProducts = this.products.filter(item => item.code === pr.code)
            
            if(foundProducts && foundProducts.length > 0) {
                if(!pr.discount) {
                    total += foundProducts.length * pr.price
                } else {
                    const DiscountService = DiscountServiceList[pr.discount.id]

                    total += DiscountService.getPriceCalculation(
                                                foundProducts.length,
                                                pr.price,
                                                pr.discount.numItems,
                                                pr.discount.percentage
                                            )

                }
            }
        })
        return parseFloat(total.toFixed(2))
    }
}