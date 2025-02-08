import { Injectable } from '@angular/core';
import { MenuComponent } from '../components/menu/menu.component';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private menuComponent!: MenuComponent;

  setMenuComponent(menu: MenuComponent) {
    this.menuComponent = menu;
  }

  showSearchBooks() {
    this.menuComponent.showSearchBooks();
  }

  showNewBook() {
    this.menuComponent.showNewBook();
  }

  showMulta() {
    this.menuComponent.showMulta();
  }

  resetViews() {
    this.menuComponent.resetViews();
  }
}
