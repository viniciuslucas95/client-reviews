import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TableContent} from "./table.component.type";

@Component({
  selector: 'app-table[onPageChanged][content]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit{
  @Input() content!:TableContent<T>;
  @Input() onPageChanged!: (page:number)=>void

  public page = 1

  constructor(private readonly _route: ActivatedRoute) { }

  ngOnInit(){
    const pageString = this._route.snapshot.paramMap.get('page');

    if(!pageString)  return

    const page = parseInt(pageString)

    if(isNaN(page)) return

    if(page < 1) return

    this.page = page
  }

  getItemPropValue(item:T, key:keyof T){
    return item[key]
  }

  getTotalItems(){
    if(this.content.total === undefined) return 0

    if(this.content.total < 0) return 0

    return this.content.total
  }

  getPages(){
    const totalPages = this.getTotalPages()

    const pages:number[] = []

    if(this.page > 2) pages.push(1)

    if(this.page > 1) pages.push(this.page - 1)

    pages.push(this.page)

    if(this.page < totalPages - 1) pages.push(this.page + 1)

    if(this.page <= totalPages - 1) pages.push(totalPages)

    return pages
  }

  getTotalItemsString(){
    return this.getTotalItems().toString()
  }

  getTotalPages(){
    return Math.ceil(this.getTotalItems() / 10)
  }
}
