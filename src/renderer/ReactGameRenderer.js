import React, {Component} from 'react';
import Game from '../game/Game';
import './Game.css';

export default class ReactGameRenderer extends Component {

  state = {
    gameState: {}
  }

  constructor() {
    super();
    this.game = new Game(this.handleOnGameStateUpdated);
  }

  componentDidMount() {
    this.game.start();
  }

  handleOnGameStateUpdated = (gameState) => {
    this.setState(() => ({gameState}))
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
        {elements.map((element, index) =>
          <div key={index}>{this.renderElement(element)}</div>
        )}
      </div>
    );
  }

}

