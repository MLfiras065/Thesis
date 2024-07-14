const Owner=require('../database/models/Owner')
const User =require('../database/models/User')
const Rooms=require('../database/models/Rooms')

const getRooms=async(req,res)=>{
    try {
        const rooms=await Rooms.findAll({where:{userid:req.params.id},    include: [
            { model: User, as: 'user' },
            { model: Owner ,as:"owner"}
          ]})
        res.json(rooms)
    } catch (error) {
        console.log('err',error);
    }

}
module.exports={getRooms}