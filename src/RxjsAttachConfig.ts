export type RxjsAttachConfig = {
	onMessage: (fn: (data: any) => void) => void;
	onClose: (fn: () => void) => void;
	send: (data: any) => void;
};
