const app = require("./app");

// Render/Node starts a listening server. Serverless platforms (for example,
// Vercel) import this module and use the exported Express app as the handler.
if (require.main === module && process.env.VERCEL !== "1") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
