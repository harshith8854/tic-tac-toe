import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * Description placeholder
 * @date 12/20/2023 - 11:42:48 PM
 *
 * @export
 * @class BoardComponent
 * @typedef {BoardComponent}
 */
@Component({
  selector: 'ttt-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  // intially we are assigning 'O' to first player and swapping it later on
  /**
   * count of inputs
   *
   * @type {number}
   */
  input_count: number = 1;
  /**
   * stores the positions marked by first player.
   *
   * @type {{ x: number, y: number }[]}
   */
  first_player: { x: number, y: number }[] = [];
  /**
   * stores the positions marked by second player.
   *
   * @type {{ x: number, y: number }[]}
   */
  second_player: { x: number, y: number }[] = [];
  /**
   * Array of possible winning cases.
   *
   * @type {{ x: number, y: number }[][]}
   */
  winning_cases: { x: number, y: number }[][] = [
    [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }], //first row
    [{ x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }], //second row
    [{ x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }], //third row
    [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }], //first column
    [{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }], //second column
    [{ x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }], //third column
    [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }], //top left to bottom right
    [{ x: 3, y: 1 }, { x: 2, y: 2 }, { x: 1, y: 3 }]  //bottom left to top right
  ];
  /**
   * Event emitter which emits winner name.
   *
   * @type {EventEmitter<string>}
   */
  @Output()
  winner: EventEmitter<string> = new EventEmitter();
  /**
   * If set to true, it represents game over.
   *
   * @type {boolean}
   */
  game_over: boolean = false;

  // for styling logs
  /**
   * Hold the set of styles used for different logs.
   *
   * @type {{ basic: any; result: { win: any; draw: any; }; strike: any; debug: any; }}
   */
  logStyles = {
    basic: [
      "background-color: #0b2c59",
      "color: white",
      "padding: 2px",
      "border-radius: 2px"
    ].join(";"),
    result: {
      win: [
        "background-color: #ffc800",
        "color: white",
        "padding: 2px",
        "border-radius: 2px"
      ].join(";"),
      draw: [
        "background-color: #06cb30",
        "color: white",
        "padding: 2px",
        "border-radius: 2px"
      ].join(";")
    },
    strike: [
      "background-color: #0b2c59",
      "color: white",
      "padding: 2px",
      "border-radius: 2px"
    ].join(";"),
    debug: [
      "background-color: #d62839",
      "color: white",
      "padding: 2px",
      "border-radius: 2px"
    ].join(";")
  }

  /**
   * Marks the cell and calls isStrike() when more than 4 inputs are received.
   *
   * @param {number} row
   * @param {number} column
   * @param {*} e
   */
  markCell(row: number, column: number, e: any): void {
    let target = e.target as HTMLElement;
    let isMarked = target.getAttribute('isMarked');
    if (isMarked == 'false') {
      if (this.input_count % 2 == 1) { // first player will be allotted O 
        this.first_player.push({ x: row, y: column });
      } else { // second player will be allocatted X
        this.second_player.push({ x: row, y: column });
      }
      if (this.input_count > 4) {
        this.isStrike();
      }
      this.input_count++;
      target.setAttribute('isMarked', 'true');
      console.error(`cell  ${row},${column} marked as true`);
      console.info(`%cmarked position ${row},${column} with ${this.getValueAtPosition(row, column)}`, this.logStyles.basic);
    }
    console.debug(`%cposition ${row},${column} is already marked with ${this.getValueAtPosition(row, column)}`, this.logStyles.debug)
  }

  /**
   * To check if there is any strike.
   */
  isStrike(): void {
    let winner = '';
    for (const strike of this.winning_cases) {
      if (this.getValueAtPosition(strike[0].x, strike[0].y) && (this.getValueAtPosition(strike[0].x, strike[0].y) == this.getValueAtPosition(strike[1].x, strike[1].y)) && (this.getValueAtPosition(strike[1].x, strike[1].y) == this.getValueAtPosition(strike[2].x, strike[2].y))) {
        this.freeze();
        winner = this.getValueAtPosition(strike[0].x, strike[0].y) as string;
        console.info(`%cstrike at [${strike[0].x},${strike[0].y}]-[${strike[1].x},${strike[1].y}]-[${strike[2].x},${strike[2].y}]`, this.logStyles.strike);
        console.info(`%c${winner} won`, this.logStyles.result.win);
        this.winner.emit(this.getValueAtPosition(strike[0].x, strike[0].y) as string);
        this.game_over = true;
        break;
      }
    }
    if (this.input_count == 9 && winner == '') {
      this.freeze();
      console.info('%cNo one wins', this.logStyles.result.draw);
      this.winner.emit('');
      this.game_over = true;
    }
  }

  /**
   * To read the current value of the cell
   *
   * @param {number} x
   * @param {number} y
   * @returns {(string | undefined | null)}
   */
  getValueAtPosition(x: number, y: number): string | undefined | null {
    return document.getElementById(`td-${x}-${y}`)?.textContent;
  }

  /**
   * Freeze all the cells, directive checks for the value of 'isMarked' before executing furthur.
   */
  freeze(): void {
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
        let cell = document.getElementById(`td-${i}-${j}`) as any;
        cell.setAttribute('isMarked', 'true');
        console.debug(`%cposition [${i},${j}] is in freeze`, this.logStyles.debug);
      }
    }
  }

  /**
   * Clear all the cells
   */
  clear() {
    console.group('clearing cells');
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
        let cell = document.getElementById(`td-${i}-${j}`) as any;
        cell.textContent = '';
        cell.setAttribute('isMarked', 'false');
        console.debug(`%cclearing value at [${i}, ${j}]`, this.logStyles.debug);
      }
    }
    console.groupEnd();
    this.game_over = false;
    this.input_count = 1;
  }
}
