import { IMock, NgNHttpMethod } from 'ngn-mocks';
import { HttpParams } from '@angular/common/http';

export const TEST_MOCK: IMock<{ test: string }> = {
    path: '/api/test',
    method: NgNHttpMethod.GET,
    mock: () => {
        return {test: 'IT WORKS'};
    },
};

export const TEST_MOCK2: IMock<{ test: string }> = {
    path: '/api/second-test',
    // params: new HttpParams().append('lang', 'ru'),
    method: NgNHttpMethod.GET,
    mock: {test: 'IT WORKS'},
};
