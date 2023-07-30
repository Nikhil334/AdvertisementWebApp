"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = __importDefault(require("./src/routes/user.routes"));
const conn_1 = require("./src/config/conn");
const user_updateprofile_1 = __importDefault(require("./src/routes/user.updateprofile"));
const product_category_routes_1 = __importDefault(require("./src/routes/product.category.routes"));
const product_routes_1 = __importDefault(require("./src/routes/product.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
(0, conn_1.dbconnection)();
app.use('/', user_routes_1.default);
app.use('/profile', user_updateprofile_1.default);
app.use('/', product_category_routes_1.default);
app.use('/products', product_routes_1.default);
app.listen(PORT, () => {
    console.log(`I am listening at the port number ${PORT}`);
});
//# sourceMappingURL=server.js.map