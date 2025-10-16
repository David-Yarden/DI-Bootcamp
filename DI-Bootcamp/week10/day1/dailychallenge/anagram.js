function isAnagram(str1, str2) {
    // Remove spaces and convert to lowercase
    let s1 = str1.replace(/\s/g, '').toLowerCase();
    let s2 = str2.replace(/\s/g, '').toLowerCase();

    // Sort letters and compare
    return s1.split('').sort().join('') === s2.split('').sort().join('');
}

// Examples
console.log(isAnagram("Astronomer", "Moon starer"));   // true
console.log(isAnagram("School   master", "The classroom")); // true
console.log(isAnagram("The Morse Code", "Here come dots")); // true
console.log(isAnagram("Hello", "World")); // false
