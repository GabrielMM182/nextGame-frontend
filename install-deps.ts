import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// Define types for dependencies
type Dependency = string;

const dependencies: Dependency[] = [
    "@tanstack/react-query^5.67.2",
    "axios^1.8.2",
    "react^19.0.0",
    "react-dom^19.0.0",
    "react-router-dom^7.3.0",
    "tailwindcss^3.4.17",
    "zustand^5.0.3"
];

const devDependencies: Dependency[] = [
    "@eslint/js^9.21.0",
    "@testing-library/jest-dom^6.6.3",
    "@testing-library/react^16.2.0",
    "@types/react^19.0.10",
    "@types/react-dom^19.0.4",
    "@vitejs/plugin-react^4.3.4",
    "autoprefixer^10.4.20",
    "eslint^9.21.0",
    "eslint-plugin-react-hooks^5.1.0",
    "eslint-plugin-react-refresh^0.4.19",
    "globals^15.15.0",
    "jsdom^26.0.0",
    "postcss^8.5.3",
    "typescript~5.7.2",
    "typescript-eslint^8.24.1",
    "vite^6.2.0",
    "vitest^3.0.8",
];

// Function to run shell commands
function runCommand(command: string): void {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to execute: ${command}`);
    process.exit(1);
  }
}

// Function to initialize a new Node.js project
function initProject(): void {
  const packageJsonPath: string = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.log('Initializing new Node.js project...');
    runCommand('npm init -y');
  }
}

// Function to install dependencies
function installDependencies(dev: boolean = false): void {
  const packages: Dependency[] = dev ? devDependencies : dependencies;
  console.log(`Installing ${dev ? 'dev' : ''} dependencies...`);
  runCommand(`npm install ${packages.join(' ')} ${dev ? '-D' : ''}`);
}

// Main function to orchestrate the setup
function main(): void {
  const args: string[] = process.argv.slice(2);
  const installDevOnly: boolean = args.includes('--dev');

  initProject();
  if (!installDevOnly) installDependencies();
  installDependencies(true);
}

// Execute the main function
main();