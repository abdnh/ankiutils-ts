import type { DescService } from "@bufbuild/protobuf";
import {
    createClient,
    type Client,
} from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

const transport = createConnectTransport({
    baseUrl: "/api",
    useBinaryFormat: true,
    fetch: (input, init) => {
        const headers = init?.headers ?? {};
        return fetch(input, {
            ...init,
            headers: {
                ...headers,
                "qt-widget-id": window.qtWidgetId,
            },
        });
    },
});

export function createProtoClient<T extends DescService>(service: T): Client<T> {
    return createClient(service, transport);
}
