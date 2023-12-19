import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[tttMarkCell]'
})
export class MarkCellDirective {

  @Input('input-count') input_count: number | undefined;
  @Input('game-over') game_over: boolean | undefined;

  constructor(private e: ElementRef) {
  }
    
  @HostListener('click') onClick() {
    if(this.input_count && this.e.nativeElement.getAttribute('isMarked')=='false'){
      if(this.input_count%2 == 0){
        this.e.nativeElement.textContent = 'X';
      } else {
        this.e.nativeElement.textContent = 'O';
      }
    }
  }
}
