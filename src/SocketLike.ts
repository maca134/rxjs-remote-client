export type SocketLike = {
	on: (fn: (data: any) => void) => any;
	send: (data: any) => any;
};
