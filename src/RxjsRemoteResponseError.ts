import { RxjsRemoteResponseBase } from './RxjsRemoteResponseBase';

export interface RxjsRemoteResponseError extends RxjsRemoteResponseBase {
	type: 'error';
	error: any;
}
