import mongoose from "mongoose"




export class Database {
    constructor(url,options){
        this.url = url
        this.options = options || {}
    }

    async connected(){
        try {
            await mongoose.connect(this.url,this.options)
            console.log("Hey From MongoDB Atlas")
        } catch (error) {

            console.log(error.message)
        }
    }
}