import { Component, AfterViewInit, OnDestroy, OnInit, Input } from '@angular/core';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';

@Component({
  selector: 'app-amchart-test',
  templateUrl: './amchart.component.html'
})
export class AmChartComponent implements OnInit, OnDestroy {
    @Input() id: string;
    @Input() series: {name: string, data: number}[];
    public options: any;
    private chart: AmChart;
    private timer: number;

    constructor(private AmCharts: AmChartsService) {}

    makeRandomDataProvider() {
      const dataProvider = [];

      // Generate random data
      for (let year = 1950; year <= 2005; ++year) {
        dataProvider.push({
          year: '' + year,
          value: Math.floor(Math.random() * 100) - 50
        });
      }

      return dataProvider;
    }

    makeOptions(dataProvider) {
      return {
        'type': 'serial',
        'theme': 'light',
        'marginTop': 0,
        'marginRight': 20,
        'dataProvider': dataProvider,
        'valueAxes': [{
          'axisAlpha': 0,
          'position': 'left'
        }],
        'graphs': [{
          'id': this.id,
          'balloonText': '[[category]]<br><b><span style=\'font-size:14px;\'>[[value]]</span></b>',
          'bullet': 'round',
          'bulletSize': 8,
          'lineColor': '#d1655d',
          'lineThickness': 2,
          'negativeLineColor': '#637bb6',
          'type': 'smoothedLine',
          'valueField': 'data'
        }],
        'chartScrollbar': {
          'graph': this.id,
          'gridAlpha': 0,
          'color': '#888888',
          'scrollbarHeight': 55,
          'backgroundAlpha': 0,
          'selectedBackgroundAlpha': 0.1,
          'selectedBackgroundColor': '#888888',
          'graphFillAlpha': 0,
          'autoGridCount': true,
          'selectedGraphFillAlpha': 0,
          'graphLineAlpha': 0.2,
          'graphLineColor': '#c2c2c2',
          'selectedGraphLineColor': '#888888',
          'selectedGraphLineAlpha': 1
        },
        'chartCursor': {
          'categoryBalloonDateFormat': 'YYYY',
          'cursorAlpha': 0,
          'valueLineEnabled': true,
          'valueLineBalloonEnabled': true,
          'valueLineAlpha': 0.5,
          'fullWidth': true
        },
        'dataDateFormat': 'YYYY',
        'categoryField': 'name',
        'categoryAxis': {
          'minPeriod': 'YYYY',
          'parseDates': true,
          'minorGridAlpha': 0.1,
          'minorGridEnabled': true
        },
        'export': {
          'enabled': true
        }
      };
    }

    ngOnInit() {
      this.options = this.makeOptions(this.series);
      this.chart = this.AmCharts.makeChart('chartdiv', this.makeOptions(this.series));
    }

    ngOnDestroy() {
      if (this.chart) {
        this.AmCharts.destroyChart(this.chart);
      }
    }
}
