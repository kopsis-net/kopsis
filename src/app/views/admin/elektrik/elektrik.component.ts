import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Elektrik } from '../../../api/model/elektrik';
import { ElektrikService } from '../../../api/elektrik.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-elektrik',
  templateUrl: './elektrik.component.html'
})
export class ElektrikComponent implements OnInit {




  
  @ViewChild('formRef') formRef!: NgForm;

  resetform() {
    this.isEditMode = false;
    this.formRef.resetForm();
    this.tutoriale.key = null;
  }
  @Input() color: string = 'light';


  tutorials?: Elektrik[];
  tutoriale: Elektrik = new Elektrik();
  isEditMode: boolean = false;


  elektrikVerileri: Elektrik[] = [];

  constructor(private tutorialService: ElektrikService) { }

  ngOnInit(): void {
    this.tutorialService.getElektrikVerileri().subscribe(veriler => {
      this.elektrikVerileri = veriler;
    });

    

  }







  selectItem(elektrik: Elektrik): void {
    this.tutoriale = { ...elektrik }; // Clone the selected Elektrik object to avoid reference issues
    this.tutoriale.key = elektrik.key; // SomeUniqueIdentifier, Elektrik nesnesinin benzersiz bir özelliği olmalı
    this.isEditMode = true;
  }

  async onSubmit(): Promise<void> {
    if (!this.tutoriale || !this.tutoriale.active || !this.tutoriale.reactive || !this.tutoriale.capacitive) {

      Swal.fire({
        position: 'top-end',
        title: 'HATA!',
        text: "Lütfen tüm alanları doldurun.", // Hatanın mesaj özelliğini kullanıyoruz
        icon: "error",
        showConfirmButton: false,
        timer: 4500,
      });
      return; // Input alanlarından biri boşsa kayıt yapmayı durdur
    }
    if (this.isEditMode) {
      let key = this.tutoriale?.key;
      if (key) {
        try {
          await this.tutorialService.update(key, this.tutoriale);
          this.resetform();
        } catch (error) {
          console.error('Elektrik güncellenirken bir hata oluştu:', error);
        }
      } else {
        console.error('Anahtar değeri geçersiz.');
      }
    } else {
      this.isEditMode = true;
      try {
        await this.tutorialService.create(this.tutoriale);
        this.resetform()
        console.log('Yeni öğe başarıyla oluşturuldu!');
      } catch (error) {
        console.error('Yeni öğe oluşturulurken bir hata oluştu:', error);
      }
    }
  }
  async onDelete(key: string | null | undefined): Promise<void> {
    Swal.fire({
      title: "Emin misiniz?",
      text: "Bu işlemi geri alamayacaksınız!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet, sil!"
    }).then((result) => {
      if (result.isConfirmed) {
        if (key) {
          try {
            this.tutorialService.delete(key);
            this.resetform(); // Formu sıfırla
          } catch (error) {
            console.error('Elektrik silinirken bir hata oluştu:', error);
          }
        } else {
          console.error('Anahtar değeri geçersiz.');
        }
      } else {
        this.resetform()
      }
    });
  }



}
