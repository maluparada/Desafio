import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { Component } from "react";

const options = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Nível de Saúde'
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
        text: 'Total de Ativos'
    }
    },
    legend: {
    enabled: false
    },

    plotOptions: {
    series: {
        borderWidth: 0,
        dataLabels: {
            enabled: true,
            format: '{point.y:.1f}%'
        }
    }},

    series: [
        {
            name: 'Nível de Saúde',
            colorByPoint: true,
            data: [

                {
                name: 'Estável',
                y: 2,
                },

                {
                name: 'Em Alerta',
                y: 6,
                },

                {
                name: 'Críticos',
                y: 14,
                }

            ]
        }      
    ]
};

export default class NiveldeSaude extends Component {
    render () {
        return (
            <div className="NiveldeSaude">
                <HighchartsReact highcharts={Highcharts} options={options}/>
            </div>
        );
        
    }
}

