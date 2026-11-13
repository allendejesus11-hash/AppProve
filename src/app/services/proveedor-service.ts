import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Proveedor} from '../model/proveedor';

@Service()
export class ProveedorService {
  private url = environment.apiURL;
  httpClient: HttpClient = inject(HttpClient);
  constructor() {
  }
  list():Observable<any>{
    return this.httpClient.get(environment.apiURL+'/proveedores');
  }
  listId(id: number){
    return this.httpClient.get(environment.apiURL+'/proveedor/'+id+'');
  }
  insert(proveedor:Proveedor){
    return this.httpClient.post(environment.apiURL+'/proveedor', proveedor);
  }
  update(proveedor:Proveedor){
    return this.httpClient.put(environment.apiURL+'/proveedor', proveedor);
  }
  delete(id: number){
    return this.httpClient.delete(environment.apiURL+'/proveedor/'+id);
  }
}
