import { Component, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { CreateClientDto } from '../../client.dto';
import injectable from '../../../../constants/injectable.constant';
import { IClientService } from '../../client.interface';
import DateUtil from '../../../../utils/date.util';

@Component({
  selector: 'app-create-client-modal',
  templateUrl: './create-client-modal.component.html',
  styleUrls: ['./create-client-modal.component.scss'],
})
export class CreateClientModalComponent {
  public formGroup: FormGroup;
  public isCreating = false;
  public alreadyRegisteredCnpj?: string;

  constructor(
    formBuilder: FormBuilder,
    private readonly _activeModal: NgbActiveModal,
    @Inject(injectable.clientService)
    private readonly _service: IClientService,
    private readonly _dateUtil: DateUtil,
  ) {
    this.formGroup = formBuilder.group({
      name: ['', Validators.required],
      contactName: ['', Validators.required],
      date: ['', [Validators.required, this.validateDate.bind(this)]],
      cnpj: '',
    });
  }

  validateDate(control: FormControl) {
    if (this._dateUtil.isValid(control.value)) return null;

    return { invalidDate: true };
  }

  showAlreadyRegisteredCnpj() {
    const value = this.formGroup.get('cnpj')!.value;

    if (!this.alreadyRegisteredCnpj) return false;
    if (value !== this.alreadyRegisteredCnpj) return false;

    return true;
  }

  isNameValid() {
    const value = this.formGroup.get('name')!.value;

    const length = value.replace(/\s/g, '').length;

    return length > 0;
  }

  isContactNameValid() {
    const value = this.formGroup.get('contactName')!.value;

    const length = value.replace(/\s/g, '').length;

    return length > 0;
  }

  isCnpjValid() {
    const value = this.formGroup.get('cnpj')!.value;

    if (value === this.alreadyRegisteredCnpj) return false;

    if (!value) return true;

    const cnpjRegex = /^[0-9]{14}$/;

    return cnpjRegex.test(value.trim());
  }

  isFormValid() {
    if (!this.formGroup.valid) return false;
    if (!this.isCnpjValid()) return false;
    if (!this.isNameValid()) return false;
    if (!this.isContactNameValid()) return false;

    return true;
  }

  getFormattedDate() {
    const value = this.formGroup.get('date')!.value;

    const [day, month, year] = value.split('/');

    return `${year}-${month}-${day}T00:00:00.000Z`;
  }

  onConfirm() {
    if (this.isFormValid()) {
      const cnpj = this.formGroup.get('cnpj')!.value;

      const dto: CreateClientDto = {
        name: this.formGroup.get('name')!.value.trim(),
        contactName: this.formGroup.get('contactName')!.value.trim(),
        date: this.getFormattedDate(),
        cnpj: cnpj !== '' ? cnpj.trim() : undefined,
      };

      this.isCreating = true;

      const createClient = () => {
        this._service.create(dto).subscribe({
          next: (id) => this._activeModal.close({ ...dto, id }),
          error: () => (this.isCreating = false),
        });
      };

      if (dto.cnpj) {
        this._service.isCnpjAlreadyRegistered(cnpj).subscribe({
          next: (isCnpjAlreadyRegistered) => {
            if (isCnpjAlreadyRegistered) {
              this.isCreating = false;
              this.alreadyRegisteredCnpj = this.formGroup.get('cnpj')!.value;
              return;
            }

            createClient();
          },
          error: () => (this.isCreating = false),
        });
      } else {
        createClient();
      }
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
