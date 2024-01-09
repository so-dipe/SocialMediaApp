export const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
export const BaseUrl = process.env.REACT_APP_BASE_URL || "https://socialmediaapp-backend-ptjrsgbh3q-uc.a.run.app";
console.log("BASE_URL", BaseUrl)
export const wsUrl = `${wsProtocol}//${BaseUrl.split("//")[1]}`;
console.log("WS_URL", wsUrl)