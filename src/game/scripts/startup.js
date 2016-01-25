import AssetManager from '../../core/AssetManager.js';
import Events from '../../core/Events.js';
import System from '../../core/System.js';
import Viewport from '../../graphics/Viewport.js';

Events.on('runtime_start', function() {
    console.debug('startup script!!!!');

    System.transition(NGX.CX_WORLD);

    AssetManager.enqueue('assets/prefabs/mobs.prefab.json');
    AssetManager.enqueue('assets/tilesets/smb_entity.tiles.json');
    AssetManager.enqueue('assets/animations/smb_entity.anim.json');
    AssetManager.download(function(result, err) {
        if(err) {
            console.error(err);
            return;
        }
        console.debug('assets loaded');
        window.cmd.spawn('turtle', 0, 300);
        window.cmd.spawn('gomba', 300, 600);
        Viewport.lookAt(300, 300);
    });

});