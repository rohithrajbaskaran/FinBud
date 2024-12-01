export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest', { rootMode: 'upward' }]
  },
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  extensionsToTreatAsEsm: ['.jsx']
}; 