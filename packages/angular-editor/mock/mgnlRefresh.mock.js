const frame = document.createElement('iframe');
frame.className = 'gwt-Frame';
Object.defineProperty(window, 'frameElement', {
    writable: true,
    value: frame
});
Object.defineProperty(window, 'mgnlRefresh', {
    writable: true,
    value: jest.fn().mockImplementation(() => true)
});
Object.defineProperty(window, 'location', {
    writable: true,
    value: { hash: ':edit' }
});
