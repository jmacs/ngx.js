module.exports = [
    {
        name: 'DualShock4',
        platforms: ['Mac OS', 'MacIntel'],
        elements: 22,
        mapper: require('./controllers/DualShock4'),
        test: function (gamepadId) {
            return gamepadId.includes('054c');
        }
    },
    {
        name: 'Xbox',
        elements: 22,
        platforms: ['Mac OS', 'MacIntel'],
        mapper: require('./controllers/XboxOne'),
        test: function (gamepadId) {
            return gamepadId.includes('Xbox');
        }
    }
];