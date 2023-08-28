import {Component, Inject, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

import {TableContent} from "../../components/table/table.component.type";
import {ClientTableContentItem} from "./client.dto";
import DateUtil from "../../utils/date.util";
import {CreateClientModalComponent} from "./components/create-client-modal/create-client-modal.component";
import CategoryUtil from "../../utils/category.util";
import CnpjUtil from "../../utils/cnpj.util";
import {IClientService} from "./client.interface";
import injectable from "../../constants/injectable.constant";

@Component({
  selector: 'app-client-page',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss']
})
export class ClientPage implements OnInit {
  public formGroup: FormGroup

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
      formBuilder: FormBuilder,
      @Inject(injectable.clientService)
      private readonly _service: IClientService,
      private readonly _dateUtil: DateUtil,
      private readonly _categoryUtil: CategoryUtil,
      private readonly _modalService: NgbModal,
      private readonly _activatedRoute: ActivatedRoute,
      private readonly _router: Router,
      private readonly _cnpjUtil: CnpjUtil
  ) {
    this.formGroup = formBuilder.group({
      name: ''
    })
  }

  ngOnInit(){
    this._activatedRoute.queryParams.subscribe(params => {
      const name = params['name'];

      if(name) this.appliedFilter = name

      const pageString = this._activatedRoute.snapshot.paramMap.get('page');

      if(!pageString)  return

      const page = parseInt(pageString)

      if(isNaN(page)) return

      if(page < 1) return

      this.page = page

      this.onPageChanged(this.page)
    })
  }

  onPageChanged(page:number){
    this.page = page
    this._router.navigate([`/clientes/${page}`], this.appliedFilter !== '' ?
        {
          queryParams: {
            name: this.appliedFilter
          }
        } : undefined)

    const offset = (page - 1) * 10

    this._service.getPaginated(offset, this.appliedFilter).subscribe(res => {
      if(res.items.length === 0 && location.pathname !== '/clientes/1'){
        this.onPageChanged(1)
        return
      }

      this.tableContent = {
        ...this.tableContent,
        total: res.count,
        items: res.items.map(item => ({
          ...item,
          id: item.id.toString(),
          cnpj: item.cnpj ? this._cnpjUtil.format(item.cnpj) : "Não informado",
          date: this._dateUtil.formatToPtStringDayMonthAndYear(item.date),
          score: this._categoryUtil.get(item.score)
        }))
      }
    })
  }

  onApplyFilter(){
    this.appliedFilter = this.formGroup.get('name')!.value

    this.onPageChanged(this.page)
  }

  onCreateClient(){
    const modalRef = this._modalService.open(CreateClientModalComponent);

    modalRef.result
        .then(() => location.reload())
        .catch(_ => {})
  }
}
