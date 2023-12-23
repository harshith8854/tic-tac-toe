import { Component, ViewChild } from '@angular/core';
import { BoardComponent } from './board/board.component';
import { ResultModalComponent } from './result-modal/result-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Main component
 *
 * @export
 * @class AppComponent
 * @typedef {AppComponent}
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /**
   * score of the first player
   *
   * @type {number}
   */
  first_player_score: number = 0;

  /**
   * score of the second player
   *
   * @type {number}
   */
  second_player_score: number = 0;

  /**
   * property hold the game count
   *
   * @type {number}
   */
  game_count: number = 1; // always starts with first game

  /**
   * To access the Board component
   *
   * @type {(BoardComponent | undefined)}
   */
  @ViewChild(BoardComponent) board: BoardComponent | undefined;

  /**
   * Creates an instance of AppComponent.
   *
   * @constructor
   * @param {NgbModal} modalService
   */
  constructor(private modalService: NgbModal){}

  /**
   * To identify the winner.
   *
   * @param {string} e
   */
  wonBy(e: string) {
    if(e == 'X'){
      if(this.game_count%2 == 0) {
        this.first_player_score += 1;
        this.openModal('Player 1');
      } else {
        this.second_player_score += 1;
        this.openModal('Player 2');
      }
    } else if(e == 'O') {
      if(this.game_count%2 != 0) {
        this.first_player_score += 1;
        this.openModal('Player 1');
      } else {
        this.second_player_score += 1;
        this.openModal('Player 2');
      }
    } else {
      this.openModal('No one');
    }
    setTimeout(()=>{
      this.game_count += 1;
      this.board?.clear();
    },2000);
  }

  /**
   * To open a modal declaring the result.
   *
   * @param {string} name
   */
  openModal(name: string) {
    const modalRef = this.modalService.open(ResultModalComponent,{});
		modalRef.componentInstance.name = name;
  }
}
