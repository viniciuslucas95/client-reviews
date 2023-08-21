import { Component } from '@angular/core';

import {TableContent} from "../../components/table/table.component.type";
import {ClientTableContentItem} from "./client.dto";
import ClientService from "./client.service";
import DateUtil from "../../utils/date.util";

@Component({
  selector: 'app-client-page',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss']
})
export class ClientPage {
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

  constructor(
      private readonly _service: ClientService,
      private readonly _dateUtil: DateUtil
  ) {
    this.onPageChanged(1)
  }

  onPageChanged(page:number){
    const offset = (page - 1) * 10

    this._service.getPaginated(offset).subscribe(res => {
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
}
