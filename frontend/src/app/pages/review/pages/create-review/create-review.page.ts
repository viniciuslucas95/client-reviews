import { Component } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";

import {TableContent} from "../../../../components/table/table.component.type";
import {ClientReviewCreationTableContentItem} from "./create-review.dto";
import ClientService from "../../../client/client.service";
import DateUtil from "../../../../utils/date.util";
import {CreateReviewModalComponent} from "./components/create-review-modal/create-review-modal.component";
import {CreateClientReviewDto} from "../../review.dto";
import ReviewService from "../../review.service";

@Component({
  selector: 'app-create-review-page',
  templateUrl: './create-review.page.html',
  styleUrls: ['./create-review.page.scss']
})
export class CreateReviewPage {
  public formData = {
    month: (new Date().getMonth() + 1).toString(),
    year: new Date().getFullYear().toString()
  }
  public tableContent:TableContent<ClientReviewCreationTableContentItem> = {
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
        key: 'lastReviewDate',
        name: 'Última Avaliação'
      },
      {
        key: 'buttons',
        name: "Ações"
      }
    ]
  }
  public page = 1
  private reviews: {
    id: number | string,
    score: number,
    reason: string
  }[] = []

  constructor(
      private readonly _clientService: ClientService,
      private readonly _service: ReviewService,
      private readonly _dateUtil: DateUtil,
      private readonly _modalService: NgbModal,
      private readonly _router: Router
  ) {
    this.onPageChanged(this.page)
  }

  onPageChanged(page:number){
    const offset = (page - 1) * 10

    this._clientService.getPaginatedForReviewCreation(offset).subscribe(res => {
      this.tableContent = {
        ...this.tableContent,
        total: res.count,
        items: res.items.map(item => ({
          ...item,
          id: item.id.toString(),
          cnpj: item.cnpj ?? "Não informado",
          lastReviewDate: item.lastReviewDate ? this._dateUtil.formatToPtString(item.lastReviewDate) : 'Não Avaliado',
          buttons: []
        }))
      }

      this.updateClientsButtons()
    })
  }

  getDeleteButton(id: number | string){
    return {
      class: 'btn btn-danger btn-sm',
      iconClass: 'bi-x-lg',
      onClick: () => this.onDeleteClientReview(id)
    }
  }

  getNewButton(id: number | string){
    return {
      class: 'btn btn-primary btn-sm',
      iconClass: 'bi-plus-lg',
      onClick: () => this.onNewClientReview(id)
    }
  }

  hasReview(id: number | string){
    return this.reviews.find(review => review.id.toString() == id) ? true : false
  }

  updateClientsButtons(){
    this.tableContent.items = this.tableContent.items.map(item => {
      item.buttons = this.hasReview(item.id) ?
          [this.getDeleteButton(item.id)] :
          [this.getNewButton(item.id)]

      return item
    })
  }

  onDeleteClientReview(id: number | string){
    this.reviews = this.reviews.filter(item => item.id != id)

    this.updateClientsButtons()
  }

  onNewClientReview(id: number | string){
    const client = this.tableContent.items.find(item => item.id == id)

    if(!client) return

    const modalRef = this._modalService.open(CreateReviewModalComponent);

    modalRef.componentInstance.client = {
      id,
      name: client.name
    }

    modalRef.result
        .then((res) => {
          this.reviews.push({
            id,
            score: res.score,
            reason: res.reason
          })

          this.updateClientsButtons()
        })
        .catch(_ => {})
  }

  onCreateReview(){
    const dtos: CreateClientReviewDto[] = this.reviews.map(item => ({
      clientId: typeof item.id === 'string' ? parseInt(item.id) : item.id,
      score: item.score,
      reason: item.reason,
      date: `${this.formData.year}-${this.formData.month.padStart(2, '0')}-01T00:00:00.000Z`
    }))

    this._service.create(dtos).subscribe(_ =>
        this._router.navigate(['avaliacoes/1']))
  }
}
