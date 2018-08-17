import React, {Component} from 'react';
import Game from '../game/Game';
import './Game.css';

export default class ReactGameRenderer extends Component {

  state = {
    gameState: {} // TODO: rename to renderableInterfaceState
  }

  constructor() {
    super();
    this.game = new Game(
      this.handleOnRenderGameState,
      this.handleOnSaveGameStateRequested,
      this.handleOnLoadGameStateRequested
    );
  }

  componentDidMount() {
    this.game.start();
  }

  handleOnRenderGameState = (gameState) => {
    this.setState(() => ({gameState}))
  }

  handleOnSaveGameStateRequested = (gameState) => {
    const serializedGameState = JSON.stringify(gameState);
    localStorage.setItem('GAME_STATE', serializedGameState);
  }

  handleOnLoadGameStateRequested = (gameState) => {
    const serializedGameState = localStorage.getItem('GAME_STATE');
    if (serializedGameState) {
      try {
        const deserializedGameState = JSON.parse(serializedGameState);
        this.game.loadGameState(deserializedGameState);
      }
      catch(e) {
        console.error('Failed to load game state: ' + e);
      }
    }
  }

  handleOnElementClicked = onClickAction => {
    this.game.handleInputEvent(onClickAction);
  }

  renderButton(element) {
    const {title, onClickAction} = element;
    return (
      <button
        onClick={() => this.handleOnElementClicked(onClickAction)}>
        {title}
      </button>
    );
  }

  renderText(element) {
    const {title} = element;
    return (
      <div className='Game-Text'>{title}</div>
    );
  }

  renderElement(element, index) {
    const {Button, TextStat} = Game.ElementType;
    switch (element.type) {
      case Button:
        return this.renderButton(element);
      case TextStat:
        return this.renderText(element);
      default:
        return <div />
    }
  }

  render() {
    const {gameState} = this.state;
    const elements = gameState.elements || [];
    return (
      <div>
        <div>
          {elements.map((element, index) =>
            <div key={index}>{this.renderElement(element)}</div>
          )}
        </div>
      </div>
    );
  }

}

