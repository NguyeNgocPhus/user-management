import moment = require("moment");
import uuid =  require ("uuid");
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import {fileTypeEnum} from "../../core/domain/common/enum/fileTypeEnum.status";
import {WrongTypeFileException} from "../../core/domain/exceptions/WrongTypeFile.exception";
import * as fs from "fs";
import path = require("path");
export class UuidHelper {
    static newUuid = () => uuid.v4();
}
export class DataTimeHelper {
    static getNowUnix= () =>moment().unix();
}
export class fileUploadHelper {
    static async upLoadFile(file:FileUpload){
        //console.log(file);
        switch (file.mimetype) {
            case fileTypeEnum.JPG:
                await this.upload(file,fileTypeEnum.JPG);
                break;
            case fileTypeEnum.XLSX:
                await this.upload(file,fileTypeEnum.XLSX);
                break;
            case fileTypeEnum.JPEG:
                 await this.upload(file,fileTypeEnum.JPEG);
                break;
            case fileTypeEnum.XLS:
                await this.upload(file,fileTypeEnum.XLS);
                break;
            case fileTypeEnum.DOCX:
                await this.upload(file,fileTypeEnum.DOCX);
                break;
            default:
                throw new WrongTypeFileException({message: "wrong type file"});

        }
    }
    static async upload(file:FileUpload,fileType:string){
        try{
            file.filename = `${
                path.parse(file.filename).name
            }_${Date.now()}.${file.filename.split(".")[1]}`;

            await file.createReadStream().pipe(
                fs.createWriteStream(`D:/NEST_JS/nest_luyentap/src/infrastructure/images/${file.filename}`)
            )
            console.log("done")
        }catch (e) {
            console.log(e.message)
        }



    }

}