import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Modal component used to declare game result
 *
 * @export
 * @class ResultModalComponent
 * @typedef {ResultModalComponent}
 */
@Component({
  selector: 'ttt-result-modal',
  templateUrl: './result-modal.component.html',
  styleUrls: ['./result-modal.component.scss'],
  standalone: true
})
export class ResultModalComponent {

  /**
   * Creates an instance of ResultModalComponent.
   *
   * @constructor
   * @param {NgbActiveModal} activeModal
   */
  constructor(public activeModal: NgbActiveModal){}
  /**
   * contains winner name, in case of draw the value is 'no one'
   *
   * @type {(string | undefined)}
   */
  @Input() name: string | undefined;
}
