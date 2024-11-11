
    module.exports = function (app) {
        const modelName = 'ticket_collection_details';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            machineID: { type:  String , minLength: null, maxLength: 150, index: true, trim: true },
userName: { type: Schema.Types.ObjectId, ref: "users" },
userMailAddress: { type: Schema.Types.ObjectId, ref: "users" },
location: { type:  String , maxLength: 150, index: true, trim: true },
ticketIssue: { type:  String , maxLength: 150, index: true, trim: true },
ticketStatus: { type:  String , required: true },
userCheckList: { type:  String , maxLength: 150, index: true, trim: true },

            
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