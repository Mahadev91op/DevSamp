export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    try {
      const dns = await import("dns");
      if (dns.setDefaultResultOrder) {
        dns.setDefaultResultOrder("ipv4first");
      }
      try {
        dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
      } catch (err) {
        // ignore
      }
    } catch (err) {
      // ignore
    }
  }
}
