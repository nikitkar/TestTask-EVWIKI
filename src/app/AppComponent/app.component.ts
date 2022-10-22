import { Component, OnInit } from '@angular/core';

import { GetTradingAmountServices } from '../GetTradingAmountViewModel/GetTradingAmountServices';

import { GetExchangeRatesInterface } from '../GetTradingAmountViewModel/GetTradingAmountRates';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [GetTradingAmountServices],
})
export class AppComponent implements OnInit {
    getExchangeRatesList: GetExchangeRatesInterface[] = [];

    onChangeValue(e: number, index: number) {
        this.getExchangeRatesList.map((item, index1) => {
            //можно реализовть было ввод только цифр, без вожможности ввода букв
            if (!e.toString().match(/[^0-9]/g) && e.toString()) {
                if (item.value?.toString() == 'Nan') return;

                e = Number.parseFloat(
                    Number.parseFloat(
                        e.toString().replace(/[^0-9]/g, '')
                    ).toFixed(5)
                );

                if (index == index1)
                    item.value = Number.parseFloat(e.toFixed(5));
                else
                    item.value = Number.parseFloat(
                        (e * item.amount).toFixed(5)
                    );
            } else item.value = 0;
        });
    }

    constructor(private _httpService: GetTradingAmountServices) {}

    ngOnInit() {
        this._httpService.getCurrencyExchanges().subscribe({
            next: (data: GetExchangeRatesInterface[]) =>
                (this.getExchangeRatesList = data),
        });
    }
}
