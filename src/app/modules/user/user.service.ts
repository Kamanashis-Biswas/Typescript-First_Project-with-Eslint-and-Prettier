import config from '../../config';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a new user object

  const userData: Partial<TUser> = {};

  // if password is not provided, use the default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  // set manually generated id
  userData.id = '20301082010';

  // create a user
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id; // reference _id to user

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};
