export const sum = (req, res) => {
  const { a, b } = req.params;
  let result = parseInt(a) + parseFloat(b);

  res.json({
    msg: "Sum request recieved at backend",
    sum: result,
  });
};

export const mul = (req, res) => {
  const { a, b } = req.params;
  let resut = parseInt(a) * parseInt(b);

  res.json({
    msg: "Multiplication request recieved at backend",
    mul: resut,
  });
};

export const div = (req, res) => {
  const { a, b } = req.params;

  let result = params(a) / params(b);

  res.json({
    msg: "Division request received at backend",
    div: result,
  });
};

export const sub = ( req, res ) => {
    const { a, b} = req.params;

    let result = params(a) - params(b);

    res.json({
        msg: "Subtration request received from body at backend",
        div: result
    })
}