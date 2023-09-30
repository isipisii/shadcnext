export function addComma(num: number): string {
    let numberWithComma = ""

    const reversedNum = num.toString().split("").reverse()
    const numArrayWithComma = reversedNum.map((num, index) =>  index % 3 === 0 && index > 0 ? num + ", " : num )
    numberWithComma = numArrayWithComma.reverse().join("")

    return numberWithComma
}