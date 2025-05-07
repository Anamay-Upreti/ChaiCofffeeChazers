import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename(req, res, cb) {
        cb(null, `$(Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, res, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|svg/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (fileTypes.test(ext)) {
         cb(null, true);
    } else {
    cb(new Error ('Images and Gif only! (jpeg, jpg, png, gif, svg)'));
    }
};

const upload = multer({ storage, fileFilter });

export default upload;