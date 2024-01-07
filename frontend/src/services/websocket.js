import { wsUrl } from "../config";

const socket = new WebSocket(`${wsUrl}/ws`);

export default socket;
