import { defaultState, authReducer } from "./auth";

describe('check auth reducer', () => {
    
    test('should return the initial (default) state', () => {
        expect(authReducer(undefined, {})).toEqual(defaultState);
    });
})