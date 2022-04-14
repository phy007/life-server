const commonWays = {
  sendData: (result, res) => {
    if (result) {
      res.status(200).send('success')
    } else {
      res.status(204).send('fail')
    }
  }
}

module.exports = commonWays