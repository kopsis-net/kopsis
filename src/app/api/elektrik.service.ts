import { Injectable, NgZone } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import Swal from 'sweetalert2';
import { Elektrik } from './model/elektrik';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElektrikService {
  private dbPath = 'Elektrik';
  elkRef: AngularFireList<Elektrik>;

  constructor(private db: AngularFireDatabase, public ngZone: NgZone) {
    this.elkRef = db.list(this.dbPath);
  }



  create(elektrik: Elektrik): any {
    return this.elkRef.push(elektrik);
  }

  async update(key: string, value: any): Promise<void> {
    try {
      await this.elkRef.update(key, value);
      this.ngZone.run(() => {
        Swal.fire({
          position: 'top-end',
          title: 'TAMAM!',
          text: 'Kaydınız Güncellenmiştir.',
          icon: 'success',
          showConfirmButton: false,
          timer: 14500,
        });
      });
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        title: 'HATA!',
        text: 'Kaydınız Güncellenirken bir hata oluştu.',
        icon: 'error',
        showConfirmButton: false,
        timer: 4500,
      });
    }
  }

  async delete(key: string): Promise<void> {
    await this.elkRef.remove(key);
    Swal.fire({
      title: 'Silindi!',
      text: 'Dosyanız silindi.',
      icon: 'success',
    });
  }

  deleteAll(): Promise<void> {
    return this.elkRef.remove();
  }

  getElektrikVerileri(): Observable<Elektrik[]> {
    return this.elkRef.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val()
        }));
      })
    );
  }

 
}
