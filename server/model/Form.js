const mongoose = require("mongoose")

const formSchema = new mongoose.Schema({
    formname: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    folderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder',
    },
    theme: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
    },
    starts: {
        type: Number,
    },
    completionrate: {
        type: Number,
    },
    fields: [
        {
            type: {
                type: String,
                required: true
            },
            heading: {
                type: String,
                required: true
            },
            value: {
                type: String
            }
        }
    ]
}, { timestamps: true })


module.exports = mongoose.model("Form", formSchema)