import * as v from 'valibot';
import Users from '../models/user';

const isUsernameAvailable = async (username: string) => {
    const data = await Users.findOne({ where: { username } });
    return !data;   
  };

const RegisterSchema = v.pipeAsync(
    v.objectAsync({
      username: v.pipeAsync(
        v.string(),
        v.minLength(2),
        v.checkAsync(isUsernameAvailable, "Username is already taken."),
      ),
      email: v.optional(v.pipe(v.string(), v.email())),
      lastName: v.optional(v.string()),
      firstName: v.pipe(v.string(), v.trim()),
      password: v.pipe(
        v.string(),
        v.minLength(8),
      ),
      confirmPassword: v.pipe(
        v.string(),
        v.minLength(8),
      ),
      profile: v.optional(v.pipe(v.string(), v.url())),
    }),
    v.forward(
      v.partialCheck(
        [["password"], ["confirmPassword"]],
        (input) => input.password === input.confirmPassword,
        "The two passwords do not match.",
      ),
      ["confirmPassword"],
    ),
  );

  export default RegisterSchema