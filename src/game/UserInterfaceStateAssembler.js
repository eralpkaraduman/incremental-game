import Game from './Game';

export function assemble(gameState) {
  const {Button, TextStat} = Game.ElementType;
  const {linesOfCodeWritten} = gameState;
  let elements = [];

  const writeCodeButton = {
    type: Button,
    title: 'Write a line of code',
    onClickAction: 'WRITE_CODE_LINE'
  }

  elements = [...elements, writeCodeButton];

  if (linesOfCodeWritten > 0) {
    elements = [...elements,
      {
        type: TextStat,
        title: `${linesOfCodeWritten} lines of code written`,
      }
    ];
  }

  if (linesOfCodeWritten >= 10) {
    elements = [...elements,
      {
        type: Button,
        title: 'Create a utility',
        onClickAction: 'CREATE_UTILITY'
      }
    ];
  }

  return {
    elements
  }
}