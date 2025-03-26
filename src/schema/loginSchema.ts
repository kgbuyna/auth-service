import * as v from 'valibot';
import Users from '../models/user';


const isUsernameNotAvailable = async (username: string) => {
    const data = await Users.findOne({ where: { username } });
    return !!data; // Returns true if the username exists
};
  

export const LoginSchema = v.objectAsync({
    username: v.pipeAsync(
      v.string(),
      v.minLength(2),
      v.checkAsync(
        isUsernameNotAvailable,
        "Username does not exist",
      ),
    ),
    password: v.pipe(
      v.string(),
      v.minLength(8),
    ),
  });
  