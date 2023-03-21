"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchase = exports.product = exports.user = void 0;
exports.user = [
    {
        id: '1',
        email: 'lnataliaperri@gmail.com',
        password: 'natalia123',
    },
    {
        id: '2',
        email: 'danielluis@gmail.com',
        password: 'dnl123',
    },
];
exports.product = [
    {
        id: '1',
        name: 't-shirt',
        price: 40,
        category: 'clothing',
    },
    {
        id: '2',
        name: 'pants',
        price: 80,
        category: 'clothing',
    },
];
exports.purchase = [
    {
        userId: exports.user[0].id,
        productId: exports.product[0].id,
        quantity: 1,
        totalPrice: exports.product[0].price * 1,
    },
    {
        userId: exports.user[1].id,
        productId: exports.product[1].id,
        quantity: 3,
        totalPrice: exports.product[1].price * 3,
    },
];
//# sourceMappingURL=database.js.map