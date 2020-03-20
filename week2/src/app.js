class Person {
    firstName;
    lastName;
    age;

    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    isLegal() {
        return this.age > 18;
    }
    
    getInitials() {
        return String(this.firstName).charAt(0) + "." + String(this.lastName).charAt(0) + ".";
    }
}

const person = new Person('Kelly', 'Watermeyer', 25);

console.log(person.firstName + " " + person.lastName);
console.log(person.getInitials());
console.log(person.isLegal());