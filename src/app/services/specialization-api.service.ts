import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environments';
import {QueryFilterModel} from '../models';
import {specializationRouter} from '../utils';
import {Observable, tap} from 'rxjs';
import {BaseCacheService} from './base-case.service';

@Injectable({
  providedIn: 'root'
})
export class SpecializationApiService extends BaseCacheService {
  private readonly CACHE_KEY = 'SpecializationApiService';

  constructor(private http: HttpClient) {
    super();
  }

  getFilter(model: QueryFilterModel): Observable<any> {
    return this.http.post(environment.api.baseUrl + specializationRouter.getFilter, model);
  }

  delete(id: any): Observable<any> {
    return this.http
      .delete(environment.api.baseUrl + specializationRouter.delete + id)
      .pipe(tap(() => this.clearSpecificCache(this.CACHE_KEY)));
  }

  create(model: any): Observable<any> {
    const url = environment.api.baseUrl + specializationRouter.create;
    console.log('Calling API create:', url, model);
    return this.http
      .post(url, model)
      .pipe(tap(() => this.clearSpecificCache(this.CACHE_KEY)));
  }

  update(id: any, model: any): Observable<any> {
    return this.http
      .put(environment.api.baseUrl + specializationRouter.update + id, model)
      .pipe(tap(() => this.clearSpecificCache(this.CACHE_KEY)));
  }

  getById(id: string): Observable<any> {
    return this.http.get(environment.api.baseUrl + specializationRouter.getById + id);
  }

  getCombobox(): Observable<any> {
    return this.createCache(this.CACHE_KEY, () => this.http.get(environment.api.baseUrl + specializationRouter.getCombobox));
  }
}
