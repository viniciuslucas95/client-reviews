import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-review-modal',
  templateUrl: './create-review-modal.component.html',
  styleUrls: ['./create-review-modal.component.scss'],
})
export class CreateReviewModalComponent {
  public formGroup: FormGroup;

  public client!: {
    id: number;
    name: string;
  };

  constructor(
    formBuilder: FormBuilder,
    private readonly _activeModal: NgbActiveModal,
  ) {
    this.formGroup = formBuilder.group({
      score: ['', Validators.required],
      reason: ['', Validators.required],
    });
  }

  isScoreValid() {
    const value = this.formGroup.get('score')!.value;

    if (!value) return false;

    const scorePattern = /^[0-9]{1,2}$/;

    const isMatch = scorePattern.test(value.trim());

    if (!isMatch) return false;

    const parsedValue = parseInt(value.trim());

    if (isNaN(parsedValue)) return false;

    if (parsedValue < 0 || parsedValue > 10) return false;

    return true;
  }

  isReasonValid() {
    const value = this.formGroup.get('reason')!.value;

    const length = value.trim().length;

    return length > 0;
  }

  isFormValid() {
    if (!this.formGroup.valid) return false;
    if (!this.isScoreValid()) return false;
    if (!this.isReasonValid()) return false;

    return true;
  }

  onConfirm() {
    if (this.isFormValid()) {
      this._activeModal.close({
        score: parseInt(this.formGroup.get('score')!.value),
        reason: this.formGroup.get('reason')!.value,
      });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
