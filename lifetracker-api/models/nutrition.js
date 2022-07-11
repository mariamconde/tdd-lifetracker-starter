const { BadRequestError, UnauthorizedError, NotFoundError} = require("../utils/errors")
const db = require("../db")

class Nutrition {
    static async createNutrition(info, email){
        console.log(info)
        const requiredFields = ["name", "category", "calories", "image_url", "quantity"]
        requiredFields.forEach(field => {
            if (!info.hasOwnProperty(field)){

                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })
        const user = await this.fetchUserByEmail(email)
        console.log("This is ", email)
        
        const result = await db.query(`INSERT INTO nutrition (
            name,
            category,
            calories,
            image_url,
            user_id,
            quantity
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, name, category, calories, created_at, image_url, user_id, quantity;
        `, [info.name, info.category, info.calories, info.image_url, user.id, info.quantity])

        const nutritions = result.rows[0]

        return nutritions
    }
    static async fetchUserByEmail(email) {
        if(!email) {
            throw new BadRequestError("No email provided")
        }

        const query = `SELECT * FROM users WHERE email = $1`

        const result = await db.query(query, [email.toLowerCase()])

        const user = result.rows[0]

        return user
    }

    static async fetchNutritionById(id){
        if(!id) {
            throw new BadRequestError("No id provided")
        }
        const query = `SELECT n.id,
        n.name,
        n.category,
        n.calories,
        n.image_url AS "imageUrl",
        n.user_id AS "userId",
        to_char(n.created_at, 'DD/MM/YYYY') AS "createdAt",
        n.quantity,
        u.email AS "userEmail"
        
        FROM nutrition AS n
            LEFT JOIN users AS u ON u.id = n.user_id
        WHERE n.id = $1`

        const result = await db.query(query, [id])

        const nutrition = result.rows[0]
        if(!nutrition){
            throw new NotFoundError
        }
        return nutrition
    }

    static async listNutritionForUser(email){
        if(!email) {
            throw new BadRequestError("No email provided")
        }
        const query = `SELECT n.id,
        n.name,
        n.category,
        n.calories,
        n.image_url,
        to_char(n.created_at, 'DD/MM/YYYY') AS "createdAt",
        n.quantity
    
        
        FROM nutrition AS n
            LEFT JOIN users AS u ON u.id = n.user_id 
        WHERE u.email = $1`

        const result = await db.query(query, [email])

        if(!result){
            throw new NotFoundError
        }
        console.log(result.rows)
        const nutrition = result.rows

        return nutrition
    }
}

module.exports = Nutrition