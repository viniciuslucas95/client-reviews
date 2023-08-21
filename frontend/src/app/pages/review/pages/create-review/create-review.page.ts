import { Component } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-create-review-page',
  templateUrl: './create-review.page.html',
  styleUrls: ['./create-review.page.scss']
})
export class CreateReviewPage {
  constructor(
      private readonly _modalService: NgbModal,
      private readonly _route: ActivatedRoute
  ) {

  }
}
