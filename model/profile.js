const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ProfileSchema = new Schema({
    user:{
        Type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
     max: 40
    },
    company: {
        type: String,
    },
    website:{
        type: String
    }, 
    skill:{
        type: [String],
        required: true
    },
    status: {
        type: String, 
        required: true
    },
    bio: {
         type: String
    },
    experience: [
        {
            title:{
                type: String
            },
            company:{
                type: String
            },
            from:{
              type: Date,
              required: true
            },
            to:{
             type: Date
            },
            current: {
             type: Boolean,
             default: false
            },
            descrption: {
                type: String
             }
            
        }
      
    ]

})

module.exports = Profile = mongoose.model( 'profile', ProfileSchema)