import {Component, Input} from '@angular/core';

import {TableButtonsColumn, TableContent} from "./table.component.type";

@Component({
  selector: 'app-table[onPageChanged][content][page]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T extends {id: string}> {
  @Input() content!:TableContent<T>;
  @Input() onPageChanged!: (page:number)=>void
  @Input() page!:number

  getItemPropContentType(item: T, key: keyof T){
    if(typeof item[key] === 'object') return 'buttons'
    return 'text'
  }

  getItemPropText(item:T, key:keyof T){
    return item[key] as string
  }

  getItemPropButtons(item:T, key:keyof T){
    return item[key] as TableButtonsColumn[]
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
