import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  resetMocks: true,
  testEnvironment: 'jsdom',  // Set to 'jsdom' for frontend tests if needed
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.ts$': 'ts-jest',
    "^.+\\.(js)$": "babel-jest",
    // "\\.[jt]sx?$": [
		// 	"babel-jest",
		// 	{
		// 		"babelrc": false,
		// 		"presets": ["@babel/preset-typescript"]
		// 	}
		// ]
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  coverageDirectory: '<rootDir>/coverage',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },
  rootDir: './'
};

export default config;