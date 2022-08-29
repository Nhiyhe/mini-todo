import mongoose from "mongoose";

const todosSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },

    completed:{
        type:Boolean,
        default:false,
    }
}, {timestamps:true});

export default mongoose.model('Todos', todosSchema);