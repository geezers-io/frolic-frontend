import { MODE_NAME_DICT } from 'api/constant';
import { getServerUrlByMode } from 'api/helper';

describe('환경에 따른 API ENDPOINT 변경 테스트', () => {
  it('개발 환경이 development 일 때, http://localhost:8080/api url domain 을 얻는다.', () =>
    expect(getServerUrlByMode(MODE_NAME_DICT.DEVELOPMENT)).toBe('http://localhost:8080/api'));

  it('개발 환경이 test 일 때, https://galaxyhi4276.co/api url domain 을 얻는다.', () =>
    expect(getServerUrlByMode('test')).toBe('https://galaxyhi4276.co/api'));
});
