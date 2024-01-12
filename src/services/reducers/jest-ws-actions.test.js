import { wsOrdersReducer, defaultState } from "./ws-actions";

describe('check web socket orders actions  reducer', () => {
    
    test('should return the initial (default) state', () => {
        expect(wsOrdersReducer(undefined, {})).toEqual(defaultState);
    });
})