import { Stream } from "stream";

export interface Upload1 {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => Stream;
}