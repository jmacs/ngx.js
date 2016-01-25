console.log('registering game assets');

// -------------------------------------
// WINDOW
// -------------------------------------
import './commands.js';
import './props.js';

// -------------------------------------
// COMPONENTS
// -------------------------------------
import './components/Health.js';
import './components/Sprite.js';
import './components/Position.js';
import './components/Input.js';
import './components/AnimationState.js';

// -------------------------------------
// PROCESSES
// -------------------------------------
import './processes/dummy_proc.js';

// -------------------------------------
// SCRIPTS
// -------------------------------------
import './scripts/startup.js';
import './scripts/dummy_event.js';

// -------------------------------------
// SYSTEMS
// -------------------------------------
import './systems/InputSystem.js';
import './systems/MovementSystem.js';
import './systems/SpriteRenderer.js';
import './systems/HUDRenderer.js';
import './systems/AnimationSystem.js';
