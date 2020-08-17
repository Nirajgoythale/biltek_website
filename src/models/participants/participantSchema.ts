import { Document, Model, model, Schema } from "mongoose";
import { ParticipantModel } from "./participantModel";
import { response } from "express";

export interface IParticipant extends Document, ParticipantModel {

}


const ParticipantSchema: Schema = new Schema({
    name_surname: { type: String, required: 'Name and surname are required', trim: true },
    university: { type: String, required: 'University is required parameter' },
    department: { type: String, required: 'Department is required parameter' },
    email: { type: String, required: 'Email is a required parameter', trim: true },
    phone: { type: String },
    date: { type: String, required: "Date is a required parameter", default: new Date().toLocaleDateString("tr-TR", { timeZone: "Europe/Istanbul", weekday: "long", year: "numeric", month: "short", day: "numeric" }) }
})

ParticipantSchema.pre<IParticipant>('save', function (_next) {
    console.log("geldim lo")
    ParticipantDbModel.findOne({ email: this.email }, { email: 1, _id: 0 }, (err) => {
        if (err)
            _next(err)
    }).then((res) => {
        console.log(res)
        if (res === null) {
            console.log("hatasız geldim")
            _next()
        }
        else {
            console.log("aynısından var")
            _next(new Error("Aynı mailden var"))
        }
    })
})


const ParticipantDbModel: Model<IParticipant> = model('participants', ParticipantSchema);


export default ParticipantDbModel 
