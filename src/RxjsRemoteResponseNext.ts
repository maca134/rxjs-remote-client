import { RxjsRemoteResponseBase } from './RxjsRemoteResponseBase';

export interface RxjsRemoteResponseNext extends RxjsRemoteResponseBase {
	type: 'next';
	value: any;
}
