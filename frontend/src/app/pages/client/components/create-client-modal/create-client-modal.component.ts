import { Component } from '@angular/core';
import {NgbActiveModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import ClientService from "../../client.service";
import {CreateClientDto} from "../../client.dto";

@Component({
  selector: 'app-create-client-modal',
  templateUrl: './create-client-modal.component.html',
  styleUrls: ['./create-client-modal.component.scss']
})
export class CreateClientModalComponent {
  public formData = {
    name: '',
    contactName: '',
    cnpj: '',
    date: ''
  }

  constructor(
      private readonly _activeModal: NgbActiveModal,
      private readonly _clientService:ClientService
  ) {

  }

  onConfirm(){
    const dto:CreateClientDto = {
      name: this.formData.name,
      contactName: this.formData.contactName,
      date: this.formData.date,
      cnpj: this.formData.cnpj !== '' ? this.formData.cnpj : undefined
    }

    this._clientService.create(dto).subscribe(res =>
        this._activeModal.close({...this.formData, id: res}))
  }
}
