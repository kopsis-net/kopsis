import { Component, Input, OnInit } from '@angular/core';
import { Elektrik } from '../../../api/model/elektrik';
import { Observable, map } from 'rxjs';
import { ElektrikService } from '../../../api/elektrik.service';

@Component({
  selector: 'app-elektrik',
  templateUrl: './elektrik.component.html'
})
export class ElektrikComponent  implements OnInit{
  isEditMode: boolean = false;
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  tutorials?: Elektrik[];
  currentTutorial?: Elektrik;

  tutoriale: Elektrik = new Elektrik();
  
  operationType: 'add' | 'edit' | 'delete' = 'add'; // Varsayılan olarak ekleme işlemi
  displayedColumns: string[] = ['date', 'aktif', 'reaktif', 'kapasitif'];
  constructor(
    private tutorialService: ElektrikService,
  ) {}
  ngOnInit(): void {
    this.retrieveTutorials();
  }
 
  retrieveTutorials(): void {
    this.tutorialService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.tutorials = data;
      });
  }
}
