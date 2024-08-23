import http from "http";

async function startServer() {
  const httpServer = http.createServer();
  const PORT = process.env.PORT || 4000;

  httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
