import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import ServiceBase from "../../base/service.base";
import PaginatedDto from "../../dtos/paginated.dto";
import {CreateClientDto, PaginatedClientDto, PaginatedClientForReviewCreationDto} from "./client.dto";

@Injectable({
    providedIn: 'root'
})
export default class ClientService extends ServiceBase{
    constructor(httpClient:HttpClient) {
        super("clients", httpClient);
    }

    getPaginated(offset = 0){
        return this.httpClient.get<PaginatedDto<PaginatedClientDto>>(this.baseUrl + `?offset=${offset.toString()}`)
    }

    getPaginatedForReviewCreation(offset = 0){
        return this.httpClient.get<PaginatedDto<PaginatedClientForReviewCreationDto>>(this.baseUrl + '/review-creation' + `?offset=${offset.toString()}`)
    }

    create(dto:CreateClientDto){
        return this.httpClient.post<number>(this.baseUrl, dto)
    }
}
