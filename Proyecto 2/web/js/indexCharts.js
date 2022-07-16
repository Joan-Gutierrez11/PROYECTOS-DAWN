function dataDealsManager(data) {
    let dateDealsDict = {};

    let date, dateKey;
    Array.from(data).forEach((elem) => {
        date = new Date(elem['lastChange']*1000);
        dateKey = date.toISOString().slice(0,10);
        !(dateKey in dateDealsDict) ? dateDealsDict[dateKey] = 1 : dateDealsDict[dateKey] += 1;        
    });
    return dateDealsDict;
}

function dataDiscountManager(data) {
  let dataForChart = { '0-20 %':0, '20-40 %':0, '40-60 %':0, '60-80 %':0, '80-100 %':0, '100 %':0 };
  
  Array.from(data).forEach(elem => {
    let discount = parseFloat(elem['savings']);
    if(discount < 20)
        dataForChart['0-20'] += 1;
    else if(discount > 20 && discount < 40)
        dataForChart['20-40 %'] += 1;
    else if(discount > 40 && discount < 60)
        dataForChart['40-60 %'] += 1;
    else if(discount > 40 && discount < 80)
        dataForChart['60-80 %'] += 1;
    else if(discount > 80 && discount < 100)
        dataForChart['80-100 %'] += 1;
    else
        dataForChart['100 %'] += 1;
  });

  return dataForChart;
}

const createChartOfDeals = (data) => {
  let dealsDict = dataDealsManager(data);
  let keys = Object.keys(dealsDict).sort((dat1, dat2) => (new Date(dat1)) - (new Date(dat2)));
  let values = keys.map((elem) => dealsDict[elem]);

  let ctx = document.getElementById('offer-update-chart');
  new Chart(ctx, {
    type:"line",
    data:{
        labels: keys,
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

  document.querySelector('#offer-data-days').innerHTML = `<h6 class="mb-0 ">Juegos puestos en ofertas</h6>
                                                          <p class="text-sm ">Diariamente</p>
                                                          <hr class="dark horizontal">
                                                          <div class="d-flex">
                                                              <i class="material-icons text-sm my-auto me-1">schedule</i>
                                                              <p class="mb-0 text-sm">Datos obtenidos de los ultimos ${keys.length} dias</p>
                                                          </div>`;
};

const createChartOfDiscounts = (data, loaderFunction) => {
  let discountsDict = dataDiscountManager(data);
  let keys = Object.keys(discountsDict);
  let values = keys.map((elem) => discountsDict[elem]);

  let ctx = document.getElementById('discounts-charts');
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
        animation:{
          duration: 2000,
          onProgress: function(animation){
            loaderFunction(animation, discountsDict);
          }
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },            
    }
  });
};