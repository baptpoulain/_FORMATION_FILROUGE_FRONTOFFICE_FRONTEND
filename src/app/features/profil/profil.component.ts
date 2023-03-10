import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth-service/auth.service";
import {Observable, Subscription, tap} from "rxjs";
import {User} from "../../shared/models/User.model";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  user!: User

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
     this.subscription= this.authService.auth$.pipe(
       tap((user)=>{
          this.user = user;
       })
     ).subscribe()
  }

  ngOnDestroy(): void {
    if(this.subscription != null){
      this.subscription.unsubscribe();
    }
  }


}
