import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SignupComponent} from "../../auth/container/signup/signup.component";
import {ProfilComponent} from "../../features/profil/profil.component";
import {AuthService} from "../../shared/services/auth-service/auth.service";
import {User} from "../../shared/models/User.model";
import {UserService} from "../../shared/services/user-service/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user!: any;
  displaySharedCalender: boolean = false;
  planningWithInteraction!: any
  constructor(private dialog : MatDialog, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.authService.auth$.getValue()
    console.log(this.user)
    this.userService.getPlanningWithInteraction(this.user.userId).subscribe((data)=>{
      this.planningWithInteraction = data
      if(this.planningWithInteraction.length == 0){
        this.displaySharedCalender = false
      }else{
        this.displaySharedCalender = true
      }
    })
  }

  displayProfil() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "auto";
/*    dialogConfig.maxWidth = "600px";*/
    this.dialog.open(ProfilComponent, dialogConfig)
  }

  logout() {
    //todo faire le logout
  }

  goToSharedCalendar(planningId: any) {
      console.log(planningId)
  }
}
