const MyInputSettings = require('./MyInputSettings');
const InputManager = require('./InputManager');

module.exports = function Input2Module() {
    InputManager.initialize(MyInputSettings);
};
