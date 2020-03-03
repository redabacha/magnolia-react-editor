
Object.defineProperty(window, 'mgnlRefresh', {
    writable: true,
    value: jest.fn().mockImplementation(() => true)
});
