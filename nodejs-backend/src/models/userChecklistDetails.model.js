
    module.exports = function (app) {
        const modelName = 'user_checklist_details';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            checkListName: { type:  String , required: true, minLength: null, maxLength: null },
checkListDescription: { type:  String , required: true },
checkListItems: { type:  String , maxLength: 150, index: true, trim: true },
checkListOrder: { type:  String , required: true },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };