const mongoose=require("mongoose");
const validator=require("validator");

const TaskSchema=new mongoose.Schema({
    taskId: {
        type: String,
        unique: true, 
        required: true,
      },
    title:{
        type:String,
        required:true,
        minlength:5
    },
    description:{
        type:String,
        required:true,
        maxlength:100
    },
    assigned_user:{
        type:String,
        required:true,
    },
    due_date:{
        type:String
    },
    status:{
        type:String
    }
});

const Tasks= new mongoose.model("Tasks",TaskSchema);

module.exports=Tasks;


