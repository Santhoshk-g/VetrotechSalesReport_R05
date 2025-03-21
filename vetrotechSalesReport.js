import { LightningElement, track } from 'lwc';
import fetchr05 from '@salesforce/apex/VetrotechSales_R05.getr05';

export default class VetrotechSales_Report_R05 extends LightningElement {
@track vdata =[];
@track error;
@track errormsg;
@track tablerend = false;
@track tablerendfalse = false;
@track Title = 'Vetrotech Sales R05';
@track monthOptions;
@track selectedMonth;
@track selectedMonth1;
@track selectedMonth2;
@track selectedMonth4;
@track selectedlabel;
@track selectedlabel1;
@track selectedlabel2;
@track selectedlabel3;
curyear = new Date().getFullYear();
year = new Date().getFullYear()-1;


connectedCallback(){
    this.frommonth = 'From Month of Previous Year';
    this.tomonth = 'To Month of Previous Year';
    this.yfrommonth = 'From Month of Current Year';
    this.ytomonth = 'To Month of Current Year';

    this.monthOptions = [
     
        {label : 'JAN', value : '01'},
        {label : 'FEB', value : '02'},
        {label : 'MAR', value : '03'},
        {label : 'APR', value : '04'},
        {label : 'MAY', value : '05'},
        {label : 'JUN', value : '06'},
        {label : 'JUL', value : '07'},
        {label : 'AUG', value : '08'},
        {label : 'SEP', value : '09'},
        {label : 'OCT', value : '10'},
        {label : 'NOV', value : '11'},
        {label : 'DEC', value : '12'}

    ];
}

handleMonthChange(event1){
    this.selectedMonth = event1.detail.value;
    this.selectedlabel = this.monthOptions.find(option => option.value === this.selectedMonth).label;
}
handleMonthChange1(event2){
    this.selectedMonth1 = event2.detail.value;
    this.selectedlabel1 = this.monthOptions.find(option => option.value === this.selectedMonth1).label;
}
handleMonthChange2(event3){
    this.selectedMonth2 = event3.detail.value;
    this.selectedlabel2 = this.monthOptions.find(option => option.value === this.selectedMonth2).label;
}
handleMonthChange3(event4){
    this.selectedMonth3 = event4.detail.value;
    this.selectedlabel3 = this.monthOptions.find(option => option.value === this.selectedMonth3).label;
}

handleSubmit(event){

    if(this.selectedMonth != undefined && this.selectedMonth1 != undefined && this.selectedMonth2 != undefined && this.selectedMonth3 != undefined){

    fetchr05({frm : this.selectedMonth, to : this.selectedMonth1, yfrm : this.selectedMonth2, yto : this.selectedMonth3})

    .then (result =>{
        this.tablerend= true;
        this.tablerendfalse = false;
        this.vdata= result;
        this.error=undefined;
    })
    .catch(error=>{
        if(error && error.body && error.body.message){
        this.error=error;
        this.vdata=undefined;
        }
        else{
            this.errorMessage = 'An Unknown error occured';
        }
    })
    }
    else{
        this.tablerendfalse = true;
        this.errormsg ='Please Make Month Selection';
    }
}
}