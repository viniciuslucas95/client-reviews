import {Component, OnInit} from '@angular/core';

import {TableContent} from "../../components/table/table.component.type";
import {ClientTableContentItem} from "./client.dto";
import ClientService from "./client.service";
import DateUtil from "../../utils/date.util";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateClientModalComponent} from "./components/create-client-modal/create-client-modal.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-client-page',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss']
})
export class ClientPage implements OnInit {
  public tableContent:TableContent<ClientTableContentItem> = {
    total: 0,
    items: [],
    columns: [
      {
        key: 'name',
        name: 'Nome'
      },
      {
        key: 'contactName',
        name: 'Contato'
      },
      {
        key: 'cnpj',
        name: "CNPJ"
      },
      {
        key: 'date',
        name: 'Registrado Em'
      }
    ]
  }

  public page = 1

  constructor(
      private readonly _service: ClientService,
      private readonly _dateUtil: DateUtil,
      private readonly _modalService: NgbModal,
      private readonly _route: ActivatedRoute
  ) {

  }

    ngOnInit(){
      const pageString = this._route.snapshot.paramMap.get('page');

      if(!pageString)  return

      const page = parseInt(pageString)

      if(isNaN(page)) return

      if(page < 1) return

      this.page = page

      this.onPageChanged(this.page)
  }

  onPageChanged(page:number){
    const offset = (page - 1) * 10

    this._service.getPaginated(offset).subscribe(res => {
      if(res.items.length === 0 && location.pathname !== '/clientes/1'){
        location.replace('/clientes/1')
        return
      }

      this.tableContent = {
        ...this.tableContent,
        total: res.count,
        items: res.items.map(item => ({
          ...item,
          cnpj: item.cnpj ?? "Não informado",
          date: this._dateUtil.formatToPtString(item.date)
        }))
      }
    })
  }

  onCreateClient(){
    const modalRef = this._modalService.open(CreateClientModalComponent);

    modalRef.result.then(() => location.reload())
  }
}
