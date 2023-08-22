import {Component} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-lateral-menu',
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.scss']
})
export class LateralMenuComponent {
  public activeRoute = 'clientes'
  public readonly defaultButtonClass = "btn btn-lg btn-primary btn-lateral-menu b-800"

  constructor(router: Router) {
    router.events
        .pipe(
            filter(event => event instanceof NavigationEnd)
        )
        .subscribe(_ => {
          if(location.pathname.includes('clientes')){
            this.activeRoute = 'clientes'
          }else{
            this.activeRoute = 'avaliacoes'
          }
        })
  }
}
