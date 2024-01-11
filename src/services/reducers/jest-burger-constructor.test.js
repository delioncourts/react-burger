import { burgerConstructorReducer, defaultState } from "./burger-constructor";


describe('check burger constructor reducer', () => {
    
    it('should return the initial state', () => {
        expect(burgerConstructorReducer(undefined, {})).toBeDefined(defaultState);
    });
})