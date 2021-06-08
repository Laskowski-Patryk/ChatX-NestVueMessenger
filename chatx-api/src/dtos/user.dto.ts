export class UserDto {
     _id?: string;
     username: string;
     password: string;
     password_hash?: string;
     email: string;
     email_verified?: Boolean = false;
     name: string;
     surname: string;
     city: string;
     avatar?: string;
     public_key?: string;
     private_key?: string;
}
