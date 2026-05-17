const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];


// Đếm xếp loại
let gioi = 0
let kha = 0
let trungBinh = 0
let yeu = 0


// Tổng điểm từng môn
let tongMath = 0
let tongPhysics = 0
let tongCs = 0


// Điểm TB theo giới tính
let tongNam = 0
let tongNu = 0

let soNam = 0
let soNu = 0


// Tìm cao nhất và thấp nhất
let maxStudent = null
let minStudent = null


console.log("| STT | Tên    | TB   | Xếp loại    |")
console.log("|-----|--------|------|-------------|")


for (let i = 0; i < students.length; i++) {

    let student = students[i]

    // Tính điểm trung bình
    let average =
        student.math * 0.4 +
        student.physics * 0.3 +
        student.cs * 0.3

    average = average.toFixed(1)

    // Xếp loại
    let rank = ""

    if (average >= 8.0) {
        rank = "Giỏi"
        gioi++
    }
    else if (average >= 6.5) {
        rank = "Khá"
        kha++
    }
    else if (average >= 5.0) {
        rank = "Trung bình"
        trungBinh++
    }
    else {
        rank = "Yếu"
        yeu++
    }

    // In bảng
    console.log(
        `| ${i + 1} | ${student.name} | ${average} | ${rank} |`
    )

    // Tổng điểm môn học
    tongMath += student.math
    tongPhysics += student.physics
    tongCs += student.cs

    // Tìm max
    if (maxStudent === null || average > maxStudent.average) {
        maxStudent = {
            name: student.name,
            average: average
        }
    }

    // Tìm min
    if (minStudent === null || average < minStudent.average) {
        minStudent = {
            name: student.name,
            average: average
        }
    }

    // Điểm TB theo giới tính
    if (student.gender === "M") {
        tongNam += Number(average)
        soNam++
    }
    else if (student.gender === "F") {
        tongNu += Number(average)
        soNu++
    }
}


// Thống kê xếp loại
console.log("\nSố lượng xếp loại:")

console.log("Giỏi:", gioi)
console.log("Khá:", kha)
console.log("Trung bình:", trungBinh)
console.log("Yếu:", yeu)


// Sinh viên cao nhất
console.log("\nSinh viên điểm cao nhất:")

console.log(
    `${maxStudent.name} - ${maxStudent.average}`
)


// Sinh viên thấp nhất
console.log("\nSinh viên điểm thấp nhất:")

console.log(
    `${minStudent.name} - ${minStudent.average}`
)


// Điểm TB từng môn
console.log("\nĐiểm trung bình toàn lớp:")

console.log(
    "Math:",
    (tongMath / students.length).toFixed(1)
)

console.log(
    "Physics:",
    (tongPhysics / students.length).toFixed(1)
)

console.log(
    "CS:",
    (tongCs / students.length).toFixed(1)
)


// Bonus: điểm TB theo giới tính
console.log("\nĐiểm TB theo giới tính:")

console.log(
    "Nam:",
    (tongNam / soNam).toFixed(1)
)

console.log(
    "Nữ:",
    (tongNu / soNu).toFixed(1)
)
