import { burgerIngredientsReducer, defaultState } from "./burger-ingredients";

describe('check burger ingredients reducer', () => {
    
    test('should return the initial (default) state', () => {
        expect(burgerIngredientsReducer(undefined, {})).toEqual(defaultState);
    });
})