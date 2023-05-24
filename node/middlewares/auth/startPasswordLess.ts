export async function startPasswordLess(
  ctx: Context,
  next: () => Promise<any>
): Promise<void> {
  const {
      clients: { authClient },
      vtex: { route: { params: { telefono } } },
  } = ctx

  const auth = await authClient.startPasswordLess(`${telefono}`);
  ctx.status = 200
  ctx.body = auth
  ctx.set('Cache-Control', 'no-cache')
​
  await next()
}
