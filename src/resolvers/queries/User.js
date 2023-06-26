const userList = async (parent, args, context) => {
    try{
    const userList= await context.prisma.user.findMany()
    return userList
  }
  catch(e){
    console.log("error",e)
    throw new Error(e)
    
  }
}
module.exports = {
    userList,
}