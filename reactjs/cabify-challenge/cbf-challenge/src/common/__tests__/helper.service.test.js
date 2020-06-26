import HelperService from '../services/helper.service';

const cartLines = [
    {
        code: 'CAP',
        name: 'Cabify Cap',
        price: 5,
        image: 'cap.png',
        discount: { id: 'N_FOR_1', numItems: 2 },
        quantity: 1,
        total: 5
    },
    {
        code: 'TSHIRT',
        name: 'Cabify T-Shirt ',
        price: 20,
        image: 'shirt.png',
        discount: null,
        quantity: 3,
        total: 60
    },
    {
        code: 'MUG',
        name: 'Cafify Coffee Mug',
        price: 7.5,
        image: 'mug.png',
        discount: { id: 'BULK', numItems: 3, percentage: 5 },
        quantity: 0,
        total: 0
    },
    {
        code: 'MUG',
        name: 'Cafify Coffee Mug',
        price: 7.5,
        image: 'mug.png',
        discount: { id: 'BULK', numItems: 3, percentage: 5 },
        quantity: null,
        total: null
    }
];
describe('HelperService', () => {
    describe('getTotalItems', () => {
        it('calculates valid total', () => {
            const result = HelperService.getTotalItems(cartLines);
            expect(result).toBe(4)
        })
    });
    describe('getTotalPrice', () => {
        it('calculates valid total', () => {
            const result = HelperService.getTotalPrice(cartLines);
            expect(result).toBe(65)
        })
    });
});
