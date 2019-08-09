import { InjectionToken } from '@angular/core';
import { HttpParams } from '@angular/common/http';

export const NGN_MOCKS_TOKEN = new InjectionToken('NGN_MOCKS_TOKEN');

type MockFn<U> = () => U;

export interface IMock<T> {
    path: string;
    method: NgNHttpMethod;
    params?: HttpParams;
    mock: T | MockFn<T>;
    delay?: number;
    error?: { status: number, statusText: string };
}


export enum NgNHttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}
