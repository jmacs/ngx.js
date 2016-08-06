import GameClock from './GameClock';
import Assets from './Assets';
import PrefabLoader from './PrefabLoader';
import SceneLoader from './SceneLoader';
import './Arrays';

GameClock.addEventListener('GameClockLoaded', function() {
    Assets.registerLoaders([
        PrefabLoader,
        SceneLoader
    ]);
});
