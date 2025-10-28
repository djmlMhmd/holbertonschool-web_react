export function getFullYear() {
    let currentDate = new Date()
    return currentDate.getFullYear()
}

export function getFooterCopy(isIndex) {
    
    return isIndex ? "Holberton School" : "Holberton School main dashboard";

}

export function getLatestNotification() {
    return "<strong>Urgent requirment</strong> - complete by EOD"
}

export const defaultUser = {
    user: {
        email: '',
        password: '',
        isLoggedIn: false
    },
    logOut: () => { }
};

export const defaultContext = {
    user: defaultUser,
    logOut: () => {}
}
export const loggedInUser = {
    email: 'zac@mail.com',
    password: 'zac',
    isLoggedIn: true
}

export const loggedInContext = {
    user: loggedInUser,
    logOut: () => { }
};