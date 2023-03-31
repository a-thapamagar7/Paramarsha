
export function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function createAcronym(str) {
    const letter =  str.split(" ")
    var newLetter = ""
    
    letter.forEach(element => {
        if(element.charAt(0) === element.charAt(0).toUpperCase()) 
            newLetter += element.charAt(0)
    });
    return newLetter
}