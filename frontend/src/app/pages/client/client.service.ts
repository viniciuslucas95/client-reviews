import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import ServiceBase from "../../base/service.base";
import PaginatedDto from "../../dtos/paginated.dto";
import {CreateClientDto,  PaginatedClientDto, PaginatedClientForReviewCreationDto} from "./client.dto";
import {IClientService} from "./client.interface";

@Injectable()
export default class ClientService extends ServiceBase implements IClientService{
    constructor(httpClient:HttpClient) {
        super("clients", httpClient);
    }

    getPaginated(offset = 0, name?: string){
        let url = this.baseUrl + `?offset=${offset.toString()}`

        if(name) url += `&name=${name}`

        return this.httpClient.get<PaginatedDto<PaginatedClientDto>>(url)
    }

    getPaginatedForReviewCreation(offset = 0, name?: string){
        let url = this.baseUrl + '/review-creation' + `?offset=${offset.toString()}`

        if(name) url += `&name=${name}`

        return this.httpClient.get<PaginatedDto<PaginatedClientForReviewCreationDto>>(url)
    }

    isCnpjAlreadyRegistered(cnpj: string){
        return this.httpClient.get<boolean>(this.baseUrl + '/cnpj-availability' + `?cnpj=${cnpj}`)
    }

    create(dto:CreateClientDto){
        return this.httpClient.post<number>(this.baseUrl, dto)
    }
}
