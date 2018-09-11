import Game from './Game';

export function assemble(gameState) {
  const {Button, TextStat} = Game.ElementType;
  const {linesOfCodeWritten, projects} = gameState;
  let elements = [];

  const writeCodeButton = {
    type: Button,
    title: 'Write a line of code',
    onClickAction: 'WRITE_CODE_LINE'
  }

  const startProjectButton = {
    type: Button,
    title: 'Start a new project',
    onClickAction: 'START_NEW_PROJECT'
  }

  if (projects.length > 0) {
    elements = [...elements, writeCodeButton];
  }
  else {
    elements = [...elements, startProjectButton];
  }

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