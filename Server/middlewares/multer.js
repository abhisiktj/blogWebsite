const multer=require('multer');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname);
    }
})

const upload=multer({storage:storage});
const uploadMultiple=upload.fields([{name:'thumbnail',maxCount:1},
{name:'carousel',maxCount:5}]);

module.exports=uploadMultiple;