import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Planning} from "../../models/Planning.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlanningService {
  planningView$: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  constructor(private http: HttpClient) { }

  create(planningTitle: string, planningDescription: string, planningCreatedAt: Date, userId:string){
    return this.http.post<Planning>('http://localhost:8080/api/planning', {
      planningTitle,
      planningDescription,
      planningCreatedAt,
      userId
    })
  }

  getPlanningById(planningId: string){
    return this.http.get<any>("http://localhost:8080/api/planning/" + planningId)
  }

  getPlanning(userId: string){
    return this.http.get<any>("http://localhost:8080/api/user/" + userId + "/planning")
  }

  interactWithPlanning(userId: number, planningId: number, permissionId: number){
    let interactData = {userId, planningId, permissionId}
    return this.http.post<any>("http://localhost:8080/api/interact", interactData)
  }

  getShareUsersByPlanning(planningId:number){
    return this.http.get<any>("http://localhost:8080/api/interact/planning/" + planningId)
  }


}
