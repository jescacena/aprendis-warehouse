import { DiscountLineModel } from "../model/DiscountLineModel.class"
import { ProductModel } from "../model/ProductModel.class"
import { CartLineModel } from "../model/CartLineModel.class"
import { DiscountModel } from "../model/DiscountModel.class"

// import ProductModel from '../model/ProductModel.class'
describe('Models', () => {
    it('ProductModel new', () => {
        const result = new ProductModel()
        // const result = new ProductModel('test code', 'test name', 1)
        expect(result).toBeDefined()
    })
    it('DiscountLineModel new', () => {
        const result = new DiscountLineModel()
        expect(result).toBeDefined()
    })
    it('CartLineModel new', () => {
        const result = new CartLineModel()
        expect(result).toBeDefined()
    })
    it('DiscountModel new', () => {
        const result = new DiscountModel()
        expect(result).toBeDefined()
    })
})