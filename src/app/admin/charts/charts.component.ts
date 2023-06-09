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
  chartDollar30Days:any = {}
  chartUfValues:any = {}
  constructor(
    private util: UtilService,
  )
  {}

  ngOnInit(): void {
    this.getDollarValues()
    this.getUfValues()
    this.getDollarLastMonthValues()
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
    this.util.httpGetRequest(env.CHARTS_ENDPOINT, this.headers).subscribe((res:any) => {
      var dataPointsArr = []
      for (const key of res) {
        dataPointsArr.push({x: new Date(key.fecha), y: key.valor})
      }

      const dollar_chart = {
        type: "column",
        showInLegend: true,
        name: "Dollar",
        dataPoints: dataPointsArr
      }
      
      const dollarData:any = {
        animationEnabled: true,
        theme: "dark2",
        title: {
          text: "Dollar value last 7 days"
        },
        axisX: {
          valueFormatString: "D MMM"
        },
        axisY: {
          title: "Values"
        },
        toolTip: {
          shared: false
        },
        legend: {},
        data: []
      }

      dollarData.data.push(dollar_chart)
      this.chartOptionsValues = dollarData
    }, (err) => {

    })
  }
  getDollarLastMonthValues() {
    this.util.httpGetRequest(`${env.CHARTS_ENDPOINT}/last/month`, this.headers).subscribe((res:any) => {
      var dataPointsArr = []
      for (const key of res) {
        dataPointsArr.push({x: new Date(key.fecha), y: key.valor})
      }

      const dollar_chart = {
        type: "area",
        showInLegend: true,
        name: "Dollar",
        dataPoints: dataPointsArr
      }
      
      const dollarData:any = {
        animationEnabled: true,
        theme: "dark2",
        title: {
          text: "Dollar value last 30 days"
        },
        axisX: {
          valueFormatString: "D MMM"
        },
        axisY: {
          title: "Values"
        },
        toolTip: {
          shared: false
        },
        legend: {},
        data: []
      }

      dollarData.data.push(dollar_chart)
      this.chartDollar30Days = dollarData
    }, (err) => {

    })
  }
  getUfValues() {
    this.util.httpGetRequest(env.CHARTS_UF_ENDPOINT, this.headers).subscribe((res:any) => {
      var dataPointsArr = []
      for (const key of res) {
        dataPointsArr.push({x: new Date(key.fecha), y: key.valor})
      }
      
      const uf_chart = {
        type: "column",
        showInLegend: true,
        name: "UF",
        dataPoints: dataPointsArr
      }


      const ufData:any = {
        animationEnabled: true,
        theme: "dark2",
        title: {
          text: "UF value last 7 days"
        },
        axisX: {
          valueFormatString: "D MMM"
        },
        axisY: {
          title: "Values"
        },
        toolTip: {
          shared: false
        },
        legend: {},
        data: []
      }

      ufData.data.push(uf_chart)
      this.chartUfValues = ufData
    }, (err) => {

    })
  }
}
