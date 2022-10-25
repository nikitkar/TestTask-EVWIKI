import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { GetExchangeRatesInterface, CurrencyCode } from './GetTradingAmountRates';

@Injectable()
export class GetTradingAmountServices {
    constructor(private _http: HttpClient) {}

    getCurrencyExchanges(baseСurrencyURL: string): Observable<GetExchangeRatesInterface[]> {

        // ${env.URL}?api_key=${env.api_key}&base=${env.baseСurrencyURL}
        // env.testURI

        return this._http.get<GetExchangeRatesInterface>(`${env.URL}?api_key=${env.api_key}&base=${baseСurrencyURL}`).pipe(map((data) => {
            return Object.entries(data['exchange_rates']).map(function (
                    exchangeRates: any
                ): GetExchangeRatesInterface {
                    let CurrencyCodeName = '';

                    CurrencyCode.forEach((item) => {
                        if (item[0] == exchangeRates[0])
                            CurrencyCodeName = item[1];
                    });

                    return <GetExchangeRatesInterface>{
                        exchange_rates: exchangeRates[0],
                        amount: exchangeRates[1],
                        currencyCode: CurrencyCodeName,
                    };
                });
            })
        );
    }
}
