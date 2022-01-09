import moment = require("moment");
import uuid =  require ("uuid");

export class UuidHelper {
    static newUuid = () => uuid.v4();
}
export class DataTimeHelper {
    static getNowUnix= () =>moment().unix();
}