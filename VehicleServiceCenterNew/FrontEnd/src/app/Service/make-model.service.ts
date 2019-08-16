import { Injectable } from '@angular/core';
import {MakeModel} from "../Model/MakeModel";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Item} from "../Model/Item";


const URL ='/MakeModelController';
@Injectable({
  providedIn: 'root'
})
export class MakeModelService {

  constructor(private http :HttpClient) { }


  addMakeModelDetails(tableMakeModel: Array<MakeModel>) {

    return this.http.post<MakeModel>(environment.backend_url + URL+"/addMakeModel",tableMakeModel);

  }

  getMakeModelDetails(selectModel: string) {

    return this.http.get<Array<MakeModel>>(environment.backend_url + URL+"/addMakeModel/"+selectModel);

  }


  searchMakeModelId(insertItemModel: string, insertselectedMake: string) {

    return this.http.get<string>(environment.backend_url + URL+'/searchMakeModelId/'+insertItemModel+'/'+ insertselectedMake);


  }
}
