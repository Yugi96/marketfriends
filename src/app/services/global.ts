import { CONFIG } from "./config";

export let GLOBAL = {
  url: `http://${CONFIG.ip}:3000/api`,
  websocketUrl: `http://${CONFIG.ip}:3000`
};
