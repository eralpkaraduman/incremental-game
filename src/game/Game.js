import * as UserInterfaceStateAssembler from './UserInterfaceStateAssembler';

class Game {

  constructor(gameStateUpdatedCallback) {
    this.gameStateUpdatedCallback = gameStateUpdatedCallback;
  }

  state = {
    linesOfCodeWritten: 0
  }

  static ElementType = {
    Button: 'button',
    TextStat: 'text'
  }

  start() {
    this.applyStateChange();
  }

  applyStateChange(change = {}) {
    this.state = {
      ...this.state,
      ...change
    };
    const gameStateObject = UserInterfaceStateAssembler.assemble(this.state);
    this.gameStateUpdatedCallback(gameStateObject);
  }

  handleInputEvent(eventString) {
    switch(eventString) {
      
      case 'WRITE_CODE_LINE':
        let {linesOfCodeWritten} = this.state;
        linesOfCodeWritten++;
        this.applyStateChange({linesOfCodeWritten});
        break;

      default:
        break;
    }
  }

}

export default Game;