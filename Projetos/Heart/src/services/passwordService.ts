export default function generatePass(){
    let password: string = ''
    let characters: string = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890@#$%¨&*'
    let passwordLength = 10

    for(let index = 0; index < passwordLength; index++){
        password += characters.charAt(
            Math.random() * characters.length
        )
    }

    return password
}