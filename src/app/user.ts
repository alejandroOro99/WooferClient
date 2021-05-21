export class User {

    username: string;
    password: string;
    name: string;
    email: string;
    dob: string;
    phone: string;

    constructor(
        username: string,
        password: string,
        name: string,
        email: string,
        dob: string,
        phone: string
    ) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.email = email;
        this.dob = dob;
        this.phone = phone;
    }
}