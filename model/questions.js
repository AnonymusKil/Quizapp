import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true,
    },
    option:{
        type:[String],
        required:true,
        validate:{
            validator:function(value){
                return value.length === 4;
            },
            message:"Option must have exactly 4 items"
        }
    },
    answer:{
        type:String,
        required:true,
        validate:{
            validator:function(value){
                return this.option.includes(value);
            },
            message:"Answer must be one of the options"
        }
    }


})

export default mongoose.model("question", questionSchema);