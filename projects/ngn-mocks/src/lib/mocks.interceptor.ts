import {
    HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { mergeMap } from 'rxjs/operators';
import { IMock, NGN_MOCKS_TOKEN } from './mocks.models';

@Injectable()
export class NgNMocksInterceptor implements HttpInterceptor {
    constructor(
        @Inject(NGN_MOCKS_TOKEN) private mocks: IMock<any>[],
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url = req.url.replace(/^.*\/\/[^\/]+/, '');
        if (this.mocks && !url.startsWith('/config')) {
            const method = req.method;
            const params = req.params;
            const mock = this._findMock(url, method, params);
            if (mock) {
                console.log(`[INTERCEPTED URL]::[${url}]`);
                return timer(mock.delay).pipe(mergeMap(() => {
                    if (mock.error) {
                        const error: HttpErrorResponse = new HttpErrorResponse({
                            status: mock.error.status,
                            statusText: mock.error.statusText,
                            url: url,
                        });
                        return throwError(error);
                    } else {
                        return of(new HttpResponse({status: 200, body: this._resolveMock(mock.mock)}));
                    }
                }));
            } else {
                return next.handle(req);
            }
        } else {
            return next.handle(req);
        }
    }

    private _findMock<T>(path: string, method: string, params: HttpParams): IMock<T> {
        const mock: any = this.mocks.find(m => {
            if (m.params && m.params.toString() !== params.toString()) {
                return false;
            }
            return (path.toLowerCase().indexOf(`${m.path.replace('/*', '')}`.toLowerCase()) === 0) &&
                method === m.method;
        });
        return <IMock<T>>mock;
    }

    private _resolveMock<T>(mock): any {
        if (typeof mock === 'function') {
            return mock();
        } else {
            return mock;
        }
    }
}
