import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Router,
  NavigationEnd,
  NavigationStart,
  RouterEvent,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-my-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  private _router: Subscription;

  constructor(
    private router: Router,
    public store: Store<AppState>,
  ) { }
  @BlockUI() blockUI: NgBlockUI;

  ngOnDestroy() {
    this._router.unsubscribe();
  }

  ngOnInit() {

    // this.blockUI.start();
    this._router = this.router.events.subscribe(this.navigationInterceptor.bind(this));
  }

  private navigationInterceptor(e: RouterEvent) {
    if (e instanceof NavigationStart) {
    }

    if (
      e instanceof NavigationEnd ||
      e instanceof NavigationCancel ||
      e instanceof NavigationError
    ) {
      const splashScreen = document.querySelector('.app-splash-screen');
      if (splashScreen) {
        splashScreen['style'].opacity = 0;
        setTimeout(() => splashScreen && splashScreen.parentNode.removeChild(splashScreen), 300);
      }
    }
  }
}
