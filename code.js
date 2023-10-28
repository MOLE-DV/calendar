let months = {
    'Styczeń': 31,
    'Luty': 28,
    'Marzec': 31,
    'Kwiecień': 30,
    'Maj': 31,
    'Czerwiec': 30,
    'Lipiec': 31,
    'Sierpień': 31,
    'Wrzesień': 30,
    'Październik': 31,
    'Listopad': 30,
    'Grudzień': 31,
}

let month_storage = [];

let dat = new Date;
let dark = false;
let dark_clr = '#F6F6F6';

document.addEventListener('DOMContentLoaded', ()=>{
    console.log('Loading calendar...');
    console.log(dat.getMonth())
    instance_calendar();
    console.log('Calendar Loaded!')
    document.getElementById('loading').remove();
    // element = ('#c' + dat.getFullYear() + '_' + parseInt(dat.getMonth() - 1)).toString()
    // document.querySelectorAll(element)[0].scrollIntoView();
    // at_mn_index = dat.getMonth() + 1;
    // console.log(Object.keys(months)[at_mn_index] + ' ' + (c_yr + readable_yr_index));
    // document.getElementById('panel').innerHTML = Object.keys(months)[readable_mn_index] + ' ' + (c_yr + readable_yr_index);
});


setInterval(update, 1000)

function update(){
    dat = new Date();
    let time = [dat.getHours(), dat.getMinutes(), dat.getSeconds()];
    for(i = 0; i < time.length; i++){
        switch(time[i]<10){
            case true:
                time[i] = ('0' + time[i].toString());
                break;
        }
    }
    document.getElementById('hour').innerHTML = time[0] + ':' + time[1] + ':' + time[2];
}


let start = 6
let year = dat.getFullYear();
let day = 0;
let yr_index = 0;
let m_index = 0;
let row_height = 0;

function instance_calendar(){

    for(y = 0; y<8; y++){
        for(m = 0; m < 12; m++){
            for(d = 0; d < months[Object.keys(months)[m]]; d++){
                let dy_box;
                switch(start > 0){
                    case true:
                        for(e = 0; e < start; e++){
                            dy_box = create_box(document.getElementById('boxes'), '', 'none', 'none');
                        }
                        start = 0;
                        break;
                }

                dy_box = create_box(document.getElementById('boxes'), d + 1, year + y, m);
                if(day % 7 == 0){
                    dy_box.setAttribute('id','box_n');
                }

                switch(year + y == dat.getFullYear() && m == dat.getMonth() && d == dat.getDate()-1){
                    case true:
                        dy_box.setAttribute('id', 'box_t');
                        break;
                }

                row_height = dy_box.clientHeight;
                day++;
            }

            if(month_storage[m_index-1]){
                month_storage[m_index] = month_storage[m_index-1] + (months[Object.keys(months)[m]] / 7) * row_height;
            }else{
                month_storage[m_index] = (months[Object.keys(months)[m]] / 7) * row_height;
            }

            m_index++;
        }

        yr_index++;
    }
}

function create_month_storage(parent, yr, month){
    let ds = document.createElement('div');
    ds.setAttribute('id', 'month_storage');
    ds.setAttribute('year', yr);
    ds.setAttribute('month', month);
    ds.setAttribute('length', 0);
    parent.appendChild(ds);
    return ds;
}



function create_box(parent, content, yr, mn){
    let box = document.createElement('div');
    box.setAttribute('id', 'box');
    box.setAttribute('class', ('c' + yr +'_'+ mn).toString())
    box.innerHTML = content;
    parent.appendChild(box);
    return box;
}


let c_yr = dat.getFullYear();

let at_mn_index = 0;
let at_yr_index = 0;

let readable_mn_index = 0;
let readable_yr_index = c_yr;

function scrl(){
    let boxes = document.getElementById('boxes');
    let panel = document.getElementById('panel');
    let scroll = boxes.scrollTop;
    let minus = parseInt(window.innerHeight/5);
    let last_year = readable_yr_index;
    let last_month = 0;

    if(scroll > parseInt(month_storage[at_mn_index] - minus)){
        at_mn_index++;
        readable_mn_index++;
        last_month = readable_mn_index-1;


        if(readable_mn_index > 11) {
            readable_mn_index = 0;
            at_yr_index++;
            readable_yr_index++;
            last_year = readable_yr_index-1;
            last_month = 11;
        };


        document.querySelectorAll('.c' +  last_year + '_' + last_month).forEach(element => {
            switch(element.getAttribute('id')){
                case 'box_n': break;
                case 'box_t': break;
                default: element.style = ''; 
            }
        });
        document.querySelectorAll('.c' + readable_yr_index + '_' + readable_mn_index).forEach(element => {
            switch(element.getAttribute('id')){
                case 'box_n': break;
                case 'box_t': break;
                default: element.style.backgroundColor = 'white'; element.style.color = 'black';
            }
        });

    }
    else if(month_storage[at_mn_index-1] && scroll < parseInt(month_storage[at_mn_index-1] - minus)){
        at_mn_index--;
        readable_mn_index--;
        last_month = readable_mn_index+1;

        if(readable_mn_index < 0) {
            readable_mn_index = 11;
            at_yr_index--;
            readable_yr_index--;
            last_year = readable_yr_index+1;
            last_month = 0;
        };


        document.querySelectorAll('.c' + last_year + '_' + last_month).forEach(element => {
            switch(element.getAttribute('id')){
                case 'box_n': break;
                case 'box_t': break;
                default: element.style = ''; 
            }
        });
        document.querySelectorAll('.c' + readable_yr_index + '_' + readable_mn_index).forEach(element => {
            switch(element.getAttribute('id')){
                case 'box_n': break;
                case 'box_t': break;
                default: element.style.backgroundColor = 'white'; element.style.color = 'black';
            }
        });



    }
    panel.innerHTML = Object.keys(months)[readable_mn_index] + ' ' + (readable_yr_index);
}


