import { Router } from "express";
import { getKaranBajaj, postKaranBajaj } from "../controllers/bfhlController.js";

const router = Router();

router.get("/", getKaranBajaj);
router.post("/", postKaranBajaj);

export default router;
