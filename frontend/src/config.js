export const BaseUrl = process.env.REACT_APP_BASE_URL || "https://socialmedia-frontend-4s2v.onrender.com";
console.log("BASE_URL", BaseUrl)
export const wsUrl = `ws://${BaseUrl.split("//")[1]}`;
console.log("WS_URL", wsUrl)