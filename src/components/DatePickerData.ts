export default class DatePickerData {
    public id: number;
    public value: number;
    public ticks: number;
    public isToday: boolean;
    public isSelected: boolean;
    public isInSelectedMonth: boolean;
    public isWithinRange: boolean;

    constructor(id: number, date: Date, isToday: boolean, isSelected: boolean, isInSelectedMonth: boolean, isWithinRange: boolean) {
        this.id = id;
        this.value = date.getDate();
        this.ticks = +date;
        this.isToday = isToday;
        this.isSelected = isSelected;
        this.isInSelectedMonth = isInSelectedMonth;
        this.isWithinRange = isWithinRange;
    }
}
