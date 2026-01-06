import type { DescService } from "@bufbuild/protobuf";
import {
    createClient as createClientBase,
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

export function createClient<T extends DescService>(service: T): Client<T> {
    return createClientBase(service, transport);
}
