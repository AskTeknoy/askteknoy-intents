const { storage } = require('./firebaseConfig'); 
const { ref, listAll, getDownloadURL } = require("firebase/storage"); 

const GetImageLocation = (intentImageFileName) => {
    const imageRef = ref(storage, `location_image/${intentImageFileName}`); 
    
    let imageUrl = ""; 
    
    listAll(imageRef)
        .then((response) => { 
            console.log(response); 
            response.items.forEach((item) => {
                getDownloadURL(item)
                    .then((url) => {
                        console.log("url retrieve");

                        return url;
                    }) 
            })
        })
        .catch(err => console.log(err));

    return imageUrl;
}

const GetFile = (fileName) => { 
    const fileRef = ref(storage, `syllabus/${fileName}`); 

    listAll(fileRef)
        .then((res) => { 
            res.items.forEach((item)=> { 
                console.log(item); 
            })
        })
}

module.exports = { GetImageLocation, GetFile }; 