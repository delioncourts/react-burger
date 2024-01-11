import { burgerConstructorReducer, defaultState } from "./burger-constructor";


describe('check burger constructor reducer', () => {
    
    test('should return the initial (default) state', () => {
        expect(burgerConstructorReducer(undefined, {})).toEqual(defaultState);
    });
})