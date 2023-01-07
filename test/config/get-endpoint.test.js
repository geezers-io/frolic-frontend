import { MODE_NAME_LIST } from 'api/constant';
import { getServerUrlByMode } from 'api/helper';

describe('환경에 따른 API ENDPOINT 변경 테스트', () => {
  it('개발 환경이 development 일 때, http://localhost:8080/api url domain 을 얻는다.', () =>
    expect(getServerUrlByMode(MODE_NAME_LIST.DEVELOPMENT)).toBe('http://localhost:8080/api'));

  it('개발 환경이 test 일 때, http://3.35.123.154:8080/api url domain 을 얻는다.', () =>
    expect(getServerUrlByMode('test')).toBe('http://3.35.123.154:8080/api'));
});
