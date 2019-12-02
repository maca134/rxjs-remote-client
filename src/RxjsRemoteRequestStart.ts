import { RequestType } from './RequestType';

export interface RxjsRemoteRequestStart {
	type: RequestType.start;
	id: string;
	name: string;
	args: any[];
}
