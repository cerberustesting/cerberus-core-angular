import { UniquePropertyPipe } from './unique-property.pipe';

describe('UniquePropertyPipe', () => {
  it('create an instance', () => {
    const pipe = new UniquePropertyPipe();
    expect(pipe).toBeTruthy();
  });
});
