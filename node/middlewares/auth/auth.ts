export async function auth(
  ctx: Context,
  next: () => Promise<any>
): Promise<void> {
  const {
      clients: { authClient },
      vtex: { route: { params: { email } } },
  } = ctx

  const auth = await authClient.getUserByEmail(`${email}`);
  ctx.status = 200
  ctx.body = auth
  ctx.set('Cache-Control', 'no-cache')
​
  await next()
}
