import {reducer} from './redux';


describe('reducer', () => {
    test('it should unselect all deleted colors on COLORS_LOADED', () => {
        let state;
        state = reducer({
            colors: [
                {r: 111.98902115184728, g: 216.43853726072035, b: 162.94159191667194, id: '135cz5t1jbf1z1x-'},
                {r: 175.05552740641156, g: 58.657383162133726, b: 179.14337617276004, id: '5qn7dv51i4pw+9lg'},
                {r: 255.96872798823495, g: 212.32691025386657, b: 158.66499961093064, id: 'hz8n37808xzz470+'}
            ],
            selected: {
                '135cz5t1jbf1z1x-': true,
                '5qn7dv51i4pw+9lg': true,
                'hz8n37808xzz470+': true
            },
            isLoading: true,
            waitingToBeAdded: 0
        }, {
            type: 'COLORS_LOADED',
            colors: [
                {r: 111.98902115184728, g: 216.43853726072035, b: 162.94159191667194, id: '135cz5t1jbf1z1x-', likes: 12},
                {r: 255.96872798823495, g: 212.32691025386657, b: 158.66499961093064, id: 'hz8n37808xzz470+', likes: 10}
            ]
        });
        expect(state).toEqual({
            colors: [
                {r: 111.98902115184728, g: 216.43853726072035, b: 162.94159191667194, id: '135cz5t1jbf1z1x-', likes: 12},
                {r: 255.96872798823495, g: 212.32691025386657, b: 158.66499961093064, id: 'hz8n37808xzz470+', likes: 10}
            ],
            selected: {
                '135cz5t1jbf1z1x-': true,
                'hz8n37808xzz470+': true
            },
            isLoading: false, 
            waitingToBeAdded: 0
        });
    });

    test('it should only increase `waitingToBeAdded` value on INIT_ADD_COLOR', () => {
        let state;
        state = reducer(
            {colors: [], selected: {}, isLoading: false, waitingToBeAdded: 0},
            {type: 'INIT_ADD_COLOR', color: {r: 198.87097363521355, g: 39.757631762486994, b: 151.82108960175248}}
        );
        expect(state).toEqual({
            colors: [],
            selected: {},
            isLoading: false,
            waitingToBeAdded: 1
        });
    });

    test('it should add color to state and decrease `waitingToBeAdded` on ADD_COLOR', () => {
        let state;
        state = reducer({colors: [], selected: {}, isLoading: false, waitingToBeAdded: 5}, {
            type: 'ADD_COLOR',
            color: {r: 198.87097363521355, g: 39.757631762486994, b: 151.82108960175248, id: '0xp+6rlhhs39_ew0'}
        });
        expect(state).toEqual({
            colors: [{
                r: 198.87097363521355,
                g: 39.757631762486994,
                b: 151.82108960175248,
                id: '0xp+6rlhhs39_ew0'
            }], selected: {}, isLoading: false, waitingToBeAdded: 4
        });
    });
});
