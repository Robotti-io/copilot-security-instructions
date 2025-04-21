// Token with no expiration
const jwt = require("jsonwebtoken");
const token = jwt.sign({ user: "admin" }, "shhhhh"); // no expiration

// No CSRF protection
app.post("/update-profile", (req, res) => {
    updateUser(req.body);
    res.send("Updated");
});
