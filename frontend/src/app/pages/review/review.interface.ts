import { Observable } from 'rxjs';

import PaginatedDto from '../../dtos/paginated.dto';
import { CreateClientReviewDto, PaginatedClientReviewDto } from './review.dto';

export interface IReviewService {
  getPaginated(
    offset?: number,
  ): Observable<PaginatedDto<PaginatedClientReviewDto>>;

  create(dtos: CreateClientReviewDto[]): Observable<void>;
  isDateAlreadyRegistered(date: string): Observable<boolean>;
}
