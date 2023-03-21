import bcrypt from 'bcrypt'

export const hashPassword = async (password) => {
    return bcrypt.hash(password,10)
}

export const comparePasswords = async (password,hasshedPassword) => {
    return bcrypt.compare(password,hasshedPassword)
}
