import UsersManager from "../DAO/userMongo.js";

const userManager = new UsersManager()

export async function getUsers(){
    try {
        const users = await userManager.findUsers()
        return users
    } catch (error) {
        return error
    }
}

export async function getUserById(id){
    try {
        const user = await userManager.findUserById(id)
        return user
    } catch (error) {
        return error
    }
}

export async function addOneUser(obj){
    try {
        const newUser = await userManager.addUser(obj)
        return newUser
    } catch (error) {
        return error
    }
}

export async function updateUserById(id, first_name, last_name, email, age, password){
    try {
        const updatedUser = await userManager.updateUser(id, first_name, last_name, email, age, password)
        return updatedUser
    } catch (error) {
        return error
    }
}

export async function deleteUserById(id){
    try {
        const deletedUser = await userManager.deleteUser(id)
        return deletedUser
    } catch (error) {
        return error
    }
}