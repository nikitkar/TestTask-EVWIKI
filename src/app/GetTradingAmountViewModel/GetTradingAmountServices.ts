import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { GetExchangeRatesInterface } from './GetTradingAmountRates';

@Injectable()
export class GetTradingAmountServices {
    constructor(private _http: HttpClient) {}

    // ${env.URL}?api_key=${env.api_key}&base=USD

    getCurrencyExchanges(): Observable<GetExchangeRatesInterface[]> {
        const CurrencyCode = [
            ['ARS', 'Argentine Peso'],
            ['AUD', 'Australian Dollar'],
            ['BCH', 'Bitcoin Cash'],
            ['BGN', 'Bulgarian Lev'],
            ['BNB', 'Binance Coin'],
            ['BRL', 'Brazilian Real'],
            ['BTC', 'Bitcoin'],
            ['CAD', 'Canadian Dollar'],
            ['CHF', 'Swiss Franc'],
            ['CNY', 'Chinese Yuan'],
            ['CZK', 'Czech Republic Koruna'],
            ['DKK', 'Danish Krone'],
            ['DOGE', 'Dogecoin'],
            ['DZD', 'Algerian Dinar'],
            ['ETH', 'Ethereum'],
            ['EUR', 'Euro'],
            ['GBP', 'British Pound Sterling'],
            ['HKD', 'Hong Kong Dollar'],
            ['HRK', 'Croatian Kuna'],
            ['HUF', 'Hungarian Forint'],
            ['IDR', 'Indonesian Rupiah'],
            ['ILS', 'Israeli New Sheqel'],
            ['INR', 'Indian Rupee'],
            ['ISK', 'Icelandic Króna'],
            ['JPY', 'Japanese Yen'],
            ['KRW', 'South Korean Won'],
            ['LTC', 'Litecoin'],
            ['MAD', 'Moroccan Dirham'],
            ['MXN', 'Mexican Peso'],
            ['MYR', 'Malaysian Ringgit'],
            ['NOK', 'Norwegian Krone'],
            ['NZD', 'New Zealand Dollar'],
            ['PHP', 'Philippine Peso'],
            ['PLN', 'Polish Zloty'],
            ['RON', 'Romanian Leu'],
            ['RUB', 'Russian Ruble'],
            ['SEK', 'Swedish Krona'],
            ['SGD', 'Singapore Dollar'],
            ['THB', 'Thai Baht'],
            ['TRY', 'Turkish Lira'],
            ['TWD', 'New Taiwan Dollar'],
            ['XRP', 'Ripple'],
            ['ZAR', 'South African Rand'],
        ];

        return this._http.get<GetExchangeRatesInterface>(env.testURI).pipe(
            map((data) => {
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
