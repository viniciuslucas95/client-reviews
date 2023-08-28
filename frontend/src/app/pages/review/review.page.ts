import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TableContent } from '../../components/table/table.component.type';
import { ClientReviewTableContentItem } from './review.dto';
import DateUtil from '../../utils/date.util';
import injectable from '../../constants/injectable.constant';
import { IReviewService } from './review.interface';

@Component({
  selector: 'app-review-page',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage {
  public tableContent: TableContent<ClientReviewTableContentItem> = {
    total: 0,
    items: [],
    columns: [
      {
        key: 'date',
        name: 'Data',
      },
      {
        key: 'nps',
        name: 'NPS',
      },
      {
        key: 'total',
        name: 'Participantes',
      },
    ],
  };

  public page = 1;

  constructor(
    private readonly _route: Router,
    private readonly _activatedRoute: ActivatedRoute,
    @Inject(injectable.reviewService)
    private readonly _service: IReviewService,
    private readonly _dateUtil: DateUtil,
  ) {}

  ngOnInit() {
    const pageString = this._activatedRoute.snapshot.paramMap.get('page');

    if (!pageString) return;

    const page = parseInt(pageString);

    if (isNaN(page)) return;

    if (page < 1) return;

    this.page = page;

    this.onPageChanged(this.page);
  }

  onTablePageChanged(page: number) {
    location.replace(`/avaliacoes/${page}`);
  }

  onPageChanged(page: number) {
    const offset = (page - 1) * 10;

    this._service.getPaginated(offset).subscribe((res) => {
      if (res.items.length === 0 && location.pathname !== '/avaliacoes/1') {
        location.replace('/avaliacoes/1');
        return;
      }

      this.tableContent = {
        ...this.tableContent,
        total: res.count,
        items: res.items.map((item) => ({
          id: item.date,
          date: this._dateUtil.formatToPtStringMonthAndYear(item.date),
          total: item.total.toString(),
          nps: item.nps.toString(),
        })),
      };
    });
  }

  onCreateReview() {
    this._route.navigate(['/avaliacoes/criar']);
  }
}
