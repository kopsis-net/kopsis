import { Component, OnInit } from '@angular/core';
import { Kullanici } from './api/model/user';
import { KullaniciService } from './api/service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit {
  
  sidebarOpen: boolean = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    if (this.sidebarOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
  }

  kullanici: Kullanici = new Kullanici('', '', ''); // Boş bir Kullanıcı nesnesi
  kullanicilar$!: Observable<Kullanici[]>; // Kullanıcıların alınacağı değişken

  constructor(private kullaniciService: KullaniciService) { }

  ngOnInit() {
    this.kullanicilar$ = this.kullaniciService.tumKullanicilar().valueChanges();
   
  }

  async onSubmit() {
    await this.kullaniciService.ekle(this.kullanici); // Servis ile kullanıcı ekle
    this.kullanici = new Kullanici('', '', ''); // Formu temizle
  }

  async sil(id: string) {
    await this.kullaniciService.sil(id); // Servis ile kullanıcı sil
  }
}