import keyMirror from './index';

describe('keyMirror', () => {
  it('returns an empty object when passed empty object', () => {
    const keyMirrored = keyMirror({});
    expect(keyMirrored).toEqual({});
  });

  it('returns a frozen object', () => {
    const keyMirrored = keyMirror({});
    expect(Object.isFrozen(keyMirrored)).toEqual(true);
  });

  it('return object where values equal keys of passed in object', () => {
    const mockObject = {
      TEST: 'scascs',
      BLAH: null,
      'this-is-kebab': undefined,
    };
    const expectedObject = {
      TEST: 'TEST',
      BLAH: 'BLAH',
      'this-is-kebab': 'this-is-kebab',
    };
    expect(expectedObject).toEqual(keyMirror(mockObject));
  });
});
