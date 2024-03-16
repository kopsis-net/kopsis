import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Kullanici } from './model/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KullaniciService {

  private readonly kullaniciRef: AngularFireList<Kullanici>;

  constructor(private readonly db: AngularFireDatabase) {
    this.kullaniciRef = db.list<Kullanici>('Kullanicilar');
  }


  // Kullanıcı ekleme
  async ekle(kullanici: Kullanici): Promise<void> {
    const snapshot = await this.kullaniciRef.push(kullanici);
    const pushKey = snapshot.key;
    kullanici.id = pushKey;
    if (pushKey) {
      await this.kullaniciRef.update(pushKey, kullanici);
    } else {
      console.error('pushKey is null or undefined');
    }
  }

  // Kullanıcı listesi alma
  tumKullanicilar(): AngularFireList<Kullanici> {
    return this.kullaniciRef;
  }

  // Kullanıcı id ile alma
  kullaniciById(id: string): any {
    return this.kullaniciRef.snapshotChanges().pipe(
      map(actions => actions.find(a => a.payload.key === id))
    );
  }

  // Kullanıcı güncelleme
  async guncelle(kullanici: Kullanici): Promise<void> {
    await this.kullaniciRef.update(kullanici.id!, kullanici);
  }

  // Kullanıcı silme
  async sil(id: string): Promise<void> {
    await this.kullaniciRef.remove(id);
  }
}