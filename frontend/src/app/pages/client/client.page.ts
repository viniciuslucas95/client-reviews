import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";

import {TableContent} from "../../components/table/table.component.type";
import {ClientTableContentItem} from "./client.dto";
import ClientService from "./client.service";
import DateUtil from "../../utils/date.util";
import {CreateClientModalComponent} from "./components/create-client-modal/create-client-modal.component";
import CategoryUtil from "../../utils/category.util";

@Component({
  selector: 'app-client-page',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss']
})
export class ClientPage implements OnInit {
  public formData = {
    name: ''
  }

  public appliedFilter?: string

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
      },
      {
        key: 'score',
        name: 'Categoria'
      }
    ]
  }

  public page = 1

  constructor(
      private readonly _service: ClientService,
      private readonly _dateUtil: DateUtil,
      private readonly _categoryUtil: CategoryUtil,
      private readonly _modalService: NgbModal,
      private readonly _activatedRoute: ActivatedRoute,
      private readonly _router: Router
  ) {

  }

  ngOnInit(){
    const pageString = this._activatedRoute.snapshot.paramMap.get('page');

    if(!pageString)  return

    const page = parseInt(pageString)

    if(isNaN(page)) return

    if(page < 1) return

    this.page = page

    this.onPageChanged(this.page)
  }

  onPageChanged(page:number){
    this.page = page
    this._router.navigate([`/clientes/${page}`])

    const offset = (page - 1) * 10

    this._service.getPaginated(offset, this.appliedFilter).subscribe(res => {
      if(res.items.length === 0 && location.pathname !== '/clientes/1'){
        location.replace('/clientes/1')
        return
      }

      this.tableContent = {
        ...this.tableContent,
        total: res.count,
        items: res.items.map(item => ({
          ...item,
          id: item.id.toString(),
          cnpj: item.cnpj ?? "Não informado",
          date: this._dateUtil.formatToPtStringDayMonthAndYear(item.date),
          score: this._categoryUtil.get(item.score)
        }))
      }
    })
  }

  onApplyFilter(){
    this.appliedFilter = this.formData.name

    this.onPageChanged(this.page)
  }

  onCreateClient(){
    const modalRef = this._modalService.open(CreateClientModalComponent);

    modalRef.result
        .then(() => location.reload())
        .catch(_ => {})
  }
}
