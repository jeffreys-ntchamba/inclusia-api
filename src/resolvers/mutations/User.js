const signUp = async (parent, args, context) => {
    console.log("signUp mutation");
    const { name, email, phone, password} = args;
    try {
      
      let user = await context.prisma.user.findUnique({ where: { email } });
      if (user) {
        throw new Error("User already exist, try to login");
      }
      user = await context.prisma.user.findUnique({ where: { phone } });
      if (user) {
        throw new Error("User already exist, try to login");
      }
      user = await context.prisma.user.create({
        data: {
          name,
          email,
          phone,
          password,
        },
      }); 
     
      if (user) {
        return user;
      }
    } catch (e) {
      console.log("error",e);
      throw new Error(e);
    }
  };
  const signIn = async (parent, args, context) => {
    const { email, password } = args;
    try {
      const user = await context.prisma.user.findUnique({
        where: {
          email,  
        },
      });
      if (!user) throw new Error("You are not a member yet, try to sign up first");
      if (user.password != password) {
        throw new Error("Password is not correct");
      }
      if(user){

      return user;}
      else
      throw new Error("L'utilisateur n'existe pas")
    } catch (e) {
      console.log("error",e);
      throw new Error(e);
    }
  };
  module.exports = {
    signUp,
    signIn,
  };