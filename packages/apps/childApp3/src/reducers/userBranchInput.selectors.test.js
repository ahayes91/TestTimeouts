import {
  getUserBranchInput,
  getIsBranchesInputUpdating,
  getBranchesErrored,
  getUserBranchInputText,
} from './userBranchInput.selectors';

describe('user branch input selector', () => {
  it('getUserBranchInput returns branch input state', () => {
    const mockBranchState = 'mockBranchState';
    const mockState = {
      userBranchInput: mockBranchState,
    };
    const result = getUserBranchInput(mockState);
    expect(result).toEqual(mockBranchState);
  });

  it('getIsBranchesInputUpdating returns false when state not updating', () => {
    const mockBranchState = {
      updating: false,
    };
    const result = getIsBranchesInputUpdating.resultFunc(mockBranchState);
    expect(result).toEqual(false);
  });

  it('getIsBranchesInputUpdating returns false when state is not defined', () => {
    const mockBranchState = undefined;
    const result = getIsBranchesInputUpdating.resultFunc(mockBranchState);
    expect(result).toEqual(false);
  });

  it('getIsBranchesInputUpdating returns true when state is updating', () => {
    const mockBranchState = {
      updating: true,
    };
    const result = getIsBranchesInputUpdating.resultFunc(mockBranchState);
    expect(result).toEqual(true);
  });

  it('getBranchesErrored returns false when state not errored', () => {
    const mockBranchState = {
      error: false,
    };
    const result = getBranchesErrored.resultFunc(mockBranchState);
    expect(result).toEqual(false);
  });

  it('getBranchesErrored returns false when state is not defined', () => {
    const mockBranchState = undefined;
    const result = getBranchesErrored.resultFunc(mockBranchState);
    expect(result).toEqual(false);
  });

  it('getBranchesErrored returns true when state is errored', () => {
    const mockBranchState = {
      error: true,
    };
    const result = getBranchesErrored.resultFunc(mockBranchState);
    expect(result).toEqual(true);
  });

  it('getUserBranchInputText returns branch text when it exists', () => {
    const mockBranchState = {
      branch: 'What is love?',
    };
    const result = getUserBranchInputText.resultFunc(mockBranchState);
    expect(result).toEqual('What is love?');
  });

  it('getUserBranchInputText returns empty string state is not defined', () => {
    const mockBranchState = undefined;
    const result = getUserBranchInputText.resultFunc(mockBranchState);
    expect(result).toEqual('');
  });
});
