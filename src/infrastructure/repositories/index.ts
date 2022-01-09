import { ProductPerository } from './product.repository';
import { UserRepository } from './user.repository';
import {RoleRepository} from "./role.repository";

export const Repository = [UserRepository, ProductPerository,RoleRepository];
