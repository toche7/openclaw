import { type AddressInfo } from "node:net";
import { afterEach, describe, expect, it } from "vitest";
import { createGatewayHttpServer } from "./server-http.js";

describe("Gateway HTTP Health Endpoint", () => {
  const servers: Array<ReturnType<typeof createGatewayHttpServer>> = [];

  afterEach(() => {
    for (const server of servers) {
      server.close();
    }
    servers.length = 0;
  });

  it("responds to /health with 200 OK", async () => {
    const server = createGatewayHttpServer({
      canvasHost: null,
      controlUiEnabled: false,
      controlUiBasePath: "/openclaw",
      openAiChatCompletionsEnabled: false,
      openResponsesEnabled: false,
      handleHooksRequest: async () => false,
      resolvedAuth: { mode: "none" },
    });
    servers.push(server);

    await new Promise<void>((resolve) => {
      server.listen(0, "127.0.0.1", () => resolve());
    });

    const address = server.address() as AddressInfo;
    const port = address.port;

    const response = await fetch(`http://127.0.0.1:${port}/health`);
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("text/plain; charset=utf-8");
    expect(await response.text()).toBe("ok");
  });

  it("responds to /healthz with 200 OK", async () => {
    const server = createGatewayHttpServer({
      canvasHost: null,
      controlUiEnabled: false,
      controlUiBasePath: "/openclaw",
      openAiChatCompletionsEnabled: false,
      openResponsesEnabled: false,
      handleHooksRequest: async () => false,
      resolvedAuth: { mode: "none" },
    });
    servers.push(server);

    await new Promise<void>((resolve) => {
      server.listen(0, "127.0.0.1", () => resolve());
    });

    const address = server.address() as AddressInfo;
    const port = address.port;

    const response = await fetch(`http://127.0.0.1:${port}/healthz`);
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("text/plain; charset=utf-8");
    expect(await response.text()).toBe("ok");
  });

  it("health endpoint does not require authentication", async () => {
    const server = createGatewayHttpServer({
      canvasHost: null,
      controlUiEnabled: false,
      controlUiBasePath: "/openclaw",
      openAiChatCompletionsEnabled: false,
      openResponsesEnabled: false,
      handleHooksRequest: async () => false,
      resolvedAuth: { mode: "password", password: "secret" },
    });
    servers.push(server);

    await new Promise<void>((resolve) => {
      server.listen(0, "127.0.0.1", () => resolve());
    });

    const address = server.address() as AddressInfo;
    const port = address.port;

    // Should succeed without authentication
    const response = await fetch(`http://127.0.0.1:${port}/health`);
    expect(response.status).toBe(200);
    expect(await response.text()).toBe("ok");
  });
});
