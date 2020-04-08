
Object.defineProperty(window, 'mgnlRefresh', {
    writable: true,
    value: jest.fn().mockImplementation(() => true)
});
Object.defineProperty(window, 'location', {
    writable: true,
    value: { href: '/?mgnlPreview=true' }
});
