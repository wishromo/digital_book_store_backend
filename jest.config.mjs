export default {
  testEnvironment: 'node',
  // This tells Jest to run our mock file before all tests
  
  // This is the key to fixing the SyntaxError
  // It ensures all our project files are processed by Babel
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest', { rootMode: 'upward' }],
  },
  // Ensure that no project files are accidentally ignored
  transformIgnorePatterns: [
    '/node_modules/(?!some-es-module-lib)/'
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testTimeout: 20000,
};