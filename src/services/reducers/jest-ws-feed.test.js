import { wsFeedReducer, defaultState } from "./ws-feed";

describe('check web socket feed reducer', () => {
    
    test('should return the initial (default) state', () => {
        expect(wsFeedReducer(undefined, {})).toEqual(defaultState);
    });
})