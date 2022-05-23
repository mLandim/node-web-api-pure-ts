"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const node_url_1 = require("node:url");
const routes_1 = require("./routes");
const handler = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { url, method } = request;
    const urlString = url ? url : '';
    const { pathname } = (0, node_url_1.parse)(urlString, true);
    const requestResource = `${pathname}`;
    const requestMethod = `${method === null || method === void 0 ? void 0 : method.toLowerCase()}`;
    // console.log(`${requestMethod} :: ${requestResource}`)
    yield routes_1.router.execute(requestMethod, requestResource, request, response);
});
exports.handler = handler;
