const fnAsync = () => {
  return new Promise((resolve, reject) => {
    true
      ? setTimeout(() => resolve("async"), 2000)
      : reject(new Error("Error!"));
  });
};

const anotherFN = async () => {
  const something = await fnAsync();
  console.log(something);
  console.log("hello");
};

console.log("before");
anotherFN();
console.log("after");
