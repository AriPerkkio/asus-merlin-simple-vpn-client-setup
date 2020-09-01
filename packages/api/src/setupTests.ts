import ipleakMock from '__mocks__/ipleak';
import routerMock from '__mocks__/router';

beforeAll(() => {
    ipleakMock.listen();
    routerMock.listen();
});

afterEach(() => ipleakMock.resetHandlers());

afterAll(() => {
    ipleakMock.close();
    routerMock.close();
});
