import { ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { IMock, NGN_MOCKS_TOKEN } from './mocks.models';
import { NgNMocksInterceptor } from './mocks.interceptor';

@NgModule({})
export class NgNMocksModule {
    static forRoot(mocks: IMock<any>[] = []): ModuleWithProviders {
        return {
            ngModule: NgNMocksModule,
            providers: [
                {
                    provide: NGN_MOCKS_TOKEN,
                    useValue: mocks,
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: NgNMocksInterceptor,
                    multi: true,
                },
            ],
        };
    }
}
