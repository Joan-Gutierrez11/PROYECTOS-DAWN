document.addEventListener('DOMContentLoaded', async ()=>{
    let dataDeals = await getData("https://www.cheapshark.com/api/1.0/deals");
    getDeals(dataDeals);
});