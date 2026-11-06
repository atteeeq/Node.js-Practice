import express from "express";

const app = express();

const userArr = [];

app.use(express.json());

const generateToken = () => {
  let options = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  let token = "";

  for (let i = 0; i < 32; i++) {
    token = token + options[Math.floor(Math.random() * options.length)];
  }

  return token;
};

const authMiddleware = (req, res, next) => {
  const userToken = req.headers["token"];

  const verifieldUser = userArr.find((userObj) => {
    if (userToken === userObj.token) {
      return true;
    } else {
      return false;
    }
  });

  if (verifieldUser) {
    req.verifieldUser = verifieldUser;
    next();
  } else {
    res.json({
      msg: "Invalid token...!",
    });
  }
};

app.post("/signup", (req, res) => {
  const { username, password, email } = req.body;

  let userObj = {
    username,
    password,
    email,
  };

  userArr.push(userObj);
  console.log(userArr);

  res.json({
    msg: "user created successfully...",
    userObj,
  });
});

app.post("/signin", (req, res) => {
  let { username, password } = req.body;

  const foundUser = userArr.find((user) => {
    if (user.username === username && user.password === password) {
      return true;
    } else {
      return false;
    }
  });

  if (!foundUser) {
    res.json({
      msg: "invalid username or password",
    });
  }

  const token = generateToken();

  foundUser.token = token;

  console.log(userArr);

  res.json({
    msg: "signed in successfully",
    token,
  });
});

app.use(authMiddleware);

app.get("/cousre", (req, res) => {
  res.json({
    data: {
      courseId: "90",
      cousrseName: "Full Stack development",
      material: "MERN",
    },
  });
});

app.get("/me", (req, res) => {
  let { verifieldUser } = req;

  res.json({
    msg: "We Got your Data",
    data: verifieldUser,
  });
});

app.listen("8080", () => {
  console.log("The Server is Listing on port : 8080");
});
