import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import * as cls from './Chart.module.css';

export default class LineChart extends Component {
  render () {

    const {labels, chartData} = this.props;

    const data = canvas => {
      const ctx = canvas.getContext ('2d');
      if(ctx!=undefined){
        var gradient = ctx.createLinearGradient(0, 0, 0, 600);
        gradient.addColorStop(0, 'rgba(66, 214, 235, 0.8)');
        gradient.addColorStop(1, 'rgba(223, 244, 66, 0.8)');
      }

      return {
        labels: labels,
        datasets: [
          {
            label: 'Daily',            
            lineTension: 0.1,
            backgroundColor:gradient,
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            hoverBackgroundColor: 'rgba(66, 214, 235, 0.8)',
            hoverBorderWidth: 2,
						hoverBorderColor: 'rgba(223, 244, 66, 0.8)',
            pointHoverBorderColor: 'rgba(223, 244, 66, 1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,          
            data:chartData  
          },
        ],
      };
    };        

    return (
      <div className={cls['chart-box']}>
        <Bar data={data} />
        <h2>Daily</h2>
      </div>
    );
  }
}
