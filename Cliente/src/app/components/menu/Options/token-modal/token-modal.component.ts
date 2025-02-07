import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-token-modal',
  templateUrl: './token-modal.component.html',
  styleUrls: ['./token-modal.component.css']
})
export class TokenModalComponent {
  @Input() token: string | null = null;

  constructor(public activeModal: NgbActiveModal) {}
}
