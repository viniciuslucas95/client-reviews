import { Component, Inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TableContent } from '../../../../components/table/table.component.type';
import { ClientReviewCreationTableContentItem } from './create-review.dto';
import DateUtil from '../../../../utils/date.util';
import { CreateReviewModalComponent } from './components/create-review-modal/create-review-modal.component';
import { CreateClientReviewDto } from '../../review.dto';
import injectable from '../../../../constants/injectable.constant';
import { IClientService } from '../../../client/client.interface';
import { IReviewService } from '../../review.interface';

@Component({
  selector: 'app-create-review-page',
  templateUrl: './create-review.page.html',
  styleUrls: ['./create-review.page.scss'],
})
export class CreateReviewPage {
  public formGroup: FormGroup;

  public tableContent: TableContent<ClientReviewCreationTableContentItem> = {
    total: 0,
    items: [],
    columns: [
      {
        key: 'name',
        name: 'Nome',
      },
      {
        key: 'contactName',
        name: 'Contato',
      },
      {
        key: 'cnpj',
        name: 'CNPJ',
      },
      {
        key: 'lastReviewDate',
        name: 'Última Avaliação',
      },
      {
        key: 'buttons',
        name: 'Ações',
      },
    ],
  };

  public alreadyRegisteredDate?: string;
  public appliedFilter?: string;
  public page = 1;
  public isCreating = false;
  public invalidDate?: string;

  private reviews: {
    id: number | string;
    score: number;
    reason: string;
  }[] = [];

  constructor(
    formBuilder: FormBuilder,
    @Inject(injectable.clientService)
    private readonly _clientService: IClientService,
    @Inject(injectable.reviewService)
    private readonly _service: IReviewService,
    private readonly _dateUtil: DateUtil,
    private readonly _modalService: NgbModal,
    private readonly _router: Router,
  ) {
    this.formGroup = formBuilder.group({
      date: [
        `${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${new Date()
          .getFullYear()
          .toString()}`,
        Validators.required,
      ],
      name: '',
    });

    this.onPageChanged(this.page);
  }

  onPageChanged(page: number) {
    this.page = page;
    const offset = (page - 1) * 10;

    this._clientService
      .getPaginatedForReviewCreation(offset, this.appliedFilter)
      .subscribe((res) => {
        if (res.items.length === 0 && this.page !== 1) {
          this.onPageChanged(1);
          return;
        }

        this.tableContent = {
          ...this.tableContent,
          total: res.count,
          items: res.items.map((item) => ({
            ...item,
            id: item.id.toString(),
            cnpj: item.cnpj ?? 'Não informado',
            lastReviewDate: item.lastReviewDate
              ? this._dateUtil.formatToPtString(item.lastReviewDate)
              : 'Não Avaliado',
            buttons: [],
          })),
        };

        this.updateClientsButtons();
      });
  }

  getDeleteButton(id: number | string) {
    return {
      class: 'btn btn-danger btn-sm',
      iconClass: 'bi-x-lg',
      onClick: () => this.onDeleteClientReview(id),
    };
  }

  getNewButton(id: number | string) {
    return {
      class: 'btn btn-primary btn-sm',
      iconClass: 'bi-plus-lg',
      onClick: () => this.onNewClientReview(id),
    };
  }

  hasReview(id: number | string) {
    return this.reviews.find((review) => review.id.toString() == id)
      ? true
      : false;
  }

  updateClientsButtons() {
    this.tableContent.items = this.tableContent.items.map((item) => {
      item.buttons = this.hasReview(item.id)
        ? [this.getDeleteButton(item.id)]
        : [this.getNewButton(item.id)];

      return item;
    });
  }

  onDeleteClientReview(id: number | string) {
    this.reviews = this.reviews.filter((item) => item.id != id);

    this.updateClientsButtons();
  }

  onApplyFilter() {
    this.appliedFilter = this.formGroup.get('name')!.value;

    this.onPageChanged(this.page);
  }

  onNewClientReview(id: number | string) {
    const client = this.tableContent.items.find((item) => item.id == id);

    if (!client) return;

    const modalRef = this._modalService.open(CreateReviewModalComponent);

    modalRef.componentInstance.client = {
      id,
      name: client.name,
    };

    modalRef.result
      .then((res) => {
        this.reviews.push({
          id,
          score: res.score,
          reason: res.reason,
        });

        this.updateClientsButtons();
      })
      .catch(() => undefined);
  }

  isDateValid() {
    const value = this.formGroup.get('date')!.value;

    if (value === this.invalidDate) return false;

    const [month, year] = value.split('/');

    if (!year) return false;

    if (year.length !== 4) return false;

    const parsedMonth = parseInt(month);
    const parsedYear = parseInt(year);

    if (isNaN(parsedMonth) || isNaN(parsedYear)) return false;

    if (parsedYear < 1800) return false;

    return !isNaN(Date.parse(`${year}-${month}-01`));
  }

  isFormValid() {
    if (!this.formGroup.valid) return false;
    if (!this.isDateValid()) return false;

    return true;
  }

  showAlreadyRegisteredDate() {
    if (!this.isDateValid()) return false;
    if (!this.alreadyRegisteredDate) return false;
    if (this.getFormattedDate() !== this.alreadyRegisteredDate) return false;

    return true;
  }

  getFormattedDate() {
    const value = this.formGroup.get('date')!.value;

    const [month, year] = value.split('/');

    return `${year}-${month.padStart(2, '0')}-01T00:00:00.000Z`;
  }

  onCreateReview() {
    if (this.isFormValid()) {
      this.isCreating = true;

      this._service.isDateAlreadyRegistered(this.getFormattedDate()).subscribe({
        next: (res) => {
          if (res) {
            this.isCreating = false;
            this.alreadyRegisteredDate = this.getFormattedDate();
            return;
          }

          const dtos: CreateClientReviewDto[] = this.reviews.map((item) => ({
            clientId: typeof item.id === 'string' ? parseInt(item.id) : item.id,
            score: item.score,
            reason: item.reason,
            date: this.getFormattedDate(),
          }));

          this._service
            .create(dtos)
            .subscribe(() => this._router.navigate(['avaliacoes/1']));
        },
        error: () => {
          this.isCreating = false;
          this.invalidDate = this.formGroup.get('date')!.value;
        },
      });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
