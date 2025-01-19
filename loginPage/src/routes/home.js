import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  const username = req.user.username;  
  res.render("home", {
    user: username, 
    layout: false });
});

export default router;
