import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ttt-result-modal',
  templateUrl: './result-modal.component.html',
  styleUrls: ['./result-modal.component.scss'],
  standalone: true
})
export class ResultModalComponent {

  constructor(public activeModal: NgbActiveModal){}
  @Input() name: string | undefined;
}
