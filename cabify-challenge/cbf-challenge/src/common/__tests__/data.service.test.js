import DataService from "../services/data.service";

describe('DataService', () => {
    it('getAllProducts', () => {
        const result = DataService.getAllProducts()
        expect(result.length).toBeGreaterThan(0)
    });

    it('buildPricingRulesFromCatalog', () => {
        const productsInCatalog = [
            {
                "code": "CAP",
                "name": "Cabify Cap",
                "price": 5.0,
                "image": "cap.png",
                "discount": { "id": "N_FOR_1", "numItems": 2 }
            },
            {
                "code": "TSHIRT",
                "name": "Cabify T-Shirt ",
                "price": 20.0,
                "image": "shirt.png",
                "discount": null
            },
            {
                "code": "MUG",
                "name": "Cafify Coffee Mug",
                "price": 7.5,
                "image": "mug.png",
                "discount": { "id": "BULK", "numItems": 3, "percentage": 5 }
            }
        ];
        const result = DataService.buildPricingRulesFromCatalog(productsInCatalog)
        expect(result.length).toBe(3)
        
    });
});
