document.getElementById('showFilter').addEventListener('click', () => {
    let element = document.getElementById('options-filters');
    if(element.classList.contains('fade-out-top')){                             
        element.classList.toggle('fade-out-top');        
        element.classList.add('fade-in-top');
    }
    else {        
        element.classList.toggle('fade-in-top');        
        element.classList.add('fade-out-top');
    }
});