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

  update(key: string, value: any): Promise<void> {
    return this.elkRef.update(key, value).then((result: any) => {
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
    })
    .catch((error) => {
      Swal.fire({
        position: 'top-end',
        title: 'HATA!',
        text: error,
        icon: "error",
        showConfirmButton: false,
        timer: 4500,
      });
      //window.alert(error.message);
    });
  }

  delete(key: string): Promise<void> {
    return this.elkRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.elkRef.remove();
  }
}