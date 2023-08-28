import { Observable } from 'rxjs';

import PaginatedDto from '../../dtos/paginated.dto';
import {
  CreateClientDto,
  PaginatedClientDto,
  PaginatedClientForReviewCreationDto,
} from './client.dto';

export interface IClientService {
  getPaginated(
    offset?: number,
    name?: string,
  ): Observable<PaginatedDto<PaginatedClientDto>>;
  getPaginatedForReviewCreation(
    offset?: number,
    name?: string,
  ): Observable<PaginatedDto<PaginatedClientForReviewCreationDto>>;
  isCnpjAlreadyRegistered(cnpj: string): Observable<boolean>;
  create(dto: CreateClientDto): Observable<number>;
}
