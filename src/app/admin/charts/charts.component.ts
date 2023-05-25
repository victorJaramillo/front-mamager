import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { environment as env } from 'src/environment/environment';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit{

  headers = {apikey: env.API_KEY}
  chartOptionsValues:any = {}
  constructor(
    private util: UtilService,
  )
  {}

  ngOnInit(): void {
    console.log('this.chartOptionsValues => ',this.getDollarValues());
    
    
  }

  chartOptions = {
    animationEnabled: true,
    theme: "dark2",
    exportEnabled: true,
    title: {
      text: "Developer Work Week"
    },
    subtitles: [{
      text: "Median hours/week"
    }],
    data: [{
      type: "pie", //change type to column, line, area, doughnut, etc
      indexLabel: "{name}: {y}%",
      dataPoints: [
        { name: "Overhead", y: 9.1 },
        { name: "Problem Solving", y: 3.7 },
        { name: "Debugging", y: 36.4 },
        { name: "Writing Code", y: 30.7 },
        { name: "Firefighting", y: 20.1 }
      ]
    }]
  }

  getDollarValues() {
    var response = {}
    this.util.httpGetRequest('https://nodeapi.vjdev.xyz/api/v2/currconv/available/dollar/chart', this.headers).subscribe((res:any) => {
      var dataPointsArr = []
      for (const key of res) {
        dataPointsArr.push({x: new Date(key.fecha), y: key.valor})
      }
      const uf_chart = {
        type: "line",
        showInLegend: true,
        name: "UF",
        xValueFormatString: "MMM DD, YYYY",
        dataPoints: dataPointsArr
      }
      
      const dollar_chart = {
        type: "column",
        showInLegend: true,
        name: "Dollar",
        xValueFormatString: "MMM DD, YYYY",
        dataPoints: dataPointsArr
      }


      const dollarData:any = {
        animationEnabled: true,
        theme: "dark2",
        title: {
          text: "Dollar and UF values"
        },
        axisX: {
          valueFormatString: "D MMM"
        },
        axisY: {
          title: "Prices"
        },
        toolTip: {
          shared: true
        },
        legend: {},
        data: []
      }

      dollarData.data.push(dollar_chart)
      // dollarData.data.push(uf_chart)
      this.chartOptionsValues = dollarData
    }, (err) => {

    })
  }
}
