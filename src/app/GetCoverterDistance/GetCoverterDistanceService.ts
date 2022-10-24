import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { GetCoverterDistanceInterface } from './GetCoverterDistanceInterface';

@Injectable()
export class GetCoverterDistanceServices {
    constructor(private _http: HttpClient) {}

    getDistanceData(): Observable<GetCoverterDistanceInterface[]> {
        return this._http
            .get<GetCoverterDistanceInterface>(env.testURIDistance)
            .pipe(
                map((data) => {
                    return Object.entries(data).map(function (
                        exchangeRates: any
                    ): GetCoverterDistanceInterface {
                        return <GetCoverterDistanceInterface>{
                            code: exchangeRates[0],
                            nameDistance: exchangeRates[1],
                        };
                    });
                })
            );
    }
}
