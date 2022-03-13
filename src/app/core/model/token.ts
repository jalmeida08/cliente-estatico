import { RoleDTO } from "src/app/area-deslogada/login/dto/role-dto";

export class Token {
    accessToken!: string;
    tokenType!: string;
    nome!: string;
    role!: RoleDTO[];
}