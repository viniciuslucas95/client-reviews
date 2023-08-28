import { Component, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { catchError, debounceTime, map, of } from 'rxjs';

import { CreateClientDto } from '../../client.dto';
import injectable from '../../../../constants/injectable.constant';
import { IClientService } from '../../client.interface';
import FormValidatorUtil from '../../../../utils/form-validator.util';

@Component({
  selector: 'app-create-client-modal',
  templateUrl: './create-client-modal.component.html',
  styleUrls: ['./create-client-modal.component.scss'],
})
export class CreateClientModalComponent {
  public formGroup: FormGroup;
  public isCreating = false;

  constructor(
    formBuilder: FormBuilder,
    private readonly _activeModal: NgbActiveModal,
    @Inject(injectable.clientService)
    private readonly _service: IClientService,
    private readonly _formValidatorUtil: FormValidatorUtil,
  ) {
    this.formGroup = formBuilder.group({
      name: ['', [Validators.required, this.validateText.bind(this)]],
      contactName: ['', [Validators.required, this.validateText.bind(this)]],
      date: ['', [Validators.required, this.validateDate.bind(this)]],
      cnpj: [
        '',
        this.validateCnpj.bind(this),
        this.validateCnpjUniqueness.bind(this),
      ],
    });
  }

  validateText(control: FormControl) {
    if (this._formValidatorUtil.validateText(control.value.trim())) return null;

    return { invalid: true };
  }

  validateCnpjUniqueness(control: FormControl) {
    const error: ValidationErrors = { conflict: true };

    return this._service.isCnpjAlreadyRegistered(control.value.trim()).pipe(
      debounceTime(300),
      map((isCnpjAlreadyRegistered) =>
        isCnpjAlreadyRegistered ? error : null,
      ),
      catchError(() => of(error)),
    );
  }

  validateDate(control: FormControl) {
    if (this._formValidatorUtil.validateDate(control.value.trim())) return null;

    return { invalid: true };
  }

  validateCnpj(control: FormControl) {
    if (this._formValidatorUtil.validateCnpj(control.value.trim())) return null;

    return { invalid: true };
  }

  getFormattedDate() {
    const value = this.formGroup.get('date')!.value.trim();

    const [day, month, year] = value.split('/');

    return `${year}-${month}-${day}T00:00:00.000Z`;
  }

  onConfirm() {
    if (this.formGroup.valid) {
      const cnpj = this.formGroup.get('cnpj')!.value;

      const dto: CreateClientDto = {
        name: this.formGroup.get('name')!.value.trim(),
        contactName: this.formGroup.get('contactName')!.value.trim(),
        date: this.getFormattedDate(),
        cnpj: cnpj !== '' ? cnpj.trim() : undefined,
      };

      this.isCreating = true;

      this._service.create(dto).subscribe({
        next: (id) => this._activeModal.close({ ...dto, id }),
        error: () => (this.isCreating = false),
      });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
