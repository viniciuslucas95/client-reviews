import { Component } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import ClientService from "../../client.service";
import {CreateClientDto} from "../../client.dto";

@Component({
  selector: 'app-create-review-modal',
  templateUrl: './create-client-modal.component.html',
  styleUrls: ['./create-client-modal.component.scss']
})
export class CreateClientModalComponent {
  public formGroup: FormGroup

  constructor(
      formBuilder: FormBuilder,
      private readonly _activeModal: NgbActiveModal,
      private readonly _clientService:ClientService
  ) {
    this.formGroup = formBuilder.group({
      name: ['', Validators.required],
      contactName: ['', Validators.required],
      date: ['', Validators.required],
      cnpj: ''
    })
  }

  isNameValid(){
    const value = this.formGroup.get('name')!.value

    const length = value.replace(/\s/g, '').length

    return length > 0
  }

  isContactNameValid(){
    const value = this.formGroup.get('contactName')!.value

    const length = value.replace(/\s/g, '').length

    return length > 0
  }

  isCnpjValid(){
    const value = this.formGroup.get('cnpj')!.value

    if(!value) return true

    const cnpjRegex = /^[0-9]{14}$/

    return cnpjRegex.test(value.trim())
  }

  isDateValid(){
    const value = this.formGroup.get('date')!.value

    const [day, month, year] = value.split('/')

    if(!month) return false
    if(!year) return false

    return !isNaN(Date.parse(`${year}-${month}-${day}`))
  }

  isFormValid(){
    if(!this.formGroup.valid) return false
    if(!this.isCnpjValid()) return false
    if(!this.isNameValid()) return false
    if(!this.isContactNameValid()) return false
    if(!this.isDateValid()) return false

    return true
  }

  getFormattedDate(){
    const value = this.formGroup.get('date')!.value

    const [day, month, year] = value.split('/')

    return `${year}-${month}-${day}T00:00:00.000Z`
  }

  onConfirm(){
    if(this.isFormValid()){
      const cnpj = this.formGroup.get('cnpj')!.value

      const dto:CreateClientDto = {
        name: this.formGroup.get('name')!.value.trim(),
        contactName: this.formGroup.get('contactName')!.value.trim(),
        date: this.getFormattedDate(),
        cnpj: cnpj !== '' ? cnpj.trim() : undefined
      }

      this._clientService.create(dto).subscribe(res =>
          this._activeModal.close({...dto, id: res}))
    }else{
      this.formGroup.markAllAsTouched()
    }
  }
}
