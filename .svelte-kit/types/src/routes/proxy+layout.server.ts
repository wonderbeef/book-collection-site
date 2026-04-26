// @ts-nocheck
import type { LayoutServerLoad } from "./$types";

export const load = async ({
  locals: { safeGetSession },
  cookies,
}: Parameters<LayoutServerLoad>[0]) => {
  const { session, user } = await safeGetSession();

  return {
    session,
    user,
    cookies: cookies.getAll(),
  };
};
