import { RequestType } from './RequestType';

export interface RxjsRemoteRequestComplete {
	type: RequestType.complete;
	id: string;
}
