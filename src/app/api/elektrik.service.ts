import { Injectable, NgZone } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import Swal from 'sweetalert2';
import { Elektrik } from './model/elektrik';

@Injectable({
  providedIn: 'root',
})
export class ElektrikService {
  private dbPath = 'Elektrik';

  elkRef: AngularFireList<Elektrik>;

  UserData: any;

  constructor(private db: AngularFireDatabase,
    public ngZone: NgZone) {
    this.elkRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Elektrik> {
    return this.elkRef;
  }

  create(elektrik: Elektrik): any {
    return this.elkRef.push(elektrik);
  }

  async update(key: string, value: any): Promise<void> {
    try {
      const result = await this.elkRef.update(key, value);
      this.UserData = result;
      this.ngZone.run(() => {
        Swal.fire({
          position: 'top-end',
          title: 'TAMAM!',
          text: 'Kaydınız Güncellenmiştir.',
          icon: "success",
          showConfirmButton: false,
          timer: 14500,
        });
      });
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        title: 'HATA!',
        text: "Kaydınız Yapılamadı", // Hatanın mesaj özelliğini kullanıyoruz
        icon: "error",
        showConfirmButton: false,
        timer: 4500,
      });
    }
  }

  async delete(key: string): Promise<void> {
    await this.elkRef.remove(key);
    Swal.fire({
      title: "Silindi!",
      text: "Dosyanız silindi.",
      icon: "success"
    });
  }

  deleteAll(): Promise<void> {
    return this.elkRef.remove();
  }
}