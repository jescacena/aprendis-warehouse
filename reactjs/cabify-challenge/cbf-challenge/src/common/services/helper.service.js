import DataService from "./data.service";
import { Checkout } from "./checkout";

let checkout

const HelperService = {

    discoverDiscountsApplied (cartLines) {
        const pricingRules = DataService.buildPricingRulesFromCatalog(cartLines)
        
        checkout = new Checkout(pricingRules)

        cartLines.forEach(item => {
            for (let index = 0; index < item.quantity; index++) {
                checkout = checkout.scan(item.code)
            }
        })

        return checkout.getDiscountsApplied()
    },

    getTotalCheckout (cartLines) {
        const pricingRules = DataService.buildPricingRulesFromCatalog(cartLines)

        checkout = new Checkout(pricingRules)

        cartLines.forEach(item => {
            for (let index = 0; index < item.quantity; index++) {
                checkout = checkout.scan(item.code)
            }
        })

        return checkout.total()
    },

    getTotalItems (cartLines) {
        if (cartLines && cartLines.length > 0) {
            return cartLines.map(item => (!isNaN(parseInt(item.quantity)))? item.quantity: 0).reduce(this._reducer)
        }  
        return 0;
    },
    
    getTotalPrice (cartLines) {
        if (cartLines && cartLines.length > 0) {
            return cartLines.map(item => (!isNaN(parseInt(item.total)))? item.total: 0).reduce(this._reducer)
        }  
        return 0;
    },
    
    _reducer(accumulator, currentValue) {
        return parseInt(accumulator) + parseInt(currentValue)
    }
}

export default HelperService