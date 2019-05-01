export default class DatePickerData{
    id:number;
    date:number;
    isToday: boolean;
    isSelected: boolean;
    isInSelectedMonth: boolean;

    constructor(id:number, date:number, isToday:boolean, isSelected:boolean, isInSelectedMonth:boolean){
        this.id = id;
        this.date = date;
        this.isToday = isToday;
        this.isSelected = isSelected;
        this.isInSelectedMonth = isInSelectedMonth;
    }
}