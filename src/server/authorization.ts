import { SessionData } from "common/types";
import { NextRequest } from "next/server";
import { KOMPGEN_SECRET } from "./secrets";

export function canManageTasks(session: SessionData | null, request: NextRequest | undefined = undefined): boolean {
  if (request?.headers.get('Authorization') === KOMPGEN_SECRET) {
    return true;
  }
  if (session == null || session.user.role != 'admin') {
    return false;
  }
  return true;
}

export function canManageContests(session: SessionData | null): boolean {
  if (session == null || session.user.role != 'admin') {
    return false;
  }
  return true;
}
