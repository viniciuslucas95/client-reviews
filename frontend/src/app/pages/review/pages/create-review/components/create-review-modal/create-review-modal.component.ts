import { Component } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-review-modal',
  templateUrl: './create-review-modal.component.html',
  styleUrls: ['./create-review-modal.component.scss']
})
export class CreateReviewModalComponent {
  public formData = {
    score: '',
    reason: ''
  }

  public client!: {
    id: number,
    name: string
  }

  constructor(
      private readonly _activeModal: NgbActiveModal
  ) {

  }

  onConfirm(){
    this._activeModal.close({...this.formData})
  }
}
