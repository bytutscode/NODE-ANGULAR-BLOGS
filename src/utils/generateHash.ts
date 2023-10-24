import bcrypt from 'bcrypt';

export const generateHashedPassword = async (password: string): Promise<string> => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        throw error
    }
}