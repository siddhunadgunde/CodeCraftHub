const userService = require('../src/services/userService'); 
const User = require('../src/models/userModel'); 

jest.mock('../src/models/userModel');
describe('User Service', () => { 
    beforeEach(() => { jest.clearAllMocks(); }); 
    it('should find a user by ID', async () => {
        const userId = '60d21b4667d0d8992e610c85'; 
        const mockUser = { _id: userId, username: 'testuser', email: 'test@example.com' }; 
        User.findById.mockResolvedValue(mockUser); 
        
        const user = await userService.findUserById(userId); 
        expect(user).toEqual(mockUser); 
        expect(User.findById).toHaveBeenCalledWith(userId);
    }); 
    
    it('should throw an error if user not found', async () => { 
        const userId = '60d21b4667d0d8992e610c85'; 

        User.findById.mockResolvedValue(null); 
        await expect(userService.findUserById(userId)).rejects.toThrow('User not found');
        expect(User.findById).toHaveBeenCalledWith(userId); 
    }); });