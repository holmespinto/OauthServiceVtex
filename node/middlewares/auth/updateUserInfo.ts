export async function updateUserInfo(
  ctx: Context,
  next: () => Promise<any>
): Promise<void> {
  const {
      clients: { authClient },
      vtex: { route: { params: { user_id,payload } } },
  } = ctx

  const auth = await authClient.updateUserInfo(`${user_id}`,`${payload}`);
  ctx.status = 200
  ctx.body = auth
  ctx.set('Cache-Control', 'no-cache')
​
  await next()
}
