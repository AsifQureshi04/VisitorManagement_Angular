import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: string): string {
    var formattedTime = ''
    if(!value) return formattedTime;

    const date = new Date(`1970-01-01T${value}`);
    if(isNaN(date.getTime())) return value;

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    formattedTime = `${this.pad(formattedHours)}:${this.pad(minutes)}:${this.pad(seconds)} ${ampm}`;

    return formattedTime;
  }

  private pad(num : number) : string{
    return num < 10 ? `0${num}` : `${num}`;
  }
}

