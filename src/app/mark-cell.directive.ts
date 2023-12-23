import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/**
 * Description placeholder
 * @date 12/20/2023 - 11:42:14 PM
 *
 * @export
 * @class MarkCellDirective
 * @typedef {MarkCellDirective}
 */
@Directive({
  selector: '[tttMarkCell]'
})
export class MarkCellDirective {

  /**
   * This property is used to determine who is playing the current turn and assign the respective icon to the cell.
   *
   * @type {(number | undefined)}
   */
  @Input('input-count') input_count: number | undefined;

  /**
   * Creates an instance of MarkCellDirective.
   * @constructor
   * @param {ElementRef} e
   */
  constructor(private e: ElementRef) {
  }
    
  /**
   * Host listner for click action. 
   * on click action this method will insert 'X' / 'O' to the host cell in the board.
   */
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
