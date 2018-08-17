import * as UserInterfaceStateAssembler from './UserInterfaceStateAssembler';

const initialState = {
  linesOfCodeWritten: 0
}

class Game {

  constructor(gameStateUpdatedCallback, saveGameCallback, loadGameRequestCallback) {
    this.gameStateUpdatedCallback = gameStateUpdatedCallback; // TODO: rename to renderGameCallback
    this.saveGameCallback = saveGameCallback;
    this.loadGameRequestCallback = loadGameRequestCallback;
  }

  state = {...initialState};

  static ElementType = {
    Button: 'button',
    TextStat: 'text'
  }

  start() {
    this.loadGameRequestCallback();
    this.applyStateChange();

  }

  loadGameState(loadedState) {
    this.clearState();
    this.applyStateChange(loadedState);
  }

  clearState = () => {
    this.state = {...initialState};
  }

  applyStateChange(change = {}) {
    this.state = {
      ...this.state,
      ...change
    };
    const gameStateObject = UserInterfaceStateAssembler.assemble(this.state);
    this.saveGameCallback({...this.state});
    this.gameStateUpdatedCallback(gameStateObject);
  }

  handleInputEvent(eventString) {
    switch(eventString) {
      
      case 'WRITE_CODE_LINE':
        let {linesOfCodeWritten} = this.state;
        console.log({linesOfCodeWritten})
        linesOfCodeWritten++;
        this.applyStateChange({linesOfCodeWritten});
        break;

      default:
        break;
    }
  }

}

export default Game;