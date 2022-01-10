import {UserReadModel} from "../../../../core/domain/entities/user.entity";
import {Claims} from "../../authentication/claims/claims";
import {DataTimeHelper, UuidHelper} from "../../helper";


export class UntilService {
    constructor() {
    }

    buildClaim(user:UserReadModel){
        const roles = [],permissions = [];
        for(let role of user.roles){
            roles.push(role.id);
        }
        const claims = new Claims();
        claims.id = user.id;
        claims.iat = DataTimeHelper.getNowUnix();
        claims.jti = UuidHelper.newUuid();
        claims.name = user.name;
        claims.roles = roles;
        claims.permission = ['ADMIN'];
        return claims;
    }
}