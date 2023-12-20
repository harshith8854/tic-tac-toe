import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ttt-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  // intially we are assigning 'O' to first player and swapping it later on
  input_count: number = 1;
  first_player: { x: number, y: number }[] = [];
  second_player: { x: number, y: number }[] = [];
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
  @Output() 
  winner: EventEmitter<string> = new EventEmitter();
  game_over: boolean = false;

  // for styling logs
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

  markCell(row: number, column: number, e: any): void {
    let target = e.target as HTMLElement;
    let isMarked = target.getAttribute('isMarked');
    if (isMarked == 'false') {
      if (this.input_count % 2 == 1) { // first player will be allotted O 
        this.first_player.push({ x: row, y: column });
      } else { // second player will be allocatted X
        this.second_player.push({ x: row, y: column });
      }
      if(this.input_count > 4){
        this.isStrike();
      }
      this.input_count++;
      target.setAttribute('isMarked','true');
      console.info(`%cmarked position ${row},${column} with ${this.getValueAtPosition(row,column)}`,this.logStyles.basic);
    }
    console.debug(`%cposition ${row},${column} is already marked with ${this.getValueAtPosition(row,column)}`,this.logStyles.debug)
  }
  
  isStrike(): void {
    let winner = '';
    for (const strike of this.winning_cases) {
      if (this.getValueAtPosition(strike[0].x, strike[0].y) && (this.getValueAtPosition(strike[0].x, strike[0].y) == this.getValueAtPosition(strike[1].x, strike[1].y)) && (this.getValueAtPosition(strike[1].x, strike[1].y) == this.getValueAtPosition(strike[2].x, strike[2].y))) {
        this.freeze();
        winner = this.getValueAtPosition(strike[0].x, strike[0].y) as string;
        console.info(`%cstrike at [${strike[0].x},${strike[0].y}]-[${strike[1].x},${strike[1].y}]-[${strike[2].x},${strike[2].y}]`,this.logStyles.strike);
        console.info(`%c${winner} won`,this.logStyles.result.win);
        this.winner.emit(this.getValueAtPosition(strike[0].x, strike[0].y) as string);
        this.game_over = true;
        break;
      }
    }
    if(this.input_count == 9 && winner == '') {
      this.freeze();
      console.info('%cNo one wins',this.logStyles.result.draw);
      this.winner.emit('');
      this.game_over = true;
    }
  }

  getValueAtPosition(x: number, y: number): string | undefined | null {
    return document.getElementById(`td-${x}-${y}`)?.textContent;
  }

  freeze(): void {
    for(let i=1; i<=3; i++){
      for(let j=1;j<=3;j++){
        let cell = document.getElementById(`td-${i}-${j}`) as any;
        cell.setAttribute('isMarked','true');
        console.debug(`%cposition [${i},${j}] is in freeze`,this.logStyles.debug);
      }
    }
  }

  clear() {
    for(const pos of this.first_player) {
      let cell = document.getElementById(`td-${pos.x}-${pos.y}`) as any;
      cell.textContent = '';
      cell.setAttribute('isMarked','false');
      console.debug(`%cclearing value at [${pos.x}, ${pos.y}]`,this.logStyles.debug);
    }
    for(const pos of this.second_player) {
      let cell = document.getElementById(`td-${pos.x}-${pos.y}`) as any;
      cell.textContent = '';
      cell.setAttribute('isMarked','false');
      console.debug(`%cclearing value at [${pos.x}, ${pos.y}]`,this.logStyles.debug);
    }
    this.game_over = false;
    this.input_count = 1;
  }
}
