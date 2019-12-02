import { RxjsRemoteResponseComplete } from './RxjsRemoteResponseComplete';
import { RxjsRemoteResponseError } from './RxjsRemoteResponseError';
import { RxjsRemoteResponseNext } from './RxjsRemoteResponseNext';

export type RxjsRemoteResponse = RxjsRemoteResponseNext | RxjsRemoteResponseComplete | RxjsRemoteResponseError;
