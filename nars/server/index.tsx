import * as React from "react";
import { Static, Text } from "nars";
import { Server } from "ws";
import { config } from "../config";

/* Define which component is rendered per given route */
const components = {
  Index: (props: { text: string }) => <Text>{props.text}</Text>
};

/* Create a router. config and components have to match! */
const router = Static.createRouter(config, components);

/* Create a server */
const webSocketServer = new Server({ port: 9000 });

/* Start listening for incoming requests */
Static.attatchListener(webSocketServer, router);
