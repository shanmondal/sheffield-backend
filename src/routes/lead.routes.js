"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lead_controller_1 = require("../controllers/lead.controller");
const router = (0, express_1.Router)();
exports.default = router;
router.get("/", lead_controller_1.getLeads);
router.post("/", lead_controller_1.createLead);
router.get("/health", (_, res) => {
    res.json({
        status: "ok",
    });
});
//# sourceMappingURL=lead.routes.js.map