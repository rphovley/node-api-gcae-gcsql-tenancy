  /**
   * Normalize a port into a number, string, or false.
   */
export default function normalizePort(val: string): number | string {
  const port = parseInt(val, 10)
  if (isNaN(port)) return val
  if (port >= 0) return port
  return null
}
