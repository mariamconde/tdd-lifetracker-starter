const { BadRequestError, UnauthorizedError} = require("../utils/errors")
const db = require("../db")
const bcrypt = require("bcrypt")
const { BCRYPT_WORK_FACTOR } = require("../config")


class User{

    static async makePublicUser(user){
        return{
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            updatedAt: user.updatedAt,
            createdAt: user.created_at,
        }
    }


    static async login(credentials) {
        const requiredFields = ["email", "password"] 
        requiredFields.forEach(field => {
            if(!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body`);
            }
        })
        const user =  await User.fetchUserByEmail(credentials.email)
        if(user){
            const isValid = await bcrypt.compare(credentials.password, user.password)
            if(isValid){
                return User.makePublicUser(user)
            }
        }
        throw new UnauthorizedError("Invalid email/password combo")
    }

    static async register(credentials) {
        const requiredFields = ["email", "username", "first_name", "last_name", "password"];

        requiredFields.forEach(field => {
            if(!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body`);
            }
        })

        if(credentials.email.indexOf("@")<=0){
            throw new BadRequestError("Invalid email.")
        }

        const existingUser = await User.fetchUserByEmail(credentials.email);
        if (existingUser) {
            throw new BadRequestError(`Duplicate email: ${credentials.email}`);
        }

        const lowerCasedEmail = credentials.email.toLowerCase();
        
        const existingUserName = await User.fetchUserByUsername(credentials.username);
        if (existingUserName) {
            throw new BadRequestError(`Duplicate username: ${credentials.username}`);
        }

        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)

        const lowerCasedUsername = credentials.username.toLowerCase();

        const result = await db.query(`
            INSERT INTO users (
                email,
                username,
                first_name,
                last_name,
                password
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, email, username, first_name, last_name, password, created_at, updated_at;
        `, [lowerCasedEmail, lowerCasedUsername, credentials.first_name, credentials.last_name, hashedPassword])
        // Return user
        const user = result.rows[0];
 
        return User.makePublicUser(user);
    }






    static async fetchUserByEmail(email) {
        if (!email) {
            throw new BadRequestError("No email provided");
        }
        const query = `SELECT * FROM users WHERE email = $1`;
        const result = await db.query(query, [email.toLowerCase()]);
        const user = result.rows[0];
        return user;
    }

    static async fetchUserByUsername(username) {
        if (!username) {
            throw new BadRequestError("No username provided");
        }
        const query = `SELECT * FROM users WHERE username = $1`;
        const result = await db.query(query, [username.toLowerCase()]);
        const user = result.rows[0];
        return user;
    }

}

module.exports = User