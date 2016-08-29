function getDigit(number, digit) {
    return ~~((number / Math.pow(10, digit - 1)) % 10);
}