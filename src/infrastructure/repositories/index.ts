import { ProductRepository } from './product.repository';
import { UserRepository } from './user.repository';
import {RoleRepository} from "./role.repository";
import {TypeRepository} from "./type.repository";
import {PictureRepository} from "./picture.repository";

export const Repository = [UserRepository, ProductRepository,RoleRepository,TypeRepository,PictureRepository];
