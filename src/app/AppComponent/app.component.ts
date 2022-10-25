import { Component, OnInit } from '@angular/core';

import { GetTradingAmountServices } from '../GetTradingAmountViewModel/GetTradingAmountServices';
import { GetExchangeRatesInterface, CurrencyCode } from '../GetTradingAmountViewModel/GetTradingAmountRates';

import { GetCoverterDistanceServices } from '../GetCoverterDistance/GetCoverterDistanceService';
import { GetCoverterDistanceInterface,MathOperationDistance } from '../GetCoverterDistance/GetCoverterDistanceInterface';

import { environment as env } from 'src/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [GetTradingAmountServices, GetCoverterDistanceServices],
})
export class AppComponent implements OnInit {
    getExchangeRatesList: GetExchangeRatesInterface[] = [];
    nameExchangeRates: string = 'USD';
    selectCurrencyCode: any;
    valueCurrencyCode: any;

    getDistanceList: GetCoverterDistanceInterface[] = [];
    bufArrayDistance: {} = {};
    butArrayDistanceMathOperation: MathOperationDistance[] = [];

    readonly listDistanceName = [
        'Meters',
        'Feet',
        'Inches',
        'Cm',
        'Yards',
        'Kilometers',
        'Miles',
    ];

    readonly CurrencyCods = CurrencyCode;

    onChangeSelect(e: Event){
        this._httpTradingAmountService.getCurrencyExchanges(this.selectCurrencyCode).subscribe({next: (data: GetExchangeRatesInterface[]) => (this.getExchangeRatesList = data)});
    }

    onChangeExchangeRatesValue(e: number) {
        this.getExchangeRatesList.map((item) => {
            //можно реализовть было ввод только цифр, без вожможности ввода букв
            if (!e.toString().match(/[^0-9\.]/g) && e.toString()) {
                if (item.value?.toString() == 'Nan') return;

                e = Number.parseFloat(Number.parseFloat(e.toString().replace(/[^0-9\.]/g, '')).toFixed(5));

                item.value = Number.parseFloat((this.valueCurrencyCode * item.amount).toFixed(5));
            } else item.value = 0;
        });
    }

    onChangeDistanceValue(e: number, index: number) {
        for (let i = 0; i < this.listDistanceName.length; i++) {
            if (this.listDistanceName[i] == this.getDistanceList[index].code) this.bufArrayDistance = this.getDistanceList[i].nameDistance.ConvertTo;
        }

        this.getDistanceList.map((item, indexDistanceItem) => {
            if (!e.toString().match(/[^0-9\.]/g) && e.toString()) {
                if (item.nameDistance.value?.toString() == 'Nan') return;

                e = Number.parseFloat(Number.parseFloat(e.toString().replace(/[^0-9\.]/g, '')).toFixed(5));

                const keysArray = Object.keys(this.bufArrayDistance);
                this.butArrayDistanceMathOperation = Object.values(this.bufArrayDistance);

                if (index == indexDistanceItem) { item.nameDistance.value = Number.parseFloat(e.toFixed(5));
                } else {
                    for (let i = 0; i < keysArray.length; i++) {
                        if (keysArray[i] == item.code) {
                            switch (this.butArrayDistanceMathOperation[i].operator) {
                                case '/':
                                    item.nameDistance.value = Number.parseFloat((e /this.butArrayDistanceMathOperation[i].value).toFixed(5));
                                break;

                                case '*':
                                    item.nameDistance.value = Number.parseFloat((e *this.butArrayDistanceMathOperation[i].value).toFixed(5));
                                break;
                            }
                        }
                    }
                }
            }
        });
    }

    constructor(private _httpTradingAmountService: GetTradingAmountServices, private _httpCoverterDistanceService: GetCoverterDistanceServices
    ) {}

    ngOnInit() {
        this._httpTradingAmountService.getCurrencyExchanges("USD").subscribe({next: (data: GetExchangeRatesInterface[]) => (this.getExchangeRatesList = data)});

        this._httpCoverterDistanceService.getDistanceData().subscribe({next: (data: GetCoverterDistanceInterface[]) => (this.getDistanceList = data)});
    }
}
