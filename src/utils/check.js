export const validate = (obj,check_json) => {
    for(let i in check_json) {
        if(obj[i] == false) {
            return check_json[i]
        }
    }
    return true
}