export function authHeader() {
    // return authorization header with jwt token
    // @ts-ignore: Unreachable code error
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}