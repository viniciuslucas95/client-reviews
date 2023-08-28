import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import ServiceBase from '../../base/service.base';
import PaginatedDto from '../../dtos/paginated.dto';
import { CreateClientReviewDto, PaginatedClientReviewDto } from './review.dto';
import { IReviewService } from './review.interface';

@Injectable()
export default class ReviewService
  extends ServiceBase
  implements IReviewService
{
  constructor(httpClient: HttpClient) {
    super('client-reviews', httpClient);
  }

  getPaginated(offset = 0) {
    return this.httpClient.get<PaginatedDto<PaginatedClientReviewDto>>(
      this.baseUrl + `?offset=${offset.toString()}`,
    );
  }

  create(dtos: CreateClientReviewDto[]) {
    return this.httpClient.post<void>(this.baseUrl, dtos);
  }

  isDateAlreadyRegistered(date: string) {
    return this.httpClient.get<boolean>(
      this.baseUrl + '/date-availability' + `?date=${date}`,
    );
  }
}
