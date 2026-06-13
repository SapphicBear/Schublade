import multer from "multer";

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "files/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.originalname + "-" + uniqueSuffix);
    },
});

const upload = multer({
    storage: fileStorageEngine,
    dest: "files/",
    limits: { fileSize: 100000 },
});

export default upload;
