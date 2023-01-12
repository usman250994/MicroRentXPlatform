class ExceptionHandler {
  async tryAndCatch(method) {
    try {
      console.log("usman pehle yeh ");
      return method();
    } catch (e) {
      console.log("sssss ewww ty", e);
      throw e;
    }
  }
}

function myFunc() {
  try {
    console.log("hello usman");
    throw new Error("hello worleed");
  } catch (e) {
    console.log("in catch block");
    console.log(e);
    throw e;
  }
}

try {
  const s = new ExceptionHandler();
  s.tryAndCatch(myFunc);
} catch (e) {
  console.log("yuou rt23 ");
  console.log("yuou rt ", e);
}

// try {
//   myFunc();
// } catch (e) {
//   console.log("second catch block");
//   console.log(e);
// }
