import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import ServiceBase from "../../base/service.base";
import PaginatedDto from "../../dtos/paginated.dto";
import {CreateClientReviewDto, PaginatedClientReviewDto} from "./review.dto";

@Injectable({
    providedIn: 'root'
})
export default class ReviewService extends ServiceBase{
    constructor(httpClient:HttpClient) {
        super("client-reviews", httpClient);
    }

    getPaginated(offset = 0){
        return this.httpClient.get<PaginatedDto<PaginatedClientReviewDto>>(this.baseUrl + `?offset=${offset.toString()}`)
    }

    create(dtos: CreateClientReviewDto[]){
        return this.httpClient.post(this.baseUrl, dtos)
    }
}