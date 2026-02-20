// let num: number = 15
// console.log(num)

// let name: string = "John Doe"
// console.log(name)

// let bol: boolean = false
// bol = true
// console.log(bol)

// let b: any
// b = 1
// b = "hello"
// b = true
// console.log(b)

// let strNum: string | number
// strNum = "hello"
// console.log(strNum)
// strNum = 42
// console.log(strNum)

// let arr: string[] = ["a", "b", "c"]
// arr.push("d")
// console.log(arr)

// let arr1: (string | number)[] = [1, "two", 3, "four"]
// arr1.push(5)
// arr1.push("six")
// console.log(arr1)

// let arrTuple: [string, number, string] = ["a", 1, "b"]
// console.log(arrTuple)

// type User = {
//     name: string
//     age: number
//     isAdmin: boolean
// }

// // let user1: User = {
// //     name: "Alice",
// //     age: 30,
// //     isAdmin: true
// // }

// // let user2: User = {
// //     name: "Bob",
// //     age: 25,
// //     isAdmin: false
// // }

// // let users: User[] = [user1, user2]
// // console.log(users)

// // enum Grade {
// //     FAIL = 60,
// //     D = 70,
// //     C = 80,
// //     B = 90,
// //     A = 100
// // }

// // type Status = "failed" | "loading" | "success"

// // let connectionStatus: Status
// // connectionStatus = "success"
// // console.log(connectionStatus)

// // type NumberOrString = number | string

// // type NewUser = {
// //     name: NumberOrString
// //     age: number
// // }

// // const exampleNewUser: NewUser = {
// //     name: "newbie",
// //     age: 18
// // }
// // console.log(exampleNewUser)

// // type Gender = "male" | "female" | "other"

// // type Student = {
// //     name: string
// //     grade: Grade
// //     gender: Gender
// //     status: Status
// // }

// // let stud1: Student = {
// //     name: "Trump",
// //     grade: Grade.A,
// //     gender: "male",
// //     status: "loading"
// // }

// // let stud2: Student = {
// //     name: "Obama",
// //     grade: Grade.B,
// //     gender: "male",
// //     status: "success"
// // }

// // const students: Student[] = [stud1, stud2]
// // console.log(students)

// // const sum = (a: number | string, b: number): number | string => {
// //     if (typeof a === "string") return a + b
// //     return a + b
// // }

// // console.log(sum(1, 1))

// // const multiply = (a: number, b: number): number => {
// //     return a * b
// // }

// // console.log(multiply(2, 3))

// // const minus = (a: number, b: number): number => {
// //     return a - b
// // }

// // console.log(minus(5, 2))

// // const add = (a: number, b?: number): number => {
// //     if (b !== undefined) return a + b
// //     return a
// // }

// // console.log(add(5, 3))
// // console.log(add(7))

// // const add2 = (a: number, b: number = 10): number => {
// //     return a + b
// // }

// // console.log(add2(5, 3))
// // console.log(add2(7))

// function add(a: string | number, b: string | number): string | number {
//     if (typeof a === "string" || typeof b === "string") {
//         return a.toString() + b.toString()
//     }
//     return a + b
// }

// console.log(add(5, 10)) // 15
// console.log(add("Hello, ", "world!")) // "Hello, world!"
// console.log(add("The answer is ", 42)) // "The answer is 42"

// // never type, void type

// // const infinite = ():never => {
// //     while (true) {
// //         console.log("This function never ends")
// //     }
// // }

// const errorMessage = (msg : string): never => {
//     throw new Error(msg)
// }
// console.log(errorMessage)

// const main = (): void => {
//     console.log("This function does not return anything")
// }

// main()
// infinite()
// errorMessage("This is an error")

// Type assertions or Casting
// type one = string 
// type two = string | number
// type three = "hello"

// let a = "hello" as one
// let b = a as two
// let c = b as three
// console.log(c)
// // Now c is of type "hello", so we can only assign the value 'hello' to it
// //
// c = 'hello'
// console.log(c)
// The following line would cause a TypeScript error
// c = 'hi' // Error: Type '"hi"' is not assignable to type '"hello"'.

// let d = <one>"abc"
// let e = <two>1
// let f = <three>e
// console.log(f)
// Now f is of type "hello", so we can only assign the value 'hello' to it
//

//  DOM elements

// const myImage=document.querySelector("img") as HTMLImageElement;
// myImage.src="https://www.example.com/image.jpg";
// console.log(myImage.src);

// // not null
// const myImage1=document.querySelector("img");
// myImage.src="https://www.example.com/image.jpg"!;
// console.log(myImage1!.src);

// // HTML type
// const myImage2=document.getElementById("myImage") as HTMLImageElement;
// myImage2.src="https://www.example.com/image.jpg";
// console.log(myImage2.src);

// // classes
// // classes modifiers
// // public - anywhere
// // private - only inside the class
// // protected - inside the class and subclasses

// class User {
//     public name: string
//     private age: number
//     protected active: boolean
//     constructor(name: string, age: number, active: boolean) {
//         this.name = name
//         this.age = age
//         this.active = active
//     }
//     getAge(): number {
//         // by authorized users only
//         return this.age
//     }
//     setAge(value:number){
//         this.age = value
//     }
//     get _active(): boolean {
//         return this.active
// }
//     set _active(value: boolean) {
//         this.active = value
//     }
// }


// const userJohn = new User("John", 27, true)
// userJohn.name
// userJohn.name = "Anna"

// userJohn.getAge() // not direct access to age
// // userJohn.age = 28 // Error: Property 'age' is private and only accessible within class 'User'.

// userJohn._active // protected, not accessible outside
// userJohn._active = false

// class Student extends User {
//     public gender: string
//     constructor(name: string, age: number, active: boolean, gender: string) {
//         super(name, age, active)
//         this.gender = gender
//     }
// }

// const studentAnne = new Student ("Anne", 25, true, 'F')
// studentAnne.name
// studentAnne.gender

// studentAnne.getAge() // access to protected via method
// studentAnne._active // protected, not accessible outside

// // static in class
// class Student {
//     static counter: number = 0
//     static getCounter(): number {
//         return Student.counter
//     }
//     name: string;
//     id : number
//     constructor(name: string) {
//         this.name = name;
//         this.id = ++Student.counter
//     }
// }

// const student1 = new Student("John");
// console.log(student1.id); // 1
// const student2 = new Student("Jane");
// console.log(student2.id); // 2
// const student3 = new Student("Jim");
// console.log(student3.id); // 3

// implement type // interface to a class
type User = {
    name: string
    age: number
    getAge: () => number
    setAge: (value: number) => void
}

class Employee implements User {
    name: string
    age: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }

    getAge(): number {
        return this.age
    }
    setAge(value: number): void {
        this.age = value
    }
}

// Generics in TypeScript

const strEcho = (value: string): string => {
    return value
}
const numEcho = (value: number): number => {
    return value
}
const echo = <T>(value: T): T => {
    return value
}

echo<string>("abc")
echo<number>(123)
echo<boolean>(true)
echo<string | number>("hello")
echo<string | number>(456)

type Book = {
    title: string
    isbn: number
}

const mybook : Book = {
    title: "TypeScript Basics",
    isbn: 1234567890
}

echo<Book>(mybook)

const getFirstElement = <T>(arr: T[]): T => {
    return arr[0]
}
getFirstElement<number>([1, 2, 3])
getFirstElement<string>(["1", "2", "3"])
getFirstElement<Book>([mybook, mybook])

interface Person<T> {
    name: string
    age: number
    info: T
}
const p1 : Person<number[]> = {
    name: 'aaa',
    age: 1,
    info: [80, 10]
}

const p2: Person<(string | number)[]> = {
    name: 'bbb',
    age: 2,
    info: [18, "ten"]
}

type Info = {
    city: string
    address: string
    zip: number
}
const p3: Person<Info> = {
    name: 'ccc',
    age: 3,
    info: {
        city: "New York",
        address: "5th Avenue",
        zip: 10001
    }
}

const mergeArrays = <T , K>(arr1: T[], arr2: K[]): (T | K)[] => {
    return [...arr1, ...arr2]
}

mergeArrays([1,2,3], ["1", "2", "3"])