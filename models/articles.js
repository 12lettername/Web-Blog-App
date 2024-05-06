import mongoose from "mongoose";
import {marked} from "marked";
import slugify from "slugify";
import createDomPurifier from "dompurify";
import {JSDOM} from "jsdom";

const dompurify = createDomPurifier(new JSDOM().window)

const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHTML: {
        type: String,
        required: true
    }
})

schema.pre("validate", function(next){
    if (this.title){
        this.slug = slugify(this.title, {lower: true, 
            strict: true
        })
    }

    if(this.description){
        this.sanitizedHTML = dompurify.sanitize(marked.parse(this.description))
    }
    else{
        console.log("Error")
    }

    next()
})

export default mongoose.model("Article",schema);