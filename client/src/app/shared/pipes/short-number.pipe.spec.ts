/* eslint-disable @typescript-eslint/no-unused-vars */

import { ShortNumberPipe } from './short-number.pipe';
// TODO: a test should be done for this pipe
describe('Pipe: ShortNumbere', () => {
  it('create an instance', () => {
    const pipe = new ShortNumberPipe();
    expect(pipe).toBeTruthy();
    //TODO: add K and M test
  });
});
