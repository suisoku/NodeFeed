import { Pipe, PipeTransform } from '@angular/core';

/**
 * Allows to transform large numbers with several 0s to abbreviated notations i.e 10k, 10M, 10B
 */
@Pipe({
  name: 'shortNumber'
})
export class ShortNumberPipe implements PipeTransform {
  transform(number: number): null | string {
    if (isNaN(number) || number === null || number === 0) {
      return null;
    } // will only work value is a number
    let abs = Math.abs(number);
    const rounder = Math.pow(10, 1);
    const isNegative = number < 0; // will also work for Negetive numbers
    let key = '';

    const powers = [
      { key: 'Q', value: Math.pow(10, 15) },
      { key: 'T', value: Math.pow(10, 12) },
      { key: 'B', value: Math.pow(10, 9) },
      { key: 'M', value: Math.pow(10, 6) },
      { key: 'K', value: 1000 }
    ];

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < powers.length; i++) {
      let reduced = abs / powers[i].value;
      reduced = Math.round(reduced * rounder) / rounder;
      if (reduced >= 1) {
        abs = reduced;
        key = powers[i].key;
        break;
      }
    }
    return (isNegative ? '-' : '') + String(abs) + key;
  }
}
