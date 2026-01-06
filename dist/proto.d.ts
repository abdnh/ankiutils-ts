import { DescService } from '@bufbuild/protobuf';
import { Client } from '@connectrpc/connect';
export declare function createProtoClient<T extends DescService>(service: T): Client<T>;
