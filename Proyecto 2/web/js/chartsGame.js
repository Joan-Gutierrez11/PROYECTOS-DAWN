const dataForChartDeals = async () => {
    let data = await getData(dealsURL + '?pageNumber=0')    
    let dataChart = {};
    
    for (let deal of data) {
        let date = new Date(deal['lastChange']*1000);        
        let dateKey = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`        
        if(!(dateKey in dataChart)){
            dataChart[dateKey] = 1;
        }else{
            dataChart[dateKey] += 1;
        }        
    }
    return dataChart;    
}


const createChartOffersUpdate = async () => {
    let dataChart = await dataForChartDeals();
    let dates = Object.keys(dataChart); 
    let values = [];

    dates.sort((a, b) => {
        let parts1 = a.split('/');
        let date1 = new Date(parts1[2], parts1[1], parts1[0]);
        let parts2 = b.split('/');
        let date2 = new Date(parts2[2], parts2[1], parts2[0]);        
        return date1 - date2;
    });
    dates.forEach(elem => values.push(dataChart[elem]));

    let ctx = document.getElementById('offer-update-chart');

    new Chart(ctx, {
        type:"line",
        data:{
            labels: dates,
            datasets: [{
                label:"Offers",
                data:values,
                lineTension: 0.1,
                fill: true,
                pointBackgroundColor: "rgba(255, 255, 255, .8)",
                pointBorderColor: "transparent",
                borderColor: "rgba(255, 255, 255, .8)",
                borderColor: "rgba(255, 255, 255, .8)",
                borderWidth: 4,
                backgroundColor: "transparent",
                fill: true,
            },]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,            
            plugins: {
              legend: {
                display: false,                
              }
            },
            interaction: {
              intersect: false,
              mode: 'index',
            },
            scales: {
              y: {
                grid: {
                  drawBorder: false,
                  display: true,
                  drawOnChartArea: true,
                  drawTicks: false,
                  borderDash: [5, 5],
                  color: 'rgba(255, 255, 255, .2)'
                },
                ticks: {
                  display: true,
                  color: '#f8f9fa',
                  padding: 10,
                  font: {
                    size: 14,
                    weight: 300,
                    family: "Roboto",
                    style: 'normal',
                    lineHeight: 2
                  },
                }
              },
              x: {
                grid: {
                  drawBorder: false,
                  display: false,
                  drawOnChartArea: false,
                  drawTicks: false,
                  borderDash: [5, 5]
                },
                ticks: {
                  display: true,
                  color: '#f8f9fa',
                  padding: 10,
                  font: {
                    size: 14,
                    weight: 300,
                    family: "Roboto",
                    style: 'normal',
                    lineHeight: 2
                  },
                }
              },
            },
        }
    });

};

const createChartForOffers = async () => {
    let data = await getData(dealsURL + '?pageNumber=0');
    let dataForChart = { '0-20':0, '20-40':0, '40-60':0, '60-80':0, '80-100':0, 'free':0 };

    let discount;
    for (const game of data) {
        discount = parseFloat(game['savings']);
        if(discount < 20)
            dataForChart['0-20'] += 1;
        else if(discount > 20 && discount < 40)
            dataForChart['20-40'] += 1;
        else if(discount > 40 && discount < 60)
            dataForChart['40-60'] += 1;
        else if(discount > 40 && discount < 80)
            dataForChart['60-80'] += 1;
        else if(discount > 80 && discount < 100)
            dataForChart['80-100'] += 1;
        else
            dataForChart['free'] += 1;
    }

    let ctx = document.getElementById('discounts-charts');

    let keys = Object.keys(dataForChart);
    let values = [];

    keys.forEach(element => values.push(dataForChart[element]));

    new Chart(ctx, {
        type: 'pie',
        data:{
            labels: keys,
            datasets: [{
                label: 'Discounts',
                data: values,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                ],            
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'right',
              }
            },
            interaction: {
              intersect: false,
              mode: 'index',
            },            
        }
    });

}

document.addEventListener('DOMContentLoaded', () => {
    createChartOffersUpdate();
    createChartForOffers();
})