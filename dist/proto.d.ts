import { DescService } from '@bufbuild/protobuf';
import { Client } from '@connectrpc/connect';
export declare function createClient<T extends DescService>(service: T): Client<T>;
