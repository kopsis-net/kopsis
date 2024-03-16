import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Kullanici } from "../../../api/model/user";
import { KullaniciService } from "../../../api/service.service";
import { AuthService } from "../../../api/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
 
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}


}
