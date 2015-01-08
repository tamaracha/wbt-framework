var mongoose,ObjectId,User,Unit,CommentSchema,Comment;
mongoose=require("mongoose");
Promise.promisifyAll(mongoose.Model);
Promise.promisifyAll(mongoose.Model.prototype);
Promise.promisifyAll(mongoose.Query.prototype);
ObjectId=mongoose.Schema.Types.ObjectId
User=require("../user/model");
Unit=require("../unit/model");

CommentSchema=new mongoose.Schema({
  unit: {
    type: ObjectId,
    required: true,
    ref: "unit"
  },
  user: {
    type: ObjectId,
    required: true,
    ref: "user"
  },
  value: {
    type: String,
    required: true
  }
});
CommentSchema.post("save",function(){
  var comment=this;
  return User.findById(comment.user)
  .execAsync()
  .then(function(user){
    user.akzeptanz.comments.push(comment._id);
    return user.saveAsync();
  });
});
CommentSchema.post("save",function(){
  var comment=this;
  return Unit.findById(comment.unit)
  .execAsync()
  .then(function(unit){
    unit.akzeptanz.comments.push(comment._id);
    return unit.saveAsync();
  });
});

Comment=mongoose.model("Comment",CommentSchema);
Promise.promisifyAll(Comment.prototype);
module.exports=Comment;