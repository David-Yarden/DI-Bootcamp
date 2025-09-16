// #1
function funcOne() {
    let a = 5;
    if(a > 1) {
        a = 3;
    }
    alert(`inside the funcOne function ${a}`); // 3
}
// #1.2 If 'a' is const instead of let, error occurs when trying to assign a=3 inside if block

// #2
let a = 0;
function funcTwo() {
    a = 5; // modifies the global 'a'
}
function funcThree() {
    alert(`inside the funcThree function ${a}`);
}
// #2.1
// funcThree() -> 0
// funcTwo() -> changes a to 5
// funcThree() -> 5
// #2.2 If 'a' is const, funcTwo() will throw error because const can't be reassigned

// #3
function funcFour() {
    window.a = "hello"; // global variable created/overwritten
}
function funcFive() {
    alert(`inside the funcFive function ${a}`); // hello
}
// #3.1 funcFour() then funcFive() -> alerts "hello"

// #4
let a = 1;
function funcSix() {
    let a = "test"; // local scope
    alert(`inside the funcSix function ${a}`); // test
}
// #4.2 If 'a' is const instead of let, same behavior; still local and works

// #5
let a = 2;
if (true) {
    let a = 5;
    alert(`in the if block ${a}`); // 5
}
alert(`outside of the if block ${a}`); // 2
// #5.2 If 'a' is const inside the if block, same behavior; block scoped
