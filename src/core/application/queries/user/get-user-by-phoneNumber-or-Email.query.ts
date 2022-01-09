export class GetUserByPhoneNumberOrEmailQuery {
    constructor(public readonly phoneNumber: string, public readonly email: string) {
    }
}