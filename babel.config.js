module.exports = api => {
  const isCommonJs = process.env.COMMONJS === 'true';
  const isTest = api.env('test');

  return {
    ignore: isTest
      ? []
      : ['**/*.test.js', '**/*.test.jsx', '**/*.test.ts', '**/*.test.tsx'],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        { useESModules: !isCommonJs, version: '^7.13.17' }
      ]
    ],
    presets: [
      [
        '@babel/preset-env',
        {
          modules: isCommonJs || isTest ? 'commonjs' : false,
          targets: isTest ? { node: 'current' } : '> 0.25%, not dead',
          shippedProposals: true
        }
      ],
      ['@babel/preset-react', { runtime: 'automatic' }],
      '@babel/preset-typescript'
    ]
  };
};
