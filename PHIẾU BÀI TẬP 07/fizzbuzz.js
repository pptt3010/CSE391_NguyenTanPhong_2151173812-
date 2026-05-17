// ==========================
// Version 1: Classic
// ==========================

for (let i = 1; i <= 100; i++) {

    if (i % 3 === 0 && i % 5 === 0) {

        console.log("FizzBuzz")
    }
    else if (i % 3 === 0) {

        console.log("Fizz")
    }
    else if (i % 5 === 0) {

        console.log("Buzz")
    }
    else {

        console.log(i)
    }
}


// ==========================
// Version 2: Custom
// ==========================

function customFizzBuzz(n, rules) {

    for (let i = 1; i <= n; i++) {

        let result = ""

        for (let j = 0; j < rules.length; j++) {

            if (i % rules[j].divisor === 0) {

                result += rules[j].word
            }
        }

        if (result === "") {

            console.log(i)
        }
        else {

            console.log(i + " = " + result)
        }
    }
}


// ==========================
// Test
// ==========================

customFizzBuzz(30, [

    { divisor: 3, word: "Fizz" },

    { divisor: 5, word: "Buzz" },

    { divisor: 7, word: "Jazz" }

])


/*
Kết quả ví dụ:

3 = Fizz
5 = Buzz
7 = Jazz
15 = FizzBuzz
21 = FizzJazz
35 = BuzzJazz
*/
