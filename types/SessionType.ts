export interface SessionType {
  nrUuid: string;
  name: string;
  email: string;
  accessToken: string;
  roles: ("ROLE_USER" | "ROLE_ADMIN")[];
}
