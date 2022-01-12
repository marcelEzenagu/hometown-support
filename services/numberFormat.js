const thousandFormat = (number) => {
  let newNumber =  new Intl.NumberFormat().format(number)
    return newNumber
}

module.exports = thousandFormat