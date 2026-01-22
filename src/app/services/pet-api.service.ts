import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environments';
import {QueryFilterModel} from '../models';
import {petRouter} from '../utils';
import {Observable, tap} from 'rxjs';
import {BaseCacheService} from './base-case.service';

@Injectable({
  providedIn: 'root'
})
export class PetApiService extends BaseCacheService {
  private readonly CACHE_KEY = 'PetApiService';

  constructor(private http: HttpClient) {
    super();
  }

  getFilter(model: QueryFilterModel): Observable<any> {
    return this.http.post(environment.api.baseUrl + petRouter.getFilter, model);
  }

  delete(id: any): Observable<any> {
    return this.http
      .delete(environment.api.baseUrl + petRouter.delete + id)
      .pipe(tap(() => this.clearSpecificCache(this.CACHE_KEY)));
  }

  create(model: any): Observable<any> {
    const url = environment.api.baseUrl + petRouter.create;
    console.log('Calling API create:', url, model);
    return this.http
      .post(url, model)
      .pipe(tap(() => this.clearSpecificCache(this.CACHE_KEY)));
  }

  update(id: any, model: any): Observable<any> {
    return this.http
      .put(environment.api.baseUrl + petRouter.update + id, model)
      .pipe(tap(() => this.clearSpecificCache(this.CACHE_KEY)));
  }

  getById(id: string): Observable<any> {
    return this.http.get(environment.api.baseUrl + petRouter.getById + id);
  }

  getCombobox(): Observable<any> {
    return this.createCache(this.CACHE_KEY, () => this.http.get(environment.api.baseUrl + petRouter.getCombobox));
  }

  getAll(): Observable<any> {
    const baseUrl = environment.api.baseUrl;
    const path = petRouter.getAll;
    const url = baseUrl + path;

    console.log('------------------------------------------------');
    console.log('PetApiService.getAll() called');
    console.log('Base URL:', baseUrl);
    console.log('Path:', path);
    console.log('Full URL:', url);
    console.log('------------------------------------------------');

    return this.http.get(url).pipe(
        tap({
            next: (res) => console.log('PetApiService.getAll() success:', res),
            error: (err) => console.error('PetApiService.getAll() error:', err)
        })
    );
  }
}
