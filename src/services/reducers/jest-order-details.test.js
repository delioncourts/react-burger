import { orderDetailsReducer, defaultState } from "./order-details";

describe('check order details reducer', () => {
    
    test('should return the initial (default) state', () => {
        expect(orderDetailsReducer(undefined, {})).toEqual(defaultState);
    });
})