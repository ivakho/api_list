import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], 
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',                   
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy', 
    '\\.(jpg|jpeg|png|gif|webp|svg)$': 'jest-transform-stub' 
  },
};

export default config;
