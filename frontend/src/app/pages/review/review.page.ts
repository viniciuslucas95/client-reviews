import { Component } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";

@Component({
  selector: 'app-review-page',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss']
})
export class ReviewPage {
  constructor(
      private readonly _modalService: NgbModal,
      private readonly _route: Router
  ) {

  }

  onCreateReview(){
    this._route.navigate(['/avaliacoes/criar'])
  }
}
