import {HttpClient} from "@angular/common/http";

export default abstract class ServiceBase{
    protected readonly baseUrl:string
    protected readonly httpClient:HttpClient

    protected constructor(route:string, httpClient:HttpClient) {
        this.baseUrl = `http://localhost:5189/api/${route}`
        this.httpClient = httpClient
    }
}
