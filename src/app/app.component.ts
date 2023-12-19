import { Component, ViewChild } from '@angular/core';
import { BoardComponent } from './board/board.component';
import { ResultModalComponent } from './result-modal/result-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tic-tac-toe';
  first_player_score: number = 0;
  second_player_score: number = 0;
  game_count: number = 1; // always starts with first game
  @ViewChild(BoardComponent) board: BoardComponent | undefined;
  @ViewChild('blur') blur: HTMLElement | undefined;
  constructor(private modalService: NgbModal){}

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

  openModal(name: string) {
    const modalRef = this.modalService.open(ResultModalComponent,{});
		modalRef.componentInstance.name = name;
  }
}
