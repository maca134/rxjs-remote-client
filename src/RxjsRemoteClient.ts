import { Observable, Subscriber } from 'rxjs';
import { RequestType } from './RequestType';
import { RxjsRemoteResponse } from './RxjsRemoteResponse';
import { SocketLike } from './SocketLike';

export class RxjsRemoteClient {
	private readonly _subscribers = new Map<string, Subscriber<any>>();
	
	constructor(private readonly _socket: SocketLike) {
		this._socket.on(message => this.parseMessage(message));
	}

	observable<T>(name: string, ...args: any[]) {
		return new Observable<T>(subscriber => this.subscribe(subscriber, name, ...args));
	}

	private subscribe<T>(subscriber: Subscriber<T>, name: string, ...args: any[]) {
		const id = Math.random().toString(36).substring(2, 15);
		this._subscribers.set(id, subscriber);
		this._socket.send({ type: RequestType.start, id, name, args });
		return () => this._socket.send({ type: RequestType.complete, id });
	}

	private parseMessage(message: RxjsRemoteResponse) {
		if (!this._subscribers.has(message.id)) {
			throw new Error('id not found');
		}
		const subscriber = this._subscribers.get(message.id);
		switch (message.type) {
			case 'next':
				subscriber.next(message.value);
				break;
			case 'complete':
				subscriber.complete();
				break;
			case 'error':
				subscriber.error(message.error);
				break;
		}
	}
}
