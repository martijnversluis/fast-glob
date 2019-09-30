import stdev = require('compute-stdev');

import { SuiteMeasures } from './runner';

export function convertHrtimeToMilliseconds(hrtime: [number, number]): number {
	const nanoseconds = (hrtime[0] * 1e9) + hrtime[1];

	return nanoseconds / 1e6;
}

export function convertBytesToMegaBytes(bytes: number): number {
	return bytes / 1e6;
}

export function timeStart(): [number, number] {
	return process.hrtime();
}

export function timeEnd(start: [number, number]): number {
	const hrtime = process.hrtime(start);

	return convertHrtimeToMilliseconds(hrtime);
}

export function getMemory(): number {
	return process.memoryUsage().heapUsed / 1024 / 1024;
}

export function getMeasures(matches: number, time: number, memory: number): string {
	return JSON.stringify({ matches, time, memory } as SuiteMeasures);
}

export function getAverageValue(values: number[]): number {
	return values.reduce((a, b) => a + b, 0) / values.length;
}

export function getStdev(values: number[]): number {
	return stdev(values);
}

export function getEnvAsInteger(name: string): number | undefined {
	const env = process.env[name];

	return env ? parseInt(env, 10) : undefined;
}

export function getEnvAsObject(name: string): object | undefined {
	const env = process.env[name];

	return env ? JSON.parse(env) as object : undefined;
}
