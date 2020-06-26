import * as data from './api/db.json';
import { PricingRule } from '../model/PricingRule.class.js';
import { DiscountModel } from '../model/DiscountModel.class.js';

const DataService = {
    getAllProducts: function(){
        return data.default.products
    },
    buildPricingRulesFromCatalog: function(productsInCatalog) {
        return productsInCatalog.map(item => {
            return new PricingRule(
                item.code,
                item.price,
                item.discount ? new DiscountModel(item.discount.id, item.discount.numItems, item.discount.percentage) : null
            )
        })

    }

}

export default DataService;

