import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    template: `
        {{test$ | async | json}}
        {{test2$ | async | json}}
    `,
})
export class AppComponent implements OnInit {
    test$: Observable<{ test: string }>;
    test2$: Observable<{ test: string }>;

    constructor(private http: HttpClient) {

        this.test$ = this.http.get<{ test: string }>('/api/test');
        this.test2$ = this.http.get<{ test: string }>('/api/second-test');
    }

    ngOnInit(): void {

    }
}
