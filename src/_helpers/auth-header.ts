export function authHeader() {
    // return authorization header with jwt token
    // @ts-ignore: Unreachable code error
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token, 'User': user.id};
    } else {
        return {};
    }
}