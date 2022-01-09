import type {Resolver} from "@automapper/core";
import { Claims } from "src/infrastructure/common/authentication/claims/claims";



export const currentUserResolver: Resolver<any, { claim: Claims }, Claims> = {
    resolve(source: any, {claim}): Claims {
        return claim;
    }
};
