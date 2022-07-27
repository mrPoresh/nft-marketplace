import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface MenuControl {
  mainMenu: boolean,
  exploreMenu: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class ToggleMenuBackService {

  private _showBack = new BehaviorSubject<MenuControl>({ 
    mainMenu: false,
    exploreMenu: false, 
  });

  constructor() { }

  showMain() {
    this._showBack.next({ 
      mainMenu: true,
      exploreMenu: false,
    });
  }

  showAll() {
    this._showBack.next({ 
      mainMenu: true,
      exploreMenu: true,
    });
  }

  hideAll() {
    this._showBack.next({ 
      mainMenu: false,
      exploreMenu: false,
    });
  }

  attach(): Observable<MenuControl> {
    return this._showBack.asObservable();
  }
  
}