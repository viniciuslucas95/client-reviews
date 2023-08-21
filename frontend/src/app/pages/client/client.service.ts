import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import ServiceBase from "../../base/service.base";
import PaginatedDto from "../../dtos/paginated.dto";
import {ClientTableContentItem} from "./client.dto";

@Injectable({
    providedIn: 'root'
})
export default class ClientService extends ServiceBase{
    constructor(httpClient:HttpClient) {
        super("clients", httpClient);
    }

    getPaginated(offset = 0){
        return this.httpClient.get<PaginatedDto<ClientTableContentItem>>(this.baseUrl + `?offset=${offset.toString()}`)
    }
}
