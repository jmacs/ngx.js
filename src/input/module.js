import GameClock from '../core/GameClock';
import InputManager from './InputManager';
import KeyboardDevice from './KeyboardDevice';
import MouseDevice from './MouseDevice';
import GamepadDevice from './GamepadDevice';

GameClock.addEventListener('GameClockLoaded', function() {
    InputManager.registerDevice(KeyboardDevice);
    InputManager.registerDevice(MouseDevice);
    InputManager.registerDevice(GamepadDevice);
});