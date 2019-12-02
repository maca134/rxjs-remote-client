import { Observable, Subscriber } from 'rxjs';
import { RequestType } from './RequestType';
import { RxjsRemoteResponse } from './RxjsRemoteResponse';
import { RxjsAttachConfig } from './RxjsAttachConfig';

export class RxjsRemoteClient {
	private readonly _subscribers = new Map<string, Subscriber<any>>();

	constructor(private readonly _config: RxjsAttachConfig) {
		this._config.onClose(() => this.onClose());
		this._config.onMessage(message => this.onMessage(message));
	}

	observable<T>(name: string, ...args: any[]) {
		return new Observable<T>(subscriber => this.subscribe(subscriber, name, ...args));
	}

	private subscribe<T>(subscriber: Subscriber<T>, name: string, ...args: any[]) {
		const id = Math.random().toString(36).substring(2, 15);
		this._subscribers.set(id, subscriber);
		this._config.send({ type: RequestType.start, id, name, args });
		return () => this._config.send({ type: RequestType.complete, id });
	}

	private onMessage(message: RxjsRemoteResponse) {
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
	
	private onClose(): void {
		for (const [_, subscriber] of this._subscribers) {
			subscriber.error(new Error('connection closed'));
		}
		this._subscribers.clear();
	}
}
